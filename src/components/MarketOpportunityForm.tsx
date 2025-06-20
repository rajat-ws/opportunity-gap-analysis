import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { ValidationError, validateFormData } from "@/lib/validation";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Arrow from "../../public/svg/arrow.svg";
import Plus from "../../public/svg/plus-white.svg";
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
  isLoading?: boolean;
  validationErrors?: ValidationError[];
  error?: string | null;
}

const MemoizedInput = memo(
  ({
    value,
    onChange,
    error,
    ...props
  }: React.ComponentProps<typeof Input> & { error?: string }) => (
    <div className="space-y-1">
      <Input
        value={value}
        onChange={onChange}
        {...props}
        className={cn(
          "h-14",
          props.className,
          error && "border-red-500 focus:border-red-500"
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

const MemoizedTextarea = memo(
  ({
    value,
    onChange,
    error,
    ...props
  }: React.ComponentProps<typeof Textarea> & { error?: string }) => (
    <div className="space-y-1">
      <Textarea
        value={value}
        onChange={onChange}
        {...props}
        className={cn(
          "h-36",
          props.className,
          error && "border-red-500 focus:border-red-500"
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
);

const MemoizedAddButton = memo(({ onClick }: { onClick: () => void }) => (
  <Button
    type="button"
    onClick={onClick}
    variant="outline"
    className="h-14 px-6 bg-black border border-[#dee0e399] hover:bg-[#2f2f30] hover:text-white font-aeonikprotrial-bold"
  >
    <img src={Plus} aria-hidden={true} className="w-4 h-4 mr-4" />
    Add more
  </Button>
));

const MemoizedSubmitButton = memo(
  ({
    onClick,
    isLoading,
    disabled,
  }: {
    onClick: (e: React.FormEvent) => void;
    isLoading?: boolean;
    disabled?: boolean;
  }) => (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isLoading || disabled}
      icon={<img src={Arrow} alt="arrow-icon" className="w-10 h-10" />}
      variant="primary"
      size="primary"
      font="primary"
      className={cn(
        "font-aeonikprotrial-bold h-24",
        (isLoading || disabled) && "opacity-50 cursor-not-allowed"
      )}
    >
      {isLoading ? "Starting Analysis..." : "Start Analysis"}
    </Button>
  )
);

const MarketOpportunityForm = ({
  onNext,
  isLoading = false,
  validationErrors = [],
  error,
}: MarketOpportunityFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    marketSegment: "",
    userPersona: "",
    problemSolving: "",
    features: "",
    competitorUrls: [""],
    email: "",
  });
  const [mascotSrc, setMascotSrc] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [localValidationErrors, setLocalValidationErrors] = useState<
    ValidationError[]
  >([]);

  // Use ref to access current formData without causing re-renders
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  // Helper function to get error for a specific field
  const getFieldError = (fieldName: string): string | undefined => {
    // Show local validation errors if validation has been triggered
    if (showValidation) {
      const localError = localValidationErrors.find(
        (error) => error.field === fieldName
      )?.message;
      if (localError) return localError;
    }

    // Show server validation errors
    return validationErrors.find((error) => error.field === fieldName)?.message;
  };

  // Check if form is valid (all required fields filled)
  const isFormValid = useCallback(() => {
    const { marketSegment, userPersona, problemSolving, email } = formData;

    // Required fields: marketSegment, userPersona, problemSolving, email
    const requiredFieldsValid =
      marketSegment.trim().length >= 3 &&
      userPersona.trim().length >= 3 &&
      problemSolving.trim().length >= 3 &&
      email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return requiredFieldsValid;
  }, [formData]);

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
      if (showValidation) {
        setLocalValidationErrors((prev) =>
          prev.filter((err) => err.field !== "marketSegment")
        );
      }
    },
    [showValidation]
  );

  const handleUserPersonaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, userPersona: e.target.value }));
      if (showValidation) {
        setLocalValidationErrors((prev) =>
          prev.filter((err) => err.field !== "userPersona")
        );
      }
    },
    [showValidation]
  );

  const handleProblemSolvingChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, problemSolving: e.target.value }));
      if (showValidation) {
        setLocalValidationErrors((prev) =>
          prev.filter((err) => err.field !== "problemSolving")
        );
      }
    },
    [showValidation]
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
      if (showValidation) {
        setLocalValidationErrors((prev) =>
          prev.filter((err) => err.field !== "email")
        );
      }
    },
    [showValidation]
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

  const updateCompetitorUrl = useCallback(
    (index: number, value: string) => {
      setFormData((prev) => ({
        ...prev,
        competitorUrls: prev.competitorUrls.map((url, i) =>
          i === index ? value : url
        ),
      }));
      if (showValidation) {
        setLocalValidationErrors((prev) =>
          prev.filter((err) => err.field !== "competitorUrls")
        );
      }
    },
    [showValidation]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validate form data
      const validationResult = validateFormData(formDataRef.current);

      if (validationResult.isValid) {
        // Clear any previous validation errors
        setShowValidation(false);
        setLocalValidationErrors([]);
        onNext(formDataRef.current);
      } else {
        // Show validation errors
        setShowValidation(true);
        setLocalValidationErrors(validationResult.errors);
      }
    },
    [onNext]
  );

  return (
    <div className="h-screen home-bg relative w-full overflow-hidden">
      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 overlay-gradient opacity-85" />
      <div className="flex flex-col items-center [@media(min-width:800px)_and_(min-height:980px)]:justify-center p-6 relative h-full overflow-y-auto">
        <HeroBanner />
        <div className="w-full max-w-[777px] mx-auto lg:mx-0">
          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-500 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-8 font-aeonikprotrial-light"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white">
                  What is your market segment?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <MemoizedInput
                  placeholder="e.g., Health & Wellness"
                  value={formData.marketSegment}
                  onChange={handleMarketSegmentChange}
                  error={getFieldError("marketSegment")}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-white font-medium">
                  What's your user persona?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <MemoizedInput
                  placeholder="e.g., Tech Savvy aged between 20-30"
                  value={formData.userPersona}
                  onChange={handleUserPersonaChange}
                  error={getFieldError("userPersona")}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-white font-medium">
                  What problem are you solving?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <MemoizedTextarea
                  placeholder="Enter business problems"
                  value={formData.problemSolving}
                  onChange={handleProblemSolvingChange}
                  error={getFieldError("problemSolving")}
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
              <label className="text-white font-medium flex gap-2">
                Can you share a competitor URL?
                <span>[Optional]</span>
              </label>
              <div className="flex flex-wrap gap-4 items-end">
                {formData.competitorUrls.map((url, index) => (
                  <CompetitorUrlInput
                    key={index}
                    index={index}
                    value={url}
                    onChange={updateCompetitorUrl}
                    error={getFieldError("competitorUrls")}
                  />
                ))}
                {formData.competitorUrls.length < 5 && (
                  <MemoizedAddButton onClick={addCompetitorUrl} />
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-white font-medium">
                What is your email address?{" "}
                <span className="text-red-400">*</span>
              </label>
              <MemoizedInput
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleEmailChange}
                error={getFieldError("email")}
                required
              />
            </div>

            <MemoizedSubmitButton
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          </form>

          <div className="text-center mt-12">
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
    error,
  }: {
    index: number;
    value: string;
    onChange: (index: number, value: string) => void;
    error?: string;
  }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(index, e.target.value);
      },
      [index, onChange]
    );

    return (
      <div className="flex-1 min-w-[250px] space-y-1">
        <Input
          placeholder={`Enter Competitor URL ${index + 1}`}
          value={value}
          onChange={handleChange}
          className={cn("h-14", error && "border-red-500 focus:border-red-500")}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

export default memo(MarketOpportunityForm);
