import AnalysisScreen from "@/components/AnalysisScreen";
import CompetitorsLandscapeDemo from "@/components/CompetitorsLandscapeDemo";
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
  const [currentStep, setCurrentStep] = useState<
    "form" | "analysis" | "reports"
  >("form");
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setFormData(data);
    setCurrentStep("analysis");
  };

  const handleAnalysisComplete = () => {
    console.log("Analysis complete");
    setCurrentStep("reports");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "form":
        // return <MarketOpportunityForm onNext={handleFormSubmit} />;
        return <CompetitorsLandscapeDemo />;
      case "analysis":
        return <AnalysisScreen onComplete={handleAnalysisComplete} />;
      case "reports":
        return <CompetitorsLandscapeDemo />;
      default:
        return null;
    }
  };

  return <div className="min-h-screen w-full">{renderCurrentStep()}</div>;
};

export default Index;
