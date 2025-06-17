import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Arrow from "../../public/svg/arrow.svg";
import HeroBanner from "./HeroBanner";

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
  const [mascotSrc, setMascotSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const loadMascot = async () => {
      // load only when needed
      if (window.innerWidth >= 1396 && !mascotSrc) {
        const module = await import("../../public/images/mascot.png");
        if (mounted) {
          setMascotSrc(module.default);
        }
      }
    };

    loadMascot();
    window.addEventListener('resize', loadMascot);
    return () => {
      mounted = false;
      window.removeEventListener('resize', loadMascot);
    };
  }, [mascotSrc]);

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
    <div className="min-h-screen home-bg relative w-full overflow-hidden">
      {/* Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 80% 20%,rgb(29, 23, 37) 50%,rgb(19, 19, 18) 70%, transparent 90%), linear-gradient(135deg, #000 10%, transparent 60%)",
          opacity: 0.85,
        }}
      />
     <div className="flex flex-col items-center justify-center p-6">
     <HeroBanner />
     <div className="w-full max-w-[777px] mx-auto lg:mx-0">        
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-white font-medium">What is your market segment?</label>
              <Input
                placeholder="e.g., Health & Wellness"
                value={formData.marketSegment}
                onChange={(e) => setFormData(prev => ({ ...prev, marketSegment: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium">What's your user persona?</label>
              <Input
                placeholder="e.g., Tech Savvy aged between 20-30"
                value={formData.userPersona}
                onChange={(e) => setFormData(prev => ({ ...prev, userPersona: e.target.value }))}
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
                className="min-h-[120px] resize-none"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium flex justify-between">
                What features do you have in mind? <span>[Optional]</span>
              </label>
              <Textarea
                placeholder="Enter optional feature sets"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                className="min-h-[120px] resize-none"
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
                  className="h-12 flex-1 min-w-[250px]"
                />
              ))}
              <Button
                type="button"
                onClick={addCompetitorUrl}
                variant="outline"
                className="h-12 px-6 bg-black border border-[#dee0e399] hover:bg-[#2f2f30] hover:text-white"
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
              required
            />
          </div>

            <Button
              type="submit"
              icon={
                <img src={Arrow} alt="arrow-icon" className="w-10 h-10" />
              }
              variant="primary"
              size="primary"
              font="primary"
            >
              Start Analysis
            </Button>
        </form>

        <div className="text-center mt-12">
          <p className="text-gray-300">
            Wednesday has helped <span className="text-[#BDA2F4]">over 50 digital first companies </span> achieve PMF.
          </p>
        </div>

        {/* Character illustration placeholder */}
        {mascotSrc && (
          <img 
            src={mascotSrc} 
            alt=""
            aria-hidden="true"
            className="absolute -bottom-[35px] -right-[214px] w-[690px] h-[460px] hidden [@media(min-width:1396px)]:block" 
          />
        )}
      </div>
     </div>
    </div>
  );
};

export default MarketOpportunityForm;
