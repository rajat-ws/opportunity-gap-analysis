import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import AnalysisChipSet from "./AnalysisChipSet";
import GreenTickCircle from "../../public/svg/green-tick-circle.svg"


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
        } else {
          setTimeout(() => setIsAnalysisComplete(true), 1000);
          return prev + 1;
        }
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="text-center lg:text-left">
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

          <div className="space-y-4">
            <h2 className="text-white text-2xl font-semibold mb-6">
              {isAnalysisComplete ? (
                <div className="flex items-center gap-x-[14px]">
                  <img
                    src={GreenTickCircle}
                    alt="green tick circle icon"
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
        </div>

        <div className="flex items-center justify-center">
          <div className="w-80 h-80 bg-gray-900/20 rounded-lg border border-gray-700/50 flex items-center justify-center">
            <div className="text-center">
              <div
                className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center ${
                  isAnalysisComplete ? "" : "animate-pulse"
                }`}
              >
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <div
                  className={`h-2 bg-gray-700 rounded-full ${
                    isAnalysisComplete ? "" : "animate-pulse"
                  }`}
                ></div>
                <div
                  className={`h-2 bg-gray-700 rounded-full w-3/4 mx-auto ${
                    isAnalysisComplete ? "" : "animate-pulse"
                  }`}
                ></div>
                <div
                  className={`h-2 bg-gray-700 rounded-full w-1/2 mx-auto ${
                    isAnalysisComplete ? "" : "animate-pulse"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
