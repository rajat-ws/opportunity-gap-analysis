import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import AnalysisChipSet from "./AnalysisChipSet";
import GreenTickCircle from "../../public/svg/green-tick-circle.svg"
import SeoGif from "../../public/gifs/seo.gif"
import AnalyticalSkillGif from "../../public/gifs/analytical-skill.gif"

const getGifAsPerCurrentStep = (currentStep: number): string => {
  // currently the gifs are being alternated. maybe in future a different gif will be provided for each index
  if (currentStep % 2 === 0) {
    return SeoGif;
  }
  return AnalyticalSkillGif;
}

interface AnalysisScreenProps {
  onComplete: () => void;
}

const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const analysisItems = [
    "Competitor Landscape",
    "New Customer Segmentation",
    "Prioritizing Unmet User Needs",
    "Prioritized Feature Backlog",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisItems.length - 1) {
          return prev + 1;
        }
        if (!isAnalysisComplete) {
          setIsAnalysisComplete(true);
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen gradient-bg p-6 flex flex-col items-center gap-y-16">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Find Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Market Opportunity
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          Wednesday has helped over 50 digital first companies achieve PMF.
        </p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-x-28 items-start">
        <div className="space-y-8">
          <h2 className="text-white text-2xl font-semibold mb-6">
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
            className="w-[442px]"
          />
        </div>

        <div className="w-[466px] h-[510px] border border-[#272727] bg-black flex items-center justify-center">
          <img 
            src={getGifAsPerCurrentStep(currentStep)} 
            className="w-[178px] h-[178px]"
            alt="Analysis progress animation"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
