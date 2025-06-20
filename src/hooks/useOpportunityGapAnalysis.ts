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
import { useCallback, useRef, useState } from "react";

export interface AnalysisState {
  isTriggering: boolean;
  isPolling: boolean;
  analysisId: string | null;
  result: AnalysisOutputResponse | null;
  error: string | null;
  validationErrors: ValidationError[];
  insights: string[];
  completedSteps: {
    competitorLandscape: boolean;
    customerSegmentation: boolean;
    unmetNeeds: boolean;
    featureBacklog: boolean;
  };
  pollingAttempts: number;
}

// Centralized configuration for analysis steps and their corresponding sheet names
const ANALYSIS_STEP_CONFIG: Record<
  keyof AnalysisState["completedSteps"],
  string
> = {
  competitorLandscape: "Competitor Landscape",
  customerSegmentation: "New Customer Segmentation",
  unmetNeeds: "Ranked Unmet Needs",
  featureBacklog: "Prioritized Feature Backlog", // Corrected typo from "Priortized"
};

export const useOpportunityGapAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    isTriggering: false,
    isPolling: false,
    analysisId: null,
    result: null,
    error: null,
    validationErrors: [],
    insights: [],
    completedSteps: {
      competitorLandscape: false,
      customerSegmentation: false,
      unmetNeeds: false,
      featureBacklog: false,
    },
    pollingAttempts: 0,
  });

  // Add ref to track if analysis is in progress
  const isAnalysisInProgress = useRef(false);

  const triggerAnalysis = useCallback(
    async (formData: {
      marketSegment: string;
      userPersona: string;
      problemSolving: string;
      features: string;
      competitorUrls: string[];
      email: string;
    }) => {
      // Prevent duplicate API calls
      if (isAnalysisInProgress.current) {
        console.log("Analysis already in progress, skipping duplicate call");
        return { success: false, error: "Analysis already in progress" };
      }

      isAnalysisInProgress.current = true;

      // Reset state
      setState((prev) => ({
        ...prev,
        isTriggering: true,
        error: null,
        validationErrors: [],
        result: null,
        insights: [],
        completedSteps: {
          competitorLandscape: false,
          customerSegmentation: false,
          unmetNeeds: false,
          featureBacklog: false,
        },
        pollingAttempts: 0,
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
          isAnalysisInProgress.current = false;
          return { success: false, validationErrors: validation.errors };
        }

        // Transform form data to API format
        const apiRequest: OpportunityGapRequest = {
          market_segment: formData.marketSegment,
          business_problem: formData.problemSolving,
          user_segment: formData.userPersona,
          competitor: formData.competitorUrls.filter((url) => url.trim()),
          email: formData.email,
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

        // Reset the flag on error
        isAnalysisInProgress.current = false;
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
      pollingAttempts: 0,
    }));

    try {
      const handlePoll = (attempt: number) => {
        setState((prev) => ({ ...prev, pollingAttempts: attempt }));
      };
      const result = await apiService.pollForResults(
        analysisId,
        30,
        handlePoll
      );

      console.log({ result });

      // Format and log the results to console
      formatAnalysisForConsole(result);

      // Extract insights
      const insights = getAnalysisInsights(result);

      console.log({ insights });

      // Helper function to check if a sheet has data
      const isSheetComplete = (sheetName: string) =>
        result.allItems.some(
          (item) => item?.sheetName === sheetName && item.data?.length > 0
        );

      // Dynamically determine completed steps from the config
      const completedSteps = Object.fromEntries(
        Object.entries(ANALYSIS_STEP_CONFIG).map(([stepKey, sheetName]) => [
          stepKey,
          isSheetComplete(sheetName),
        ])
      ) as AnalysisState["completedSteps"];

      console.log({ completedSteps });

      setState((prev) => ({
        ...prev,
        isPolling: false,
        result,
        insights,
        completedSteps,
        pollingAttempts: 0,
      }));

      // Reset the flag when polling completes
      isAnalysisInProgress.current = false;

      return { success: true, result, insights, completedSteps };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get analysis results";

      console.log({ error });

      setState((prev) => ({
        ...prev,
        isPolling: false,
        error: errorMessage,
      }));

      // Reset the flag on error
      isAnalysisInProgress.current = false;
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
      completedSteps: {
        competitorLandscape: false,
        customerSegmentation: false,
        unmetNeeds: false,
        featureBacklog: false,
      },
      pollingAttempts: 0,
    });

    // Reset the flag
    isAnalysisInProgress.current = false;
  }, []);

  return {
    ...state,
    triggerAnalysis,
    pollForResults,
    resetAnalysis,
  };
};
