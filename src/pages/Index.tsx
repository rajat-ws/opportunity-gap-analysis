import AnalysisScreen from "@/components/AnalysisScreen";
import CompetitorsLandscapeDemo from "@/components/CompetitorsLandscapeDemo";
import MarketOpportunityForm from "@/components/MarketOpportunityForm";
import { useOpportunityGapAnalysis } from "@/hooks/useOpportunityGapAnalysis";
import { AnalysisOutputResponse } from "@/lib/api";
import { FormData } from "@/lib/validation";
import { useCallback, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<
    "form" | "analysis" | "reports"
  >("form");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [analysisData, setAnalysisData] =
    useState<AnalysisOutputResponse | null>(null);

  const { isTriggering, validationErrors, error } = useOpportunityGapAnalysis();

  const handleFormSubmit = useCallback((data: FormData) => {
    console.log("Form submitted:", data);
    setFormData(data);
    setCurrentStep("analysis");
  }, []);

  const handleAnalysisComplete = useCallback(
    (data?: AnalysisOutputResponse) => {
      console.log("Analysis complete", data);
      setAnalysisData(data || null);
      setCurrentStep("reports");
    },
    []
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "form":
        return (
          <MarketOpportunityForm
            onNext={handleFormSubmit}
            isLoading={isTriggering}
            validationErrors={validationErrors}
            error={error}
          />
        );
      case "analysis":
        return formData ? (
          <AnalysisScreen
            onComplete={handleAnalysisComplete}
            formData={formData}
          />
        ) : null;
      case "reports":
        return <CompetitorsLandscapeDemo analysisData={analysisData} />;
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderCurrentStep()}</div>;
};

export default Index;
