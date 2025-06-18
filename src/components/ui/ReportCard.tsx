import { cn } from "@/lib/utils";
import React from "react";

interface MarketSegmentItem {
  text: string;
}

interface CompetitorData {
  name: string;
  marketSegments: MarketSegmentItem[];
  primaryDifferentiators: string[];
}

interface ReportCardProps<T = CompetitorData> {
  title?: string;
  subtitle?: string;
  columns?: string[];
  data?: T[];
  renderRow?: (item: T, index: number) => React.ReactNode;
  competitors?: CompetitorData[]; // Keep for backward compatibility
  className?: string;
}

// Dummy data for demonstration
const dummyCompetitors: CompetitorData[] = [
  {
    name: "Zerodha",
    marketSegments: [
      { text: "India focus" },
      {
        text: "Targeting retail investors, especially digital-first users aged 25-45",
      },
    ],
    primaryDifferentiators: [
      "Pioneered discount broking in India",
      "Trusted by 18+ crore customers",
    ],
  },
  {
    name: "Groww",
    marketSegments: [
      { text: "India focus" },
      { text: "Retail investors and digital-first users aged 25-45" },
    ],
    primaryDifferentiators: [
      "Highly intuitive, user-friendly interface",
      "Integrated suite of investment products and margin trading options",
    ],
  },
  {
    name: "Upstox",
    marketSegments: [
      { text: "India focus" },
      { text: "Retail investors and traders with digital-first focus" },
    ],
    primaryDifferentiators: [
      "Dual platform for investors and traders",
      "High ease-of-use with a user-friendly mobile app",
    ],
  },
  {
    name: "Angel One",
    marketSegments: [
      { text: "India focus" },
      { text: "Retail and HNI investors with diverse investment needs" },
    ],
    primaryDifferentiators: [
      "Comprehensive research and advisory services",
      "Wide range of investment products and tools",
    ],
  },
  {
    name: "5paisa",
    marketSegments: [
      { text: "India focus" },
      { text: "Cost-conscious retail investors" },
    ],
    primaryDifferentiators: [
      "Ultra-low brokerage model",
      "Simple and straightforward trading platform",
    ],
  },
];

const defaultCompetitorRender = (
  competitor: CompetitorData,
  index: number,
  isLast: boolean
) => (
  <div
    key={`${competitor.name}-${index}`}
    className={`flex min-h-[80px] px-4 py-3 ${!isLast ? "border-b border-[#333]" : ""}`}
  >
    <div className="flex-1 min-w-0 text-sm text-white flex items-center">
      {competitor.name}
    </div>
    <div className="flex-1 min-w-0 px-4 border-l border-[#333] flex items-center">
      <div className="flex flex-col gap-1 w-full">
        {competitor.marketSegments.map((segment, segmentIndex) => (
          <div
            key={segmentIndex}
            className="flex items-center gap-2 text-sm text-blue-400"
          >
            <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
            {segment.text}
          </div>
        ))}
      </div>
    </div>
    <div className="flex-1 min-w-0 px-4 text-sm text-white border-l border-[#333] flex items-center">
      <div className="flex flex-col gap-1 w-full">
        {competitor.primaryDifferentiators.map((differentiator, diffIndex) => (
          <div key={diffIndex} className="leading-relaxed">
            {differentiator}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ReportCard = <T = CompetitorData,>({
  title = "Competitors Landscape",
  subtitle = "Your market share distribution based on your inputs",
  columns = ["Competitor Name", "Market Segment", "Primary Differentiator"],
  data,
  renderRow,
  competitors = dummyCompetitors,
  className,
}: ReportCardProps<T>) => {
  // Use data if provided, otherwise fall back to competitors
  const displayData = data || competitors;
  const isUsingCustomData = !!data && !!renderRow;

  return (
    <div
      className={cn(
        "w-[563px] max-h-[716px] rounded-lg border border-[#333] overflow-hidden flex flex-col shadow-lg",
        className
      )}
    >
      {/* Header Section */}
      <div className="py-[24px] px-[32px] bg-[#151517] flex flex-col gap-[4px] border-b border-[#333]">
        <h3 className="text-white text-lg font-semibold leading-tight">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Row */}
        <div className="flex border-b border-[#333] h-[64px] bg-[#5E5E5E]">
          {columns.map((column, index) => (
            <div
              key={index}
              className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium text-gray-300 flex items-center justify-center ${
                index > 0 ? "border-l border-[#333]" : ""
              }`}
            >
              {column}
            </div>
          ))}
        </div>

        {/* Data Rows Container */}
        <div className="flex flex-col flex-1 overflow-y-auto bg-[#151517] scrollbar-thin scrollbar-track-[#1a1a1a] scrollbar-thumb-[#333] hover:scrollbar-thumb-[#444]">
          {isUsingCustomData
            ? displayData.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index < displayData.length - 1
                      ? "border-b border-[#333]"
                      : ""
                  }`}
                >
                  {renderRow!(item, index)}
                </div>
              ))
            : displayData.map((competitor, index) =>
                defaultCompetitorRender(
                  competitor as CompetitorData,
                  index,
                  index === displayData.length - 1
                )
              )}
        </div>
      </div>
    </div>
  );
};
