import AnalysisScreen from "@/components/AnalysisScreen";
import MarketOpportunityForm from "@/components/MarketOpportunityForm";
import { useOpportunityGapAnalysis } from "@/hooks/useOpportunityGapAnalysis";
import { FormData } from "@/lib/validation";
import { useCallback, useState } from "react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "analysis">("form");
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    isTriggering,
    validationErrors,
    error,
    triggerAnalysis,
    pollForResults,
    result,
    pollingAttempts,
  } = useOpportunityGapAnalysis();

  const handleFormSubmit = useCallback((data: FormData) => {
    setFormData(data);
    setCurrentStep("analysis");
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
            formData={formData}
            triggerAnalysis={triggerAnalysis}
            pollForResults={pollForResults}
            result={result}
            pollingAttempts={pollingAttempts}
            error={error}
          />
        ) : null;
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderCurrentStep()}</div>;
};

export default Index;
