import { config } from "./config";

// API Request Types
export interface OpportunityGapRequest {
  market_segment: string;
  business_problem: string;
  user_segment: string;
  competitor: string[];
  email: string;
}

// API Response Types
export interface ApiResponse {
  id: string;
  status: "pending" | "completed" | "failed";
  output_data: SheetData[] | null;
}

export interface CustomerSegment {
  Name: string;
  "Archetype & Definition": string;
  "JTBD / Top 3 Needs": string;
  "Demographics & Firmographics": string;
  "Psychographics & Motivators": string;
  "Acquisition Channels": string;
  "WTP Tier & Pricing Sensitivity": string;
  "Market Size & Growth Rate": string;
}

export interface UnmetNeed {
  "Priority Score / Rank": string;
  "Jobs-to-Be-Done Context": string;
  "Persona & Segment Details": string;
  "Need Statement": string;
  "Frequency & Severity": string;
  "Satisfaction Score": string;
  "Opportunity Gap Score": string;
  "Current Workarounds": string;
  "WTP Tier": string;
  "Competitor Coverage": string;
}

export interface FeatureBacklog {
  "Priority Score / Rank": string;
  Title: string;
  "JTBD / Unmet Need Ref": string;
  "Description & User Story": string;
  "Primary Persona": string;
  "Success Metric(s) - How you'll measure impact": string;
}

export interface CompetitorInfo {
  row_number: number;
  "Competitor Name": string;
  URL: string;
  "Business Model": string;
  "Market & Segment": string;
  "Key Use Cases & Pain Points": string;
  "Primary Differentiator": string;
  "Feature Set Overview": string;
  "Acquisition Channels": string;
  "Voice of the Customer": string;
  "Competitive Threat Moves": string;
}

export interface SheetData {
  sheetName: string;
  data: CustomerSegment[] | UnmetNeed[] | FeatureBacklog[] | CompetitorInfo[];
}

export interface AnalysisOutputResponse {
  allItems: SheetData[];
}

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${config.api.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      const data = await response.json();

      // Log the raw response for debugging
      if (config.features.enableDebugMode) {
        console.log("Raw API Response:", data);
      }

      // If the response is a string (possibly JSON string), try to parse it
      if (typeof data === "string") {
        try {
          return JSON.parse(data) as T;
        } catch (e) {
          console.error("Failed to parse response as JSON:", e);
          throw new ApiError("Invalid response format");
        }
      }

      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ApiError("Request timeout", 408);
        }
        throw new ApiError(error.message);
      }

      throw new ApiError("Unknown error occurred");
    }
  }

  // Retry wrapper for API calls
  private async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = config.api.retryAttempts
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          throw lastError;
        }

        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  // First endpoint: Trigger opportunity gap analysis
  async triggerOpportunityGapAnalysis(
    data: OpportunityGapRequest
  ): Promise<{ id: string }> {
    return this.withRetry(() =>
      this.makeRequest<{ id: string }>("/opportunity-gap-trigger", {
        method: "POST",
        body: JSON.stringify(data),
      })
    );
  }

  // Second endpoint: Fetch analysis output
  async getAnalysisOutput(id: string): Promise<ApiResponse> {
    return this.withRetry(() =>
      this.makeRequest<ApiResponse>(`/opp-output?id=${id}`)
    );
  }

  // Poll for results with exponential backoff
  async pollForResults(
    id: string,
    maxAttempts: number = config.api.maxPollingAttempts,
    onPoll?: (attempt: number) => void
  ): Promise<AnalysisOutputResponse> {
    let attempt = 0;
    const baseDelay = config.api.pollingInterval;

    while (attempt < maxAttempts) {
      try {
        if (onPoll) {
          onPoll(attempt + 1);
        }
        const result = await this.getAnalysisOutput(id);

        // Log the current attempt and status
        if (config.features.enableDebugMode) {
          console.log(`Polling attempt ${attempt + 1}/${maxAttempts}:`, {
            id,
            status: result.status,
            hasOutput: !!result.output_data,
          });
        }

        // If status is completed and we have output data
        if (result.status === "completed" && result.output_data) {
          if (config.features.enableDebugMode) {
            console.log("✅ Analysis completed! Full response:", {
              id: result.id,
              status: result.status,
              output_data: result.output_data,
            });
          }

          // Parse the output_data if it's a string
          const parsedOutput =
            typeof result.output_data === "string"
              ? JSON.parse(result.output_data)
              : result.output_data;

          return {
            allItems: parsedOutput,
          };
        }

        // If still pending, or completed but without data, continue polling
        if (
          result.status === "pending" ||
          (result.status === "completed" && !result.output_data)
        ) {
          attempt++;
          if (attempt >= maxAttempts) {
            throw new ApiError("Analysis timed out. Please try again.", 408);
          }

          // Exponential backoff: 2s, 4s, 8s, 16s, etc.
          const delay = baseDelay * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        // If status is failed or unknown
        throw new ApiError(
          `Analysis failed with status: ${result.status}`,
          500
        );
      } catch (error) {
        if (config.features.enableDebugMode) {
          console.error("Polling error:", error);
        }
        throw error;
      }
    }

    throw new ApiError("Analysis timed out. Please try again.", 408);
  }
}

export const apiService = new ApiService();
