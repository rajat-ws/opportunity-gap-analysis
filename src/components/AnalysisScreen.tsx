import { useOpportunityGapAnalysis } from "@/hooks/useOpportunityGapAnalysis";
import { AnalysisOutputResponse } from "@/lib/api";
import { FormData } from "@/lib/validation";
import { useEffect, useState } from "react";
import AnalyticalSkillGif from "../../public/gifs/analytical-skill.gif";
import SeoGif from "../../public/gifs/seo.gif";
import GreenTickCircle from "../../public/svg/green-tick-circle.svg";
import AnalysisChipSet from "./AnalysisChipSet";
import HeroBanner from "./HeroBanner";

const getGifAsPerCurrentStep = (currentStep: number): string => {
  // currently the gifs are being alternated. maybe in future a different gif will be provided for each index
  if (currentStep % 2 === 0) {
    return SeoGif;
  }
  return AnalyticalSkillGif;
};

interface AnalysisScreenProps {
  onComplete: (analysisData?: AnalysisOutputResponse) => void;
  formData: FormData;
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
  const [analysisMessage, setAnalysisMessage] = useState("Analyzing...");

  const {
    result,
    error,
    completedSteps,
    triggerAnalysis,
    pollForResults,
    pollingAttempts,
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
        }
      }
    };

    startAnalysis();
  }, [formData, triggerAnalysis, pollForResults]);

  // Update current step based on completed steps from API
  useEffect(() => {
    if (isAnalysisComplete) return;

    const messages = [
      "Analyzing...",
      "Surveying up and down..",
      "Hold on, we are almost there...",
    ];

    const completedStepsArray = [
      completedSteps.competitorLandscape,
      completedSteps.customerSegmentation,
      completedSteps.unmetNeeds,
      completedSteps.featureBacklog,
    ];

    // Find the first incomplete step
    const firstIncompleteIndex = completedStepsArray.findIndex((step) => !step);
    const newCurrentStep =
      firstIncompleteIndex === -1
        ? analysisItems.length - 1
        : firstIncompleteIndex;

    setCurrentStep(newCurrentStep);
    setAnalysisMessage(messages[pollingAttempts % messages.length]);
  }, [
    completedSteps,
    isAnalysisComplete,
    analysisItems.length,
    pollingAttempts,
  ]);

  // Auto-navigate to next screen when all steps are completed
  useEffect(() => {
    if (isAnalysisComplete) {
      // Small delay to show the completion state briefly
      const timer = setTimeout(() => {
        onComplete(result);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAnalysisComplete, onComplete, result]);
  
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
        
        {/* Updated message with better design and copy */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-aeonikprotrial-medium text-sm">ANALYSIS IN PROGRESS</span>
            </div>
            <h3 className="text-white text-lg font-aeonikprotrial-bold mb-2">
              Generating Your Strategic Market Analysis
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Our AI is conducting deep market research and competitor analysis. 
              This comprehensive process takes <span className="text-white font-medium">3-5 minutes</span>.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Stay here for instant results</span>
              </div>
              <span className="text-gray-600">or</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                <span>Close tab - we'll email your report</span>
              </div>
            </div>
          </div>
        </div>
        
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
                  <p>Analysis Completed!</p>
                </div>
              ) : (
                analysisMessage
              )}
            </h2>

            <AnalysisChipSet
              items={analysisItems}
              currentIndex={currentStep}
              completedSteps={[
                completedSteps.competitorLandscape,
                completedSteps.customerSegmentation,
                completedSteps.unmetNeeds,
                completedSteps.featureBacklog,
              ]}
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
    </div>
  );
};

export default AnalysisScreen;
