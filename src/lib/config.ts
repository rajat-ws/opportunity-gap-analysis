// Centralized configuration for the application
export const config = {
  // API Configuration
  api: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "https://n8n.wednesday.is/webhook",
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    pollingInterval: 2000, // 2 seconds
    maxPollingAttempts: 30,
  },

  // App Configuration
  app: {
    name: "Opportunity Gap Analysis",
    version: "1.0.0",
    environment: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },

  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    enableErrorReporting:
      import.meta.env.VITE_ENABLE_ERROR_REPORTING === "true",
    enableDebugMode: import.meta.env.VITE_DEBUG_MODE === "true",
  },

  // Validation Rules
  validation: {
    minFieldLength: 3,
    maxFieldLength: 1000,
    emailRegex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    urlRegex:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  },

  // UI Configuration
  ui: {
    animationDuration: 300,
    gifChangeInterval: 20000, // 20 seconds
    stepProgressionInterval: 3000, // 3 seconds
  },
} as const;

// Type-safe environment variables
export type Config = typeof config;
