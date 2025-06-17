import React from "react";
import { ReportCard } from "./ui/ReportCard";
import LocationIcon from "/images/location.svg";
import TargetIcon from "/images/target.svg";
import { cn } from "@/lib/utils";

export interface CompetitorData {
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
      <div className="flex-1 flex p-4 border-r border-[#333]">
        {competitor.icon && (
          <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center mr-3 flex-shrink-0">
            <img
              src={competitor.icon}
              alt={`${competitor.name} logo`}
              className="w-6 h-6 rounded-full"
            />
          </div>
        )}
        <span className="text-white pl-[10px] font-medium">
          {competitor.name}
        </span>
      </div>

      {/* Market Segments */}
      <div className="flex-1 p-4 border-r border-[#333] flex flex-col gap-[35px]">
        {competitor.marketSegments.map((segment, segmentIndex) => {
          const isLocationSegment = segment
            .toLowerCase()
            .includes("india focus");

          return (
            <div key={segmentIndex} className="flex items-start">
              <img
                src={isLocationSegment ? LocationIcon : TargetIcon}
                alt={isLocationSegment ? "Location" : "Target"}
                className="flex-shrink-0 mt-0.5 mr-2 w-4 h-4"
              />
              <span className="text-gray-300 text-sm leading-relaxed">
                {segment}
              </span>
            </div>
          );
        })}
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
      className={cn(className)}
    />
  );
};

export default CompetitorsCard;
