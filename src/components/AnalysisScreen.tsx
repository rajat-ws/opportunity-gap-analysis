import { AnalysisOutputResponse } from "@/lib/api";
import { FormData, ValidationError } from "@/lib/validation";
import { useEffect, useRef, useState } from "react";
import AnalyticalSkillGif from "../../public/gifs/analytical-skill.gif";
import SeoGif from "../../public/gifs/seo.gif";
import GreenTickCircle from "../../public/svg/green-tick-circle.svg";
import SettingGear from "../../public/svg/keyboard-option-setting-gear.svg";
import PieIcon from "../../public/svg/pie.svg";
import RankIcon from "../../public/svg/ranking-light.svg";
import UserIdIcon from "../../public/svg/user-id-outline.svg";
import AnalysisChipSet from "./AnalysisChipSet";
import HeroBanner from "./HeroBanner";

const gifs = [SeoGif, AnalyticalSkillGif];

interface AnalysisScreenProps {
  formData: FormData;
  triggerAnalysis: (formData: {
    marketSegment: string;
    userPersona: string;
    problemSolving: string;
    features: string;
    competitorUrls: string[];
    email: string;
  }) => Promise<{
    success: boolean;
    analysisId?: string;
    error?: string;
    validationErrors?: ValidationError[];
  }>;
  pollForResults: (analysisId: string) => Promise<{
    success: boolean;
    result?: AnalysisOutputResponse;
    error?: string;
  }>;
  result: AnalysisOutputResponse | null;
  pollingAttempts: number;
  error: string | null;
}

const AnalysisScreen = ({
  formData,
  triggerAnalysis,
  pollForResults,
  result,
  pollingAttempts,
  error,
}: AnalysisScreenProps) => {
  const analysisItems = [
    { text: "Competitor Landscape", icon: PieIcon },
    { text: "New Customer Segmentation", icon: UserIdIcon },
    { text: "Ranked Unmet Needs", icon: RankIcon },
    { text: "Prioritized Feature Backlog", icon: SettingGear },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState("Analyzing...");
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({
    competitorLandscape: false,
    customerSegmentation: false,
    unmetNeeds: false,
    featureBacklog: false,
  });

  // Add ref to track if analysis has been started
  const hasStartedAnalysis = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 20000); // Change GIF every 20 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Update completed steps every 3 seconds
  useEffect(() => {
    // Only start the progression if analysis is not complete
    if (isAnalysisComplete) {
      return;
    }

    const stepKeys = [
      "competitorLandscape",
      "customerSegmentation",
      "unmetNeeds",
      "featureBacklog",
    ] as const;

    const intervalId = setInterval(() => {
      setCompletedSteps((prev) => {
        // Find the first incomplete step in the previous state
        const currentStepIndex = stepKeys.findIndex((key) => !prev[key]);

        // If all steps are completed, do nothing.
        if (currentStepIndex === -1) {
          return prev;
        }

        // Mark the current step as completed
        const newCompletedSteps = {
          ...prev,
          [stepKeys[currentStepIndex]]: true,
        };

        // If this was the last step, mark analysis as complete
        if (currentStepIndex === stepKeys.length - 1) {
          setIsAnalysisComplete(true);
        }

        return newCompletedSteps;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId);
  }, [isAnalysisComplete]);

  // Update current step based on completed steps
  useEffect(() => {
    if (isAnalysisComplete) {
      setCurrentStep(analysisItems.length); // Ensure all steps are shown as completed
      return;
    }

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
    <>
      <div className="min-h-screen analysis-bg flex flex-col items-center [@media(min-width:800px)_and_(min-height:980px)]:justify-center px-6 py-6">
        <HeroBanner />

        <div className="w-full xl:w-[1152px] flex flex-col items-center gap-y-16">
          {/* border */}
          <div className="w-full xl:w-[1152px] h-[1px] opacity-20 border-gradient font-aeonikprotrial-light" />

          {/* Show completion message when analysis is complete */}
          {isAnalysisComplete && (
            <div className="w-full max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-[#1a1a1a5e] to-[#2a2a2a5a] rounded-lg py-6 px-4 text-center">
                <p className="text-gray-300 text-sm sm:text-xl leading-relaxed font-aeonikprotrial-light">
                  💌 Your personalised Opportunity Gap Analysis research report
                  will be sent directly to you via email within the next 5
                  minutes.
                </p>
              </div>
            </div>
          )}

          <div className="w-fit xl:max-w-6xl mx-auto xl:mx-0 flex flex-col xl:flex-row gap-x-[112px] gap-y-8 items-center">
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

            <div className="w-full [@media(min-width:380px)]:w-[300px] [@media(min-width:500px)]:w-[400px] xl:w-[466px] aspect-[466/510] border border-[#272727] bg-black hidden xl:flex items-center justify-center">
              <img
                src={gifs[currentGifIndex]}
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
    </>
  );
};

export default AnalysisScreen;
