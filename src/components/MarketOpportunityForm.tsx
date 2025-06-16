
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface FormData {
  marketSegment: string;
  userPersona: string;
  problemSolving: string;
  features: string;
  competitorUrls: string[];
  email: string;
}

interface MarketOpportunityFormProps {
  onNext: (data: FormData) => void;
}

const MarketOpportunityForm = ({ onNext }: MarketOpportunityFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    marketSegment: "",
    userPersona: "",
    problemSolving: "",
    features: "",
    competitorUrls: ["", ""],
    email: "",
  });

  const addCompetitorUrl = () => {
    setFormData(prev => ({
      ...prev,
      competitorUrls: [...prev.competitorUrls, ""]
    }));
  };

  const updateCompetitorUrl = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      competitorUrls: prev.competitorUrls.map((url, i) => i === index ? value : url)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Market Opportunity</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Wednesday has helped over 50 digital first companies achieve PMF.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-white font-medium">What is your market segment?</label>
              <Input
                placeholder="e.g., Health & Wellness"
                value={formData.marketSegment}
                onChange={(e) => setFormData(prev => ({ ...prev, marketSegment: e.target.value }))}
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium">What's your user persona?</label>
              <Input
                placeholder="e.g., Tech Savvy aged between 20-30"
                value={formData.userPersona}
                onChange={(e) => setFormData(prev => ({ ...prev, userPersona: e.target.value }))}
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-white font-medium">What problem are you solving?</label>
              <Textarea
                placeholder="Enter business problems"
                value={formData.problemSolving}
                onChange={(e) => setFormData(prev => ({ ...prev, problemSolving: e.target.value }))}
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 min-h-[120px] resize-none"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium">
                What features do you have in mind? <span className="text-gray-400">[Optional]</span>
              </label>
              <Textarea
                placeholder="Enter optional feature sets"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 min-h-[120px] resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-white font-medium">Can you share a competitor URL?</label>
            <div className="flex flex-wrap gap-4 items-end">
              {formData.competitorUrls.map((url, index) => (
                <Input
                  key={index}
                  placeholder={`Enter Competitor URL ${index + 1}`}
                  value={url}
                  onChange={(e) => updateCompetitorUrl(index, e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12 flex-1 min-w-[250px]"
                />
              ))}
              <Button
                type="button"
                onClick={addCompetitorUrl}
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 h-12 px-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add more
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-white font-medium">What is your email address?</label>
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 h-12"
              required
            />
          </div>

          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              className="purple-gradient text-white px-12 py-4 text-lg font-medium hover:opacity-90 transition-opacity min-w-[200px]"
            >
              Next
            </Button>
          </div>
        </form>

        <div className="text-center mt-12">
          <p className="text-gray-300">
            Wednesday has helped over 50 digital first companies achieve PMF.
          </p>
        </div>

        {/* Character illustration placeholder */}
        <div className="fixed bottom-0 right-8 w-32 h-40 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-full opacity-20 hidden lg:block"></div>
      </div>
    </div>
  );
};

export default MarketOpportunityForm;
