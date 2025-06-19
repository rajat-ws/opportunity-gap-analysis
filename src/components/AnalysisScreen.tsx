import { useOpportunityGapAnalysis } from "@/hooks/useOpportunityGapAnalysis";
import { useEffect, useState } from "react";
import AnalyticalSkillGif from "../../public/gifs/analytical-skill.gif";
import SeoGif from "../../public/gifs/seo.gif";
import GreenTickCircle from "../../public/svg/green-tick-circle.svg";
import AnalysisChipSet from "./AnalysisChipSet";
import AnalysisCompleteDialog from "./AnalysisCompleteDialog";
import HeroBanner from "./HeroBanner";

const getGifAsPerCurrentStep = (currentStep: number): string => {
  // currently the gifs are being alternated. maybe in future a different gif will be provided for each index
  if (currentStep % 2 === 0) {
    return SeoGif;
  }
  return AnalyticalSkillGif;
};

interface AnalysisScreenProps {
  onComplete: () => void;
  formData: {
    marketSegment: string;
    userPersona: string;
    problemSolving: string;
    features: string;
    competitorUrls: string[];
    email: string;
  };
}

const AnalysisScreen = ({ onComplete, formData }: AnalysisScreenProps) => {
  const analysisItems = [
    "Competitor Landscape",
    "New Customer Segmentation",
    "Ranked Unmet Needs",
    "Prioritized Feature Backlog",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const {
    isTriggering,
    isPolling,
    analysisId,
    result,
    error,
    insights,
    triggerAnalysis,
    pollForResults,
  } = useOpportunityGapAnalysis();

  // Start the analysis when component mounts
  useEffect(() => {
    const startAnalysis = async () => {
      const response = await triggerAnalysis(formData);
      if (response.success && response.analysisId) {
        // Start polling for results
        const pollResponse = await pollForResults(response.analysisId);
        if (pollResponse.success) {
          setIsAnalysisComplete(true);
          setShowCompletionDialog(true);
        }
      }
    };

    startAnalysis();
  }, [formData, triggerAnalysis, pollForResults]);

  // Handle analysis steps animation
  useEffect(() => {
    if (isAnalysisComplete) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisItems.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [analysisItems.length, isAnalysisComplete]);

  // Handle completion dialog
  const handleDialogClose = () => {
    setShowCompletionDialog(false);
    // Navigate to next screen after dialog is closed
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen analysis-bg flex flex-col items-center justify-center px-6">
        <HeroBanner />
        <div className="w-full max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 text-xl font-bold mb-2">
              Analysis Failed
            </h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen analysis-bg flex flex-col items-center [@media(min-width:800px)_and_(min-height:980px)]:justify-center px-6 pb-6">
      <HeroBanner />

      <div className="w-full xl:w-[1152px] flex flex-col gap-y-16">
        {/* border */}
        <div className="w-full xl:w-[1152px] h-[1px] opacity-20 border-gradient font-aeonikprotrial-light" />
        <div className="w-full xl:max-w-6xl mx-auto xl:mx-0 flex flex-col xl:flex-row gap-x-[112px] gap-y-8 mt-[60.27px] items-center">
          <div className="space-y-8 mx-auto xl:mx-0 flex flex-col self-start">
            <h2 className="text-white text-xl font-aeonikprotrial-bold">
              {isAnalysisComplete ? (
                <div className="flex items-center gap-x-[14px]">
                  <img
                    src={GreenTickCircle}
                    aria-hidden={true}
                    className="w-6 h-6 shrink-0"
                  />
                  <p>Analysis Complete!</p>
                </div>
              ) : (
                "Analyzing..."
              )}
            </h2>

            <AnalysisChipSet
              items={analysisItems}
              currentIndex={currentStep}
              className="w-full xl:w-[442px]"
              chipClassName="[@media(max-width:500px)]:text-xs"
            />
          </div>

          <div className="w-full [@media(min-width:380px)]:w-[300px] [@media(min-width:500px)]:w-[400px] xl:w-[466px] aspect-[466/510] border border-[#272727] bg-black flex items-center justify-center">
            <img
              src={getGifAsPerCurrentStep(currentStep)}
              className="w-[178px] h-[178px]"
              alt="Analysis progress animation"
            />
          </div>
        </div>

        <div className="bg-black border border-[#272727] xl:h-[68px] flex items-center justify-center px-8 py-4">
          <p className="text-gray-300 text-2xl font-aeonikprotrial-bold">
            Wednesday has helped{" "}
            <span className="text-[#BDA2F4]">
              over 50 digital first companies
            </span>{" "}
            achieve PMF.
          </p>
        </div>
      </div>

      {/* Completion Dialog */}
      <AnalysisCompleteDialog
        isOpen={showCompletionDialog}
        onClose={handleDialogClose}
        insights={insights}
      />
    </div>
  );
};

export default AnalysisScreen;
