import { Button } from "@/components/ui/button";
import { BarChart3, Clock, Download } from "lucide-react";
import { useEffect, useState } from "react";

interface AnalysisItem {
  id: string;
  title: string;
  completed: boolean;
}

interface AnalysisScreenProps {
  onComplete: () => void;
}

const AnalysisScreen = ({ onComplete }: AnalysisScreenProps) => {
  const [analysisItems, setAnalysisItems] = useState<AnalysisItem[]>([
    { id: "1", title: "Competitor Landscape", completed: false },
    { id: "2", title: "New Customer Segmentation", completed: false },
    { id: "3", title: "Prioritizing Unmet User Needs", completed: false },
    { id: "4", title: "Prioritized Feature Backlog", completed: false },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisItems.length - 1) {
          setAnalysisItems(items => 
            items.map((item, index) => 
              index <= prev ? { ...item, completed: true } : item
            )
          );
          return prev + 1;
        } else {
          setAnalysisItems(items => 
            items.map(item => ({ ...item, completed: true }))
          );
          setTimeout(() => setIsAnalysisComplete(true), 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    // Placeholder for download functionality
    console.log('Download report clicked');
    // This will be replaced with actual download logic
  };

  return (
    <div className="min-h-screen analysis-bg flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Market Opportunity</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Wednesday has helped over 50 digital first companies achieve PMF.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-white text-2xl font-semibold mb-6">
              {isAnalysisComplete ? "Analysis Complete!" : "Analyzing..."}
            </h2>
            
            {analysisItems.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.completed 
                    ? 'bg-green-500' 
                    : index === currentStep 
                      ? 'bg-purple-500 animate-pulse' 
                      : 'bg-gray-600'
                }`}>
                  {item.completed ? (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : index === currentStep ? (
                    <Clock className="w-3 h-3 text-white" />
                  ) : null}
                </div>
                <span className={`text-lg ${item.completed ? 'text-white' : 'text-gray-400'}`}>
                  {item.title}
                </span>
              </div>
            ))}

            {isAnalysisComplete && (
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <Button 
                  onClick={handleDownload}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-80 h-80 bg-gray-900/20 rounded-lg border border-gray-700/50 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center ${
                isAnalysisComplete ? '' : 'animate-pulse'
              }`}>
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <div className={`h-2 bg-gray-700 rounded-full ${isAnalysisComplete ? '' : 'animate-pulse'}`}></div>
                <div className={`h-2 bg-gray-700 rounded-full w-3/4 mx-auto ${isAnalysisComplete ? '' : 'animate-pulse'}`}></div>
                <div className={`h-2 bg-gray-700 rounded-full w-1/2 mx-auto ${isAnalysisComplete ? '' : 'animate-pulse'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
