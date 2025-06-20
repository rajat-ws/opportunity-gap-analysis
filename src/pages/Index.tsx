import AnalysisScreen from "@/components/AnalysisScreen";
import MarketOpportunityForm from "@/components/MarketOpportunityForm";
import { useOpportunityGapAnalysis } from "@/hooks/useOpportunityGapAnalysis";
import { FormData } from "@/lib/validation";
import { useCallback, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<
    "form" | "analysis" | "reports"
  >("form");
  const [formData, setFormData] = useState<FormData | null>(null);

  const { isTriggering, validationErrors, error } = useOpportunityGapAnalysis();

  const handleFormSubmit = useCallback((data: FormData) => {
    setFormData(data);
    setCurrentStep("analysis");
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    // setAnalysisData(data || null);
    // setCurrentStep("reports");
  }, []);

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
      /* case "reports":
        return <CompetitorsLandscapeDemo analysisData={analysisData} />; */
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderCurrentStep()}</div>;
};

export default Index;
