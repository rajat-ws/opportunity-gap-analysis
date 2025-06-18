import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
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

const MemoizedInput = memo(
  ({ value, onChange, ...props }: React.ComponentProps<typeof Input>) => (
    <Input value={value} onChange={onChange} {...props} />
  )
);

const MemoizedTextarea = memo(
  ({ value, onChange, ...props }: React.ComponentProps<typeof Textarea>) => (
    <Textarea value={value} onChange={onChange} {...props} />
  )
);

const MemoizedAddButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    className="h-12 px-6 bg-black border border-[#dee0e399] hover:bg-[#2f2f30] hover:text-white"
  >
    <Plus className="w-4 h-4 mr-2" />
    Add more
  </Button>
));

const MemoizedSubmitButton = memo(
  ({ onClick }: { onClick: (e: React.FormEvent) => void }) => (
    <Button
      type="submit"
      onClick={onClick}
      icon={<img src={Arrow} alt="arrow-icon" className="w-10 h-10" />}
      variant="primary"
      size="primary"
      font="primary"
    >
      Start Analysis
    </Button>
  )
);

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

  // Use ref to access current formData without causing re-renders
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

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
    window.addEventListener("resize", loadMascot);
    return () => {
      mounted = false;
      window.removeEventListener("resize", loadMascot);
    };
  }, [mascotSrc]);

  const handleMarketSegmentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, marketSegment: e.target.value }));
    },
    []
  );

  const handleUserPersonaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, userPersona: e.target.value }));
    },
    []
  );

  const handleProblemSolvingChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, problemSolving: e.target.value }));
    },
    []
  );

  const handleFeaturesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, features: e.target.value }));
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, email: e.target.value }));
    },
    []
  );

  const addCompetitorUrl = useCallback(() => {
    setFormData((prev) => {
      if (prev.competitorUrls.length >= 5) {
        return prev;
      }
      return {
        ...prev,
        competitorUrls: [...prev.competitorUrls, ""],
      };
    });
  }, []);

  const updateCompetitorUrl = useCallback((index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      competitorUrls: prev.competitorUrls.map((url, i) =>
        i === index ? value : url
      ),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onNext(formDataRef.current);
    },
    [onNext]
  );

  return (
    <div className="min-h-screen home-bg relative w-full overflow-hidden">
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 overlay-gradient opacity-85" />
      <div className="flex flex-col items-center p-6 top-[50vh] -translate-y-2/4 relative">
        <HeroBanner />
        <div className="w-full max-w-[777px] mx-auto lg:mx-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white font-medium">
                  What is your market segment?
                </label>
                <MemoizedInput
                  placeholder="e.g., Health & Wellness"
                  value={formData.marketSegment}
                  onChange={handleMarketSegmentChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-white font-medium">
                  What's your user persona?
                </label>
                <MemoizedInput
                  placeholder="e.g., Tech Savvy aged between 20-30"
                  value={formData.userPersona}
                  onChange={handleUserPersonaChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white font-medium">
                  What problem are you solving?
                </label>
                <MemoizedTextarea
                  placeholder="Enter business problems"
                  value={formData.problemSolving}
                  onChange={handleProblemSolvingChange}
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-white font-medium flex justify-between">
                  What features do you have in mind? <span>[Optional]</span>
                </label>
                <MemoizedTextarea
                  placeholder="Enter optional feature sets"
                  value={formData.features}
                  onChange={handleFeaturesChange}
                  className="min-h-[120px] resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-white font-medium">
                Can you share a competitor URL?
              </label>
              <div className="flex flex-wrap gap-4 items-end">
                {formData.competitorUrls.map((url, index) => (
                  <CompetitorUrlInput
                    key={index}
                    index={index}
                    value={url}
                    onChange={updateCompetitorUrl}
                  />
                ))}
                {formData.competitorUrls.length < 5 && (
                  <MemoizedAddButton onClick={addCompetitorUrl} />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium">
                What is your email address?
              </label>
              <MemoizedInput
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <MemoizedSubmitButton onClick={handleSubmit} />
          </form>

          <div className="text-center mt-12">
            <p className="text-gray-300 text-2xl">
              Wednesday has helped{" "}
              <span className="text-[#BDA2F4]">
                over 50 digital first companies
              </span>
              {" "}achieve PMF.
            </p>
          </div>
        </div>
      </div>
      {mascotSrc && (
            <img
              src={mascotSrc}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-[35px] left-2/4 translate-x-[220px] w-[690px] h-[460px] hidden [@media(min-width:1396px)]:block pointer-events-none"
            />
          )}
    </div>
  );
};

const CompetitorUrlInput = memo(
  ({
    index,
    value,
    onChange,
  }: {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
  }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(index, e.target.value);
      },
      [index, onChange]
    );

    return (
      <MemoizedInput
        placeholder={`Enter Competitor URL ${index + 1}`}
        value={value}
        onChange={handleChange}
        className="h-12 flex-1 min-w-[250px]"
      />
    );
  }
);

export default memo(MarketOpportunityForm);
