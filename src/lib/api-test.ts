// Test file to verify the new opportunity gap analysis API endpoints
import {
  formatAnalysisForConsole,
  getAnalysisInsights,
} from "./analysis-utils";
import { apiService } from "./api";

const testOpportunityGapApi = async () => {
  console.log("🧪 Testing Opportunity Gap Analysis API endpoints...");

  try {
    // Test the trigger endpoint with the exact data from your curl example
    const testData = {
      market_segment: "AI-powered writing assistants",
      business_problem:
        "Team collaboration, workflow integration, and analytics",
      user_segment:
        "Writers (creative, professional, academic), marketers, students, Freelancers",
      competitor: [
        "https://sudowrite.com/?via=aitoolsdirectory",
        "https://prowritingaid.com/",
        "https://www.paragraphai.com/?ref=ffmedia",
        "gomoonbeam.com",
        "https://writersbrew.app/",
      ],
    };

    console.log("📤 Triggering analysis with test data:", testData);

    const triggerResponse =
      await apiService.triggerOpportunityGapAnalysis(testData);
    console.log("✅ Trigger response:", triggerResponse);

    if (triggerResponse.id) {
      console.log("🆔 Analysis ID received:", triggerResponse.id);

      // Test polling for results
      console.log("⏳ Starting to poll for results...");
      const result = await apiService.pollForResults(triggerResponse.id);
      console.log("🎉 Final result received!");

      // Format and display the results
      formatAnalysisForConsole(result);

      // Get key insights
      const insights = getAnalysisInsights(result);
      console.log("💡 Key Insights:", insights);

      return { success: true, result, insights };
    } else {
      console.error("❌ No analysis ID received in response");
      return { success: false, error: "No analysis ID received" };
    }
  } catch (error) {
    console.error("❌ API test failed:", error);
    return { success: false, error };
  }
};

// Test just the trigger endpoint without polling
const testTriggerOnly = async () => {
  console.log("🧪 Testing trigger endpoint only...");

  try {
    const testData = {
      market_segment: "AI-powered writing assistants",
      business_problem:
        "Team collaboration, workflow integration, and analytics",
      user_segment:
        "Writers (creative, professional, academic), marketers, students, Freelancers",
      competitor: [
        "https://sudowrite.com/?via=aitoolsdirectory",
        "https://prowritingaid.com/",
      ],
    };

    const response = await apiService.triggerOpportunityGapAnalysis(testData);
    console.log("✅ Trigger response:", response);
    return response;
  } catch (error) {
    console.error("❌ Trigger test failed:", error);
    throw error;
  }
};

// Test polling with a known ID (for manual testing)
const testPollingWithId = async (analysisId: string) => {
  console.log(`🧪 Testing polling with ID: ${analysisId}`);

  try {
    const result = await apiService.pollForResults(analysisId);
    console.log("✅ Polling result received!");

    // Format and display the results
    formatAnalysisForConsole(result);

    // Get key insights
    const insights = getAnalysisInsights(result);
    console.log("💡 Key Insights:", insights);

    return { result, insights };
  } catch (error) {
    console.error("❌ Polling test failed:", error);
    throw error;
  }
};

// Test with sample data to verify formatting
const testWithSampleData = async () => {
  console.log("🧪 Testing with sample data...");

  const sampleResult = {
    allItems: [
      {
        sheetName: "New Customer Segmentation",
        data: [
          {
            Name: "Young Digital Professionals",
            "Archetype & Definition":
              "Tech-savvy, urban professionals seeking fast, efficient investment platforms for wealth growth",
            "JTBD / Top 3 Needs":
              "• When I receive my salary, I want to invest instantly, so I can maximize returns",
            "Demographics & Firmographics":
              "• Geography: India • Role: Individual investor • Company size: N/A",
            "Psychographics & Motivators":
              "• Values digital innovation • Seeks transparency • Tolerates moderate risk",
            "Acquisition Channels":
              "• SEO • Digital advertising • App store presence",
            "WTP Tier & Pricing Sensitivity":
              "Tier: Medium • Budget note: Cost-sensitive yet willing to invest for added value",
            "Market Size & Growth Rate": "TAM/SAM: Large • CAGR: 15%",
          },
        ],
      },
      {
        sheetName: "Ranked Unmet Needs",
        data: [
          {
            "Priority Score / Rank": "1",
            "Jobs-to-Be-Done Context":
              "When I receive my salary, I want to invest instantly, so I can maximize returns",
            "Persona & Segment Details":
              "• Archetype: Young Digital Professionals • Age Band: 25–45 • Sophistication: Med • Goals: Fast, efficient wealth growth",
            "Need Statement":
              "A unified, instantaneous investment initiation interface that allows investing across multiple asset classes in one go",
            "Frequency & Severity":
              "• Frequency: Daily • Severity: High Impact",
            "Satisfaction Score": "4",
            "Opportunity Gap Score": "9",
            "Current Workarounds":
              "Using multiple bank and brokerage apps; manual fund transfers to different platforms",
            "WTP Tier": "Medium",
            "Competitor Coverage":
              "• Who: Zerodha, Upstox • How well: Strong on individual trading execution but lacking a seamless, fully integrated experience",
          },
        ],
      },
    ],
  };

  formatAnalysisForConsole(sampleResult);
  const insights = getAnalysisInsights(sampleResult);
  console.log("💡 Sample Insights:", insights);

  return { sampleResult, insights };
};

// Make functions available globally for browser testing
if (typeof window !== "undefined") {
  (window as any).testOpportunityGapApi = testOpportunityGapApi;
  (window as any).testTriggerOnly = testTriggerOnly;
  (window as any).testPollingWithId = testPollingWithId;
  (window as any).testWithSampleData = testWithSampleData;

  console.log("🔧 API test functions available globally:");
  console.log("  testOpportunityGapApi() - Test full flow");
  console.log("  testTriggerOnly() - Test trigger only");
  console.log('  testPollingWithId("your-id") - Test polling with specific ID');
  console.log("  testWithSampleData() - Test formatting with sample data");
}

export {
  testOpportunityGapApi,
  testPollingWithId,
  testTriggerOnly,
  testWithSampleData,
};
