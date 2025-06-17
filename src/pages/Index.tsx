import AnalysisScreen from "@/components/AnalysisScreen";
import MarketOpportunityForm from "@/components/MarketOpportunityForm";
import { useState } from "react";

interface FormData {
  marketSegment: string;
  userPersona: string;
  problemSolving: string;
  features: string;
  competitorUrls: string[];
  email: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"form" | "analysis">("analysis");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setFormData(data);
    setCurrentStep("analysis");
  };

  const handleAnalysisComplete = () => {
    console.log("Analysis complete");
    // The download button is now handled within the AnalysisScreen component
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "form":
        return <MarketOpportunityForm onNext={handleFormSubmit} />;
      case "analysis":
        return <AnalysisScreen onComplete={handleAnalysisComplete} />;
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderCurrentStep()}</div>;
};

export default Index;
