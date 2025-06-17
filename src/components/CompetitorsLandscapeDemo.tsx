import React from "react";
import CompetitorsCard from "./CompetitorsCard";
import CustomerSegmentsCard, {
  CustomerSegmentData,
} from "./CustomerSegmentsCard";
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

  return (
    <div className="min-h-screen analysis-bg flex flex-col items-center">
      <HeroBanner />

      {/* border */}
      <div className="w-[660px] lg:w-[1152px] h-[1px] opacity-20 border-gradient" />

      <div className="w-full max-w-7xl mx-auto md:px-6 lg:mx-0 flex justify-center items-start mt-[60.27px] gap-[25px]">
        <CompetitorsCard competitors={sampleCompetitors} />
        <CustomerSegmentsCard segments={sampleCustomerSegments} />
      </div>
    </div>
  );
};

export default CompetitorsLandscapeDemo;
