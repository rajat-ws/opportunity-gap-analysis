import { AnalysisOutputResponse } from "./api";

// Define the data types for each sheet
interface CustomerSegmentationData {
  Name: string;
  "Archetype & Definition": string;
  "JTBD / Top 3 Needs": string;
  "Demographics & Firmographics": string;
  "Market Size & Growth Rate": string;
}

interface UnmetNeedsData {
  "Need Statement": string;
  "Priority Score / Rank": string;
  "Opportunity Gap Score": string;
  "Jobs-to-Be-Done Context": string;
  "WTP Tier": string;
}

interface FeatureBacklogData {
  Title: string;
  "Priority Score / Rank": string;
  "Description & User Story": string;
  "Primary Persona": string;
  "Success Metric(s) - How you'll measure impact": string;
}

interface CompetitorLandscapeData {
  "Competitor Name": string;
  URL: string;
  "Business Model": string;
  "Primary Differentiator": string;
  "Market & Segment": string;
}

export interface ParsedAnalysisResult {
  customerSegmentation: CustomerSegmentationData[];
  unmetNeeds: UnmetNeedsData[];
  featureBacklog: FeatureBacklogData[];
  competitorLandscape: CompetitorLandscapeData[];
  summary: {
    totalSegments: number;
    totalUnmetNeeds: number;
    totalFeatures: number;
    totalCompetitors: number;
    topOpportunityGap: string;
    topFeature: string;
  };
}

export const parseAnalysisResult = (
  result: AnalysisOutputResponse
): ParsedAnalysisResult => {
  // Ensure result and allItems exist
  if (!result || !Array.isArray(result.allItems)) {
    console.warn("Invalid analysis result format:", result);
    return {
      customerSegmentation: [],
      unmetNeeds: [],
      featureBacklog: [],
      competitorLandscape: [],
      summary: {
        totalSegments: 0,
        totalUnmetNeeds: 0,
        totalFeatures: 0,
        totalCompetitors: 0,
        topOpportunityGap: "No data available",
        topFeature: "No data available",
      },
    };
  }

  const customerSegmentation = (result.allItems.find(
    (item) => item?.sheetName === "New Customer Segmentation"
  )?.data || []) as CustomerSegmentationData[];

  const unmetNeeds = (result.allItems.find(
    (item) => item?.sheetName === "Ranked Unmet Needs"
  )?.data || []) as UnmetNeedsData[];

  const featureBacklog = (result.allItems.find(
    (item) => item?.sheetName === "Priortized Feature Backlog"
  )?.data || []) as FeatureBacklogData[];

  const competitorLandscape = (result.allItems.find(
    (item) => item?.sheetName === "Competitor Landscape"
  )?.data || []) as CompetitorLandscapeData[];

  // Find top opportunity gap (highest score)
  const topUnmetNeed = unmetNeeds.length > 0 ? unmetNeeds[0] : null;
  const topFeature = featureBacklog.length > 0 ? featureBacklog[0] : null;

  return {
    customerSegmentation,
    unmetNeeds,
    featureBacklog,
    competitorLandscape,
    summary: {
      totalSegments: customerSegmentation.length,
      totalUnmetNeeds: unmetNeeds.length,
      totalFeatures: featureBacklog.length,
      totalCompetitors: competitorLandscape.length,
      topOpportunityGap:
        topUnmetNeed?.["Need Statement"] || "No data available",
      topFeature: topFeature?.["Title"] || "No data available",
    },
  };
};

