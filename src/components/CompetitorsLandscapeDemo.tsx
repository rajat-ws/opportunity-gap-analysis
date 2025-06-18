import React from "react";
import BaseChart from "./BaseChart";
import CompetitorsCard from "./CompetitorsCard";
import CustomerSegmentsCard, {
  CustomerSegmentData,
} from "./CustomerSegmentsCard";
import DownloadReportCard from "./DownloadReportCard";
import HeroBanner from "./HeroBanner";

const CompetitorsLandscapeDemo: React.FC = () => {
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

  // Data for the prioritized feature chart
  const prioritizedFeatureData = [
    {
      name: "Onboarding",
      priority: 85,
      description:
        "Clear, guided onboarding with education to invest confidently.",
      color: "#6366F1",
      persona: {
        archetype: "Tech-Savvy Beginners",
        ageBand: "25-34",
        role: "Retail Investor",
      },
      jtbd: "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
    },
    {
      name: "Analytics",
      priority: 68,
      description:
        "In-depth tools & analytics across assets for informed investing.",
      color: "#06B6D4",
      persona: {
        archetype: "Data-Driven Investors",
        ageBand: "35-44",
        role: "Active Trader",
      },
      jtbd: "Comprehensive analytics and research tools to make informed investment decisions across multiple asset classes.",
    },
    {
      name: "Insights",
      priority: 52,
      description: "Instant insights & fast execution to seize market shifts.",
      color: "#10B981",
      persona: {
        archetype: "Quick Decision Makers",
        ageBand: "25-44",
        role: "Day Trader",
      },
      jtbd: "Real-time market insights and rapid execution capabilities to capitalize on market opportunities.",
    },
  ];

  return (
    <div className="min-h-screen analysis-bg flex flex-col items-center pb-10">
      <HeroBanner />

      {/* border */}
      <div className="w-full xl:w-[1152px] h-[1px] opacity-20 border-gradient" />

      {/* Add OpportunityGapsCard */}
      <div className="mt-[60.27px] mb-[25px]">
        <DownloadReportCard />
      </div>

      <div className="w-full max-w-[1152px] mx-auto px-4 md:px-6 lg:mx-0 grid grid-cols-[405px] md:grid-cols-[563px] xl:grid-cols-[563px_563px] gap-[25px] justify-center">
        <CompetitorsCard competitors={sampleCompetitors} className="w-full" />
        <CustomerSegmentsCard
          segments={sampleCustomerSegments}
          className="w-full"
        />
        <BaseChart
          title="Ranked Unmet Needs"
          subtitle="Your market share distribution based on your inputs"
          onViewReport={() => console.log("Ranked needs report clicked")}
        />
        <BaseChart
          data={prioritizedFeatureData}
          title="Prioritized Feature Backlog"
          subtitle="Development roadmap based on market analysis"
          onViewReport={() => console.log("Feature backlog report clicked")}
        />
      </div>
    </div>
  );
};

export default CompetitorsLandscapeDemo;
