import { parseAnalysisResult } from "@/lib/analysis-utils";
import { AnalysisOutputResponse } from "@/lib/api";
import React from "react";
import BaseChart from "./BaseChart";
import CompetitorsCard from "./CompetitorsCard";
import CustomerSegmentsCard, {
  CustomerSegmentData,
} from "./CustomerSegmentsCard";
import DownloadReportCard from "./DownloadReportCard";
import HeroBanner from "./HeroBanner";

type ChartDateItemProp = React.ComponentProps<typeof BaseChart>["data"][0];

interface CompetitorsLandscapeDemoProps {
  analysisData?: AnalysisOutputResponse | null;
}

const CompetitorsLandscapeDemo: React.FC<CompetitorsLandscapeDemoProps> = ({
  analysisData,
}) => {
  // Parse the analysis data if available
  const parsedData = analysisData ? parseAnalysisResult(analysisData) : null;

  // Transform API data to component format
  const transformCompetitorsData = () => {
    if (
      !parsedData?.competitorLandscape ||
      parsedData.competitorLandscape.length === 0
    ) {
      return [];
    }

    return parsedData.competitorLandscape.map((competitor) => ({
      name: competitor["Competitor Name"] || "Unknown",
      marketSegments: [
        competitor["Market & Segment"] || "N/A",
        competitor["Business Model"] || "N/A",
      ],
      primaryDifferentiator: competitor["Primary Differentiator"] || "N/A",
    }));
  };

  const transformCustomerSegmentsData = (): CustomerSegmentData[] => {
    if (
      !parsedData?.customerSegmentation ||
      parsedData.customerSegmentation.length === 0
    ) {
      return [];
    }

    return parsedData.customerSegmentation.map((segment) => ({
      name: segment.Name || "Unknown Segment",
      archetype: segment["Archetype & Definition"] || "N/A",
      definition: segment["Archetype & Definition"] || "N/A",
      jtbd: segment["JTBD / Top 3 Needs"]
        ? segment["JTBD / Top 3 Needs"].split(",").map((need) => need.trim())
        : ["N/A"],
    }));
  };

  const transformUnmetNeedsData = (): ChartDateItemProp[] => {
    if (!parsedData?.unmetNeeds || parsedData.unmetNeeds.length === 0) {
      return [];
    }

    return parsedData.unmetNeeds.slice(0, 3).map((need, index) => ({
      name: need["Need Statement"] || "Unknown Need",
      label: need["Priority Score / Rank"] || "N/A",
      priority: parseInt(need["Opportunity Gap Score"] || "0"),
      description: need["Need Statement"] || "N/A",
      color: index === 0 ? "#FD5558" : index === 1 ? "#FC8556" : "#FFD572",
      persona: {
        archetype: need["Persona & Segment Details"] || "N/A",
        ageBand: "N/A",
        role: "N/A",
      },
      jtbd: need["Jobs-to-Be-Done Context"] || "N/A",
      chartToolTipProps: {
        heading: `Priority: ${need["Priority Score / Rank"] || "N/A"}`,
        personaProps: {
          label: "Persona & Segment Details",
          data: {
            Archetype: need["Persona & Segment Details"] || "N/A",
            "Priority Score": need["Priority Score / Rank"] || "N/A",
            "Opportunity Gap Score": need["Opportunity Gap Score"] || "N/A",
            "WTP Tier": need["WTP Tier"] || "N/A",
          },
        },
        statementProps: {
          label: "Need Statement",
          data: need["Need Statement"] || "N/A",
        },
      },
    }));
  };

  const transformFeatureBacklogData = (): ChartDateItemProp[] => {
    if (!parsedData?.featureBacklog || parsedData.featureBacklog.length === 0) {
      return [];
    }

    return parsedData.featureBacklog.slice(0, 3).map((feature, index) => ({
      name: feature.Title || "Unknown Feature",
      label: feature["Priority Score / Rank"] || "N/A",
      priority: parseInt(feature["Priority Score / Rank"] || "0"),
      description: feature["Description & User Story"] || "N/A",
      persona: {
        archetype: feature["Primary Persona"] || "N/A",
        ageBand: "N/A",
        role: "N/A",
      },
      jtbd: feature["JTBD / Unmet Need Ref"] || "N/A",
      chartToolTipProps: {
        heading: `Priority Rank: ${feature["Priority Score / Rank"] || "N/A"}`,
        personaProps: {
          label: "Primary Persona",
          data: {
            Archetype: feature["Primary Persona"] || "N/A",
            "Priority Score": feature["Priority Score / Rank"] || "N/A",
            "Success Metric":
              feature["Success Metric(s) - How you'll measure impact"] || "N/A",
          },
        },
        statementProps: {
          label: "JTBD / Unmet Need Ref",
          data: feature["JTBD / Unmet Need Ref"] || "N/A",
        },
      },
    }));
  };

  // Use transformed data
  const competitorsData = transformCompetitorsData();
  const customerSegmentsData = transformCustomerSegmentsData();
  const rankedUnmetNeedsData = transformUnmetNeedsData();
  const prioritizedFeatureData = transformFeatureBacklogData();

  return (
    <div className="min-h-screen analysis-bg flex flex-col items-center justify-center px-6 py-10">
      <HeroBanner />

      {/* border */}
      <div className="w-full xl:w-[1152px] h-[1px] opacity-20 border-gradient" />

      <div className="w-[405px] md:w-[563px] max-w-[1152px] xl:w-full space-y-[25px] mt-[60.27px] [@media(max-width:380px)]:px-6">
        {/* Add OpportunityGapsCard */}
        <div>
          <DownloadReportCard />
        </div>

        <div className="w-full max-w-[1152px] mx-auto px-4 md:px-6 lg:mx-0 grid md:grid-cols-[563px] xl:grid-cols-[563px_563px] gap-[25px] justify-center">
          <CompetitorsCard competitors={competitorsData} className="w-full" />
          <CustomerSegmentsCard
            segments={customerSegmentsData}
            className="w-full"
          />
          <BaseChart
            title="Ranked Unmet Needs"
            subtitle="Your market share distribution based on your inputs"
            data={rankedUnmetNeedsData}
          />
          <BaseChart
            data={prioritizedFeatureData}
            title="Prioritized Feature Backlog"
            subtitle="Development roadmap based on market analysis"
          />
        </div>
      </div>
    </div>
  );
};

export default CompetitorsLandscapeDemo;
