import React from "react";
import ReportCard, { ReportCardData } from "./ReportCard";

export interface CompetitorData extends ReportCardData {
  name: string;
  marketSegments: string[];
  primaryDifferentiator: string;
  icon?: string;
}

interface CompetitorsCardProps {
  competitors: CompetitorData[];
  className?: string;
}

const CompetitorsCard: React.FC<CompetitorsCardProps> = ({
  competitors,
  className = "",
}) => {
  const renderCompetitorRow = (competitor: CompetitorData, index: number) => (
    <div className="flex items-stretch min-h-[80px]">
      {/* Competitor Name */}
      <div className="flex-1 flex items-center p-4 border-r border-[#444]">
        {competitor.icon && (
          <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center mr-3 flex-shrink-0">
            <img
              src={competitor.icon}
              alt={`${competitor.name} logo`}
              className="w-6 h-6 rounded-full"
            />
          </div>
        )}
        <span className="text-white font-medium">{competitor.name}</span>
      </div>

      {/* Market Segments */}
      <div className="flex-1 p-4 border-r border-[#444] flex flex-col gap-[35px]">
        {competitor.marketSegments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="flex items-start">
            <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-gray-300 text-sm leading-relaxed">
              {segment}
            </span>
          </div>
        ))}
      </div>

      {/* Primary Differentiator */}
      <div className="flex-1 text-gray-300 text-sm leading-relaxed p-4 flex items-start">
        {competitor.primaryDifferentiator}
      </div>
    </div>
  );

  return (
    <ReportCard
      title="Competitors Landscape"
      subtitle="Your market share distribution based on your inputs"
      columns={["Competitor Name", "Market Segment", "Primary Differentiator"]}
      data={competitors}
      renderRow={renderCompetitorRow}
      className={className}
    />
  );
};

export default CompetitorsCard;
