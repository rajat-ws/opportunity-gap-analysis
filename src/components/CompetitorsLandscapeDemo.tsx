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

  // Sample data as fallback
  const sampleCompetitors = [
    {
      name: "Zerodha",
      marketSegments: [
        "India focus",
        "Targeting retail investors, especially digital-first users aged 25-45",
      ],
      primaryDifferentiator: "Pioneered discount broking in India",
    },
    {
      name: "Groww",
      marketSegments: [
        "India focus",
        "Retail investors and digital-first users aged 25-45",
      ],
      primaryDifferentiator: "Highly intuitive, user-friendly interface",
    },
    {
      name: "Upstox",
      marketSegments: [
        "India focus",
        "Retail investors and traders with digital-first focus",
      ],
      primaryDifferentiator: "Dual platform for investors and traders",
    },
    // Add more competitors to test scrolling
    {
      name: "Angel One",
      marketSegments: ["India focus", "Retail and HNI investors"],
      primaryDifferentiator: "Comprehensive research and advisory services",
    },
    {
      name: "ICICI Direct",
      marketSegments: [
        "India focus",
        "Retail investors with banking relationship",
      ],
      primaryDifferentiator: "Integrated banking and trading platform",
    },
    {
      name: "Kotak Securities",
      marketSegments: ["India focus", "Premium investors and traders"],
      primaryDifferentiator: "Premium research and institutional-grade tools",
    },
  ];

  const sampleCustomerSegments: CustomerSegmentData[] = [
    {
      name: "Tech-Savvy Millennials",
      archetype:
        "Young digital-first investors seeking a simple, guided entry into investing",
      definition:
        "Young digital-first investors seeking a simple, guided entry into investing",
      jtbd: [
        "When I start investing, I want a clear, intuitive platform that helps me learn easily",
        "Need educational content",
        "Need transparent pricing",
      ],
    },
    {
      name: "Experienced Self-Directed Investors",
      archetype:
        "Seasoned investors seeking advanced tools to manage portfolios efficiently",
      definition:
        "Seasoned investors seeking advanced tools to manage portfolios efficiently",
      jtbd: [
        "When managing my portfolio, I want advanced trading tools that help me optimize my strategies",
        "Need robust analytics",
        "Need multi-asset investment options",
      ],
    },
    {
      name: "Active Traders",
      archetype: "Frequent traders focused on short-term gains",
      definition: "Frequent traders focused on short-term gains",
      jtbd: ["Due platform for fast execution"],
    },
  ];

  // Transform API data to component format
  const transformCompetitorsData = () => {
    if (
      !parsedData?.competitorLandscape ||
      parsedData.competitorLandscape.length === 0
    ) {
      return sampleCompetitors;
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
      return sampleCustomerSegments;
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
      // Return sample data
      return [
        {
          name: "Seamless mobile experience for investing on-the-go.",
          label: "Invest",
          priority: 92,
          description: "Seamless mobile experience for investing on-the-go.",
          color: "#FD5558",
          persona: {
            archetype: "Mobile-First Users",
            ageBand: "18-35",
            role: "Casual Investor",
          },
          jtbd: "A fully optimized mobile platform that allows me to invest and monitor my portfolio anywhere, anytime.",
          chartToolTipProps: {
            heading: "High Priority",
            personaProps: {
              label: "Persona & Segment Details",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Sophistication: "Low",
                Goals: "Learn investing basics quickly with minimal risk",
              },
            },
            statementProps: {
              label: "Need Statement",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
        {
          name: "Social features to learn from and connect with other investors.",
          label: "In-depth",
          priority: 76,
          description:
            "Social features to learn from and connect with other investors.",
          color: "#FC8556",
          persona: {
            archetype: "Social Learners",
            ageBand: "22-40",
            role: "New Investor",
          },
          jtbd: "Access to a community where I can learn from experienced investors and share insights with peers.",
          chartToolTipProps: {
            heading: "Medium Priority",
            personaProps: {
              label: "Persona & Segment Details",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Sophistication: "Low",
                Goals: "Learn investing basics quickly with minimal risk",
              },
            },
            statementProps: {
              label: "Need Statement",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
        {
          name: "Automated portfolio management with smart rebalancing.",
          label: "Insight",
          priority: 64,
          description: "Automated portfolio management with smart rebalancing.",
          color: "#FFD572",
          persona: {
            archetype: "Busy Professionals",
            ageBand: "30-50",
            role: "Passive Investor",
          },
          jtbd: "Hands-off investment management that automatically optimizes my portfolio without constant attention.",
          chartToolTipProps: {
            heading: "Low Priority",
            personaProps: {
              label: "Persona & Segment Details",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Sophistication: "Low",
                Goals: "Learn investing basics quickly with minimal risk",
              },
            },
            statementProps: {
              label: "Need Statement",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
      ];
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
      // Return sample data
      return [
        {
          name: "Clear, guided onboarding with education to invest confidently.",
          label: "Onboarding",
          priority: 85,
          description:
            "Clear, guided onboarding with education to invest confidently.",
          persona: {
            archetype: "Tech-Savvy Beginners",
            ageBand: "25-34",
            role: "Retail Investor",
          },
          jtbd: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
          chartToolTipProps: {
            heading: "Priority Rank: 1",
            personaProps: {
              label: "Primary Persona",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Role: "Retail Investor",
              },
            },
            statementProps: {
              label: "JTBD / Unmet Need Ref",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
        {
          name: "In-depth tools & analytics across assets for informed investing.",
          label: "Analytics",
          priority: 68,
          description:
            "In-depth tools & analytics across assets for informed investing.",
          persona: {
            archetype: "Data-Driven Investors",
            ageBand: "35-44",
            role: "Active Trader",
          },
          jtbd: "Comprehensive analytics and research tools to make informed investment decisions across multiple asset classes.",
          chartToolTipProps: {
            heading: "Priority Rank: 2",
            personaProps: {
              label: "Primary Persona",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Role: "Retail Investor",
              },
            },
            statementProps: {
              label: "JTBD / Unmet Need Ref",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
        {
          name: "Instant insights & fast execution to seize market shifts.",
          label: "Insights",
          priority: 52,
          description:
            "Instant insights & fast execution to seize market shifts.",
          persona: {
            archetype: "Quick Decision Makers",
            ageBand: "25-44",
            role: "Day Trader",
          },
          jtbd: "Real-time market insights and rapid execution capabilities to capitalize on market opportunities.",
          chartToolTipProps: {
            heading: "Priority Rank: 3",
            personaProps: {
              label: "Primary Persona",
              data: {
                Archetype: "Tech-Savvy Beginners",
                "Age Band": "25-34",
                Role: "Retail Investor",
              },
            },
            statementProps: {
              label: "JTBD / Unmet Need Ref",
              data: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
            },
          },
        },
      ];
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
    <div className="min-h-screen analysis-bg flex flex-col items-center pb-10">
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
