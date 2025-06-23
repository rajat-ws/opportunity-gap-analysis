import { config } from "./config";

// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  marketSegment: string;
  userPersona: string;
  problemSolving: string;
  features: string;
  competitorUrls: string[];
  email: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// URL validation regex (basic)
const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!config.validation.emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return null;
};

export const validateRequired = (
  value: string,
  fieldName: string
): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  if (value.trim().length < config.validation.minFieldLength) {
    return `${fieldName} must be at least ${config.validation.minFieldLength} characters long`;
  }

  if (value.trim().length > config.validation.maxFieldLength) {
    return `${fieldName} must be less than ${config.validation.maxFieldLength} characters`;
  }

  return null;
};

export const validateUrl = (url: string): string | null => {
  if (!url.trim()) {
    return null; // URL is optional
  }

  if (!config.validation.urlRegex.test(url)) {
    return "Please enter a valid URL starting with http:// or https://";
  }

  return null;
};

export const validateCompetitorUrls = (urls: string[]): string | null => {
  // Filter out empty URLs
  const validUrls = urls.filter((url) => url.trim());

  // Competitor URLs are optional, so no minimum requirement
  // Only validate the URLs that are provided
  for (const url of validUrls) {
    const urlError = validateUrl(url);
    if (urlError) {
      return urlError;
    }
  }

  return null;
};

export const validateFeatures = (features: string): string | null => {
  if (!features.trim()) {
    return null; // Features is optional
  }

  if (features.trim().length > config.validation.maxFieldLength) {
    return `Features description must be less than ${config.validation.maxFieldLength} characters`;
  }

  return null;
};

export const validateFormData = (formData: FormData): FormValidationResult => {
  const errors: ValidationError[] = [];

  // Validate required fields
  const marketSegmentError = validateRequired(
    formData.marketSegment,
    "Market segment"
  );
  if (marketSegmentError) {
    errors.push({ field: "marketSegment", message: marketSegmentError });
  }

  const userPersonaError = validateRequired(
    formData.userPersona,
    "User persona"
  );
  if (userPersonaError) {
    errors.push({ field: "userPersona", message: userPersonaError });
  }

  const problemSolvingError = validateRequired(
    formData.problemSolving,
    "Business problem"
  );
  if (problemSolvingError) {
    errors.push({ field: "problemSolving", message: problemSolvingError });
  }

  // Validate email
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }

  // Validate features (optional)
  const featuresError = validateFeatures(formData.features);
  if (featuresError) {
    errors.push({ field: "features", message: featuresError });
  }

  // Validate competitor URLs (optional)
  const competitorUrlsError = validateCompetitorUrls(formData.competitorUrls);
  if (competitorUrlsError) {
    errors.push({ field: "competitorUrls", message: competitorUrlsError });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Real-time validation helpers
export const validateField = (
  fieldName: keyof FormData,
  value: string | string[]
): string | null => {
  switch (fieldName) {
    case "marketSegment":
      return validateRequired(value as string, "Market segment");
    case "userPersona":
      return validateRequired(value as string, "User persona");
    case "problemSolving":
      return validateRequired(value as string, "Business problem");
    case "email":
      return validateEmail(value as string);
    case "features":
      return validateFeatures(value as string);
    case "competitorUrls":
      return validateCompetitorUrls(value as string[]);
    default:
      return null;
  }
};
