import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

interface AnalysisCompleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  insights?: string[];
}

const AnalysisCompleteDialog = ({
  isOpen,
  onClose,
  insights = [],
}: AnalysisCompleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Analysis Complete!
          </DialogTitle>
          <DialogDescription>
            Your opportunity gap analysis has been completed successfully. The
            detailed results have been logged to the browser console for your
            review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Key Insights */}
          {insights.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">
                🎯 Key Insights
              </h3>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li
                    key={index}
                    className="text-sm text-blue-800 flex items-start gap-2"
                  >
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Console Instructions */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-900 mb-2">
              📋 How to View Full Results
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Complete analysis results are available in the browser console:
            </p>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>
                1. Open browser developer tools (F12 or right-click → Inspect)
              </li>
              <li>2. Go to the Console tab</li>
              <li>3. Look for "🎯 Opportunity Gap Analysis Results"</li>
              <li>4. Expand the sections to view detailed data</li>
            </ol>
          </div>

          {/* What's Included */}
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">
              📊 Analysis Includes
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
              <div>• Customer Segments</div>
              <div>• Unmet Needs Ranking</div>
              <div>• Feature Backlog</div>
              <div>• Competitor Analysis</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                // Try to open developer tools (may not work in all browsers)
                if (window.open) {
                  window.open("", "_blank");
                }
                onClose();
              }}
            >
              Open Console
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisCompleteDialog;
