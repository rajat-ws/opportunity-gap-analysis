import {
  formatAnalysisForConsole,
  getAnalysisInsights,
} from "@/lib/analysis-utils";
import {
  AnalysisOutputResponse,
  apiService,
  OpportunityGapRequest,
} from "@/lib/api";
import { validateFormData, ValidationError } from "@/lib/validation";
import { useCallback, useState } from "react";

export interface AnalysisState {
  isTriggering: boolean;
  isPolling: boolean;
  analysisId: string | null;
  result: AnalysisOutputResponse | null;
  error: string | null;
  validationErrors: ValidationError[];
  insights: string[];
}

export const useOpportunityGapAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    isTriggering: false,
    isPolling: false,
    analysisId: null,
    result: null,
    error: null,
    validationErrors: [],
    insights: [],
  });

  const triggerAnalysis = useCallback(
    async (formData: {
      marketSegment: string;
      userPersona: string;
      problemSolving: string;
      features: string;
      competitorUrls: string[];
      email: string;
    }) => {
      // Reset state
      setState((prev) => ({
        ...prev,
        isTriggering: true,
        error: null,
        validationErrors: [],
        result: null,
        insights: [],
      }));

      try {
        // Validate form data
        const validation = validateFormData(formData);
        if (!validation.isValid) {
          setState((prev) => ({
            ...prev,
            isTriggering: false,
            validationErrors: validation.errors,
          }));
          return { success: false, validationErrors: validation.errors };
        }

        // Transform form data to API format
        const apiRequest: OpportunityGapRequest = {
          market_segment: formData.marketSegment,
          business_problem: formData.problemSolving,
          user_segment: formData.userPersona,
          competitor: formData.competitorUrls.filter((url) => url.trim()),
        };

        // Trigger the analysis
        const response =
          await apiService.triggerOpportunityGapAnalysis(apiRequest);

        console.log({ response });

        setState((prev) => ({
          ...prev,
          isTriggering: false,
          analysisId: response.id,
          isPolling: true,
        }));

        return { success: true, analysisId: response.id };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to trigger analysis";

        console.log({ error });

        setState((prev) => ({
          ...prev,
          isTriggering: false,
          error: errorMessage,
        }));
        return { success: false, error: errorMessage };
      }
    },
    []
  );

  const pollForResults = useCallback(async (analysisId: string) => {
    setState((prev) => ({
      ...prev,
      isPolling: true,
      error: null,
    }));

    try {
      const result = await apiService.pollForResults(analysisId);

      // Format and log the results to console
      formatAnalysisForConsole(result);

      // Extract insights
      const insights = getAnalysisInsights(result);

      setState((prev) => ({
        ...prev,
        isPolling: false,
        result,
        insights,
      }));

      return { success: true, result, insights };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get analysis results";
      setState((prev) => ({
        ...prev,
        isPolling: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setState({
      isTriggering: false,
      isPolling: false,
      analysisId: null,
      result: null,
      error: null,
      validationErrors: [],
      insights: [],
    });
  }, []);

  return {
    ...state,
    triggerAnalysis,
    pollForResults,
    resetAnalysis,
  };
};
