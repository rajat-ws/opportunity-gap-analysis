const API_BASE_URL = "https://n8n.wednesday.is/webhook";

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

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Log the raw response for debugging
      console.log("Raw API Response:", data);

      // If the response is a string (possibly JSON string), try to parse it
      if (typeof data === "string") {
        try {
          return JSON.parse(data) as T;
        } catch (e) {
          console.error("Failed to parse response as JSON:", e);
          throw new Error("Invalid response format");
        }
      }

      return data as T;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // First endpoint: Trigger opportunity gap analysis
  async triggerOpportunityGapAnalysis(
    data: OpportunityGapRequest
  ): Promise<{ id: string }> {
    return this.makeRequest<{ id: string }>("/opportunity-gap-trigger", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Second endpoint: Fetch analysis output
  async getAnalysisOutput(id: string): Promise<ApiResponse> {
    return this.makeRequest<ApiResponse>(`/opp-output?id=${id}`);
  }

  // Poll for results with exponential backoff
  async pollForResults(
    id: string,
    maxAttempts: number = 30,
    onPoll?: (attempt: number) => void
  ): Promise<AnalysisOutputResponse> {
    let attempt = 0;
    const baseDelay = 2000; // 2 seconds

    while (attempt < maxAttempts) {
      try {
        if (onPoll) {
          onPoll(attempt + 1);
        }
        const result = await this.getAnalysisOutput(id);

        // Log the current attempt and status
        console.log(`Polling attempt ${attempt + 1}/${maxAttempts}:`, {
          id,
          status: result.status,
          hasOutput: !!result.output_data,
        });

        // If status is completed and we have output data
        if (result.status === "completed" && result.output_data) {
          console.log("✅ Analysis completed! Full response:", {
            id: result.id,
            status: result.status,
            output_data: result.output_data,
          });

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
            throw new Error("Analysis timed out. Please try again.");
          }

          // Exponential backoff: 2s, 4s, 8s, 16s, etc.
          const delay = baseDelay * Math.pow(2, attempt - 1);
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        // If status is failed or unknown
        throw new Error(`Analysis failed with status: ${result.status}`);
      } catch (error) {
        console.error("Polling error:", error);
        throw error;
      }
    }

    throw new Error("Analysis timed out. Please try again.");
  }
}

export const apiService = new ApiService();