export const formatAnalysisForConsole = (
  result: AnalysisOutputResponse
): void => {
  const parsed = parseAnalysisResult(result);
  const timestamp = new Date().toLocaleString();

  console.group(
    "%c🎯 Opportunity Gap Analysis Results",
    "font-size: 16px; color: #6366f1; font-weight: bold;"
  );
  console.log("%c📅 Generated at: " + timestamp, "color: #64748b");

  // Summary
  console.group("%c📊 Summary", "color: #0ea5e9; font-weight: bold");
  console.table({
    "Customer Segments": parsed.summary.totalSegments,
    "Unmet Needs": parsed.summary.totalUnmetNeeds,
    "Feature Backlog Items": parsed.summary.totalFeatures,
    "Competitors Analyzed": parsed.summary.totalCompetitors,
  });
  console.log(
    "%c🌟 Top Opportunity Gap: %c" + parsed.summary.topOpportunityGap,
    "color: #0ea5e9",
    "color: #334155; font-weight: bold"
  );
  console.log(
    "%c🚀 Top Feature Priority: %c" + parsed.summary.topFeature,
    "color: #0ea5e9",
    "color: #334155; font-weight: bold"
  );
  console.groupEnd();

  // Customer Segments
  if (parsed.customerSegmentation.length > 0) {
    console.group(
      "%c👥 Customer Segments",
      "color: #8b5cf6; font-weight: bold"
    );
    parsed.customerSegmentation.forEach((segment, index) => {
      console.group(
        `%c${index + 1}. ${segment.Name}`,
        "color: #6366f1; font-weight: bold"
      );
      console.log(
        "%cArchetype:%c " + segment["Archetype & Definition"],
        "color: #8b5cf6",
        "color: #334155"
      );
      console.log(
        "%cNeeds:%c " + segment["JTBD / Top 3 Needs"],
        "color: #8b5cf6",
        "color: #334155"
      );
      console.log(
        "%cDemographics:%c " + segment["Demographics & Firmographics"],
        "color: #8b5cf6",
        "color: #334155"
      );
      console.log(
        "%cMarket Size:%c " + segment["Market Size & Growth Rate"],
        "color: #8b5cf6",
        "color: #334155"
      );
      console.groupEnd();
    });
    console.groupEnd();
  }

  // Unmet Needs
  if (parsed.unmetNeeds.length > 0) {
    console.group("%c🎯 Top Unmet Needs", "color: #ec4899; font-weight: bold");
    parsed.unmetNeeds.slice(0, 3).forEach((need, index) => {
      console.group(
        `%c${index + 1}. ${need["Need Statement"]}`,
        "color: #ec4899; font-weight: bold"
      );
      console.log(
        "%cPriority Score:%c " + need["Priority Score / Rank"],
        "color: #ec4899",
        "color: #334155"
      );
      console.log(
        "%cOpportunity Gap Score:%c " + need["Opportunity Gap Score"],
        "color: #ec4899",
        "color: #334155"
      );
      console.log(
        "%cContext:%c " + need["Jobs-to-Be-Done Context"],
        "color: #ec4899",
        "color: #334155"
      );
      console.log(
        "%cWTP Tier:%c " + need["WTP Tier"],
        "color: #ec4899",
        "color: #334155"
      );
      console.groupEnd();
    });
    console.groupEnd();
  }

  // Feature Backlog
  if (parsed.featureBacklog.length > 0) {
    console.group("%c🚀 Feature Backlog", "color: #f59e0b; font-weight: bold");
    parsed.featureBacklog.slice(0, 3).forEach((feature, index) => {
      console.group(
        `%c${index + 1}. ${feature["Title"]}`,
        "color: #f59e0b; font-weight: bold"
      );
      console.log(
        "%cPriority:%c " + feature["Priority Score / Rank"],
        "color: #f59e0b",
        "color: #334155"
      );
      console.log(
        "%cDescription:%c " + feature["Description & User Story"],
        "color: #f59e0b",
        "color: #334155"
      );
      console.log(
        "%cPrimary Persona:%c " + feature["Primary Persona"],
        "color: #f59e0b",
        "color: #334155"
      );
      console.log(
        "%cSuccess Metrics:%c " +
          feature["Success Metric(s) - How you'll measure impact"],
        "color: #f59e0b",
        "color: #334155"
      );
      console.groupEnd();
    });
    console.groupEnd();
  }

  // Competitors
  if (parsed.competitorLandscape.length > 0) {
    console.group(
      "%c🏢 Competitor Landscape",
      "color: #10b981; font-weight: bold"
    );
    parsed.competitorLandscape.forEach((competitor, index) => {
      console.group(
        `%c${index + 1}. ${competitor["Competitor Name"]}`,
        "color: #10b981; font-weight: bold"
      );
      console.log(
        "%cURL:%c " + competitor.URL,
        "color: #10b981",
        "color: #334155"
      );
      console.log(
        "%cBusiness Model:%c " + competitor["Business Model"],
        "color: #10b981",
        "color: #334155"
      );
      console.log(
        "%cPrimary Differentiator:%c " + competitor["Primary Differentiator"],
        "color: #10b981",
        "color: #334155"
      );
      console.log(
        "%cMarket Segment:%c " + competitor["Market & Segment"],
        "color: #10b981",
        "color: #334155"
      );
      console.groupEnd();
    });
    console.groupEnd();
  }

  console.groupEnd();

  // Raw data in an expandable group
  console.group("%c📋 Raw Analysis Data", "color: #64748b; font-weight: bold");
  console.log(result);
  console.groupEnd();
};

export const getAnalysisInsights = (
  result: AnalysisOutputResponse
): string[] => {
  const parsed = parseAnalysisResult(result);
  const insights: string[] = [];

  // Top opportunity gap
  if (parsed.unmetNeeds.length > 0) {
    const topNeed = parsed.unmetNeeds[0];
    insights.push(
      `🎯 Top Opportunity: ${topNeed["Need Statement"]} (Score: ${topNeed["Opportunity Gap Score"]})`
    );
  }

  // Market size insights
  if (parsed.customerSegmentation.length > 0) {
    const largestSegment = parsed.customerSegmentation.find((s) =>
      s["Market Size & Growth Rate"].includes("Large")
    );
    if (largestSegment) {
      insights.push(
        `📈 Largest Market Segment: ${largestSegment.Name} with Large TAM/SAM`
      );
    }
  }

  // Competitor insights
  if (parsed.competitorLandscape.length > 0) {
    insights.push(
      `🏢 Analyzed ${parsed.competitorLandscape.length} competitors in the market`
    );
  }

  // Feature priority insights
  if (parsed.featureBacklog.length > 0) {
    insights.push(
      `🚀 Top Feature Priority: ${parsed.featureBacklog[0]["Title"]}`
    );
  }

  return insights;
};
