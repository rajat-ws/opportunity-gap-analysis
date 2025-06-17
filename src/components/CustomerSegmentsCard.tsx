import React from "react";
import { ReportCard } from "./ui/ReportCard";
import ArchIcon from "/images/arch-icon.svg";

export interface CustomerSegmentData {
  name: string;
  archetype: string;
  definition: string;
  jtbd: string[];
  icon?: string;
}

interface CustomerSegmentsCardProps {
  segments: CustomerSegmentData[];
  className?: string;
}

const CustomerSegmentsCard: React.FC<CustomerSegmentsCardProps> = ({
  segments,
  className = "",
}) => {
  const renderSegmentRow = (segment: CustomerSegmentData, index: number) => (
    <div className="flex items-stretch min-h-[120px]">
      {/* Name */}
      <div className="flex-1 flex items-start justify-center p-4 border-r border-[#333]">
        {segment.icon && (
          <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center mr-3 flex-shrink-0">
            <img
              src={segment.icon}
              alt={`${segment.name} icon`}
              className="w-6 h-6 rounded-full"
            />
          </div>
        )}
        <span className="text-white pl-[10px] font-medium">{segment.name}</span>
      </div>

      {/* Archetype & Definition */}
      <div className="flex-1 space-y-2 p-4 border-r border-[#333] flex flex-col justify-start">
        <div className="flex items-start">
          <img
            src={ArchIcon}
            alt="Archetype"
            className="flex-shrink-0 mt-1 mr-2 w-4 h-4"
          />
          <div>
            <div className="text-gray-300 text-sm font-medium">
              {segment.archetype}
            </div>
          </div>
        </div>
      </div>

      {/* JTBD / Top 3 Needs */}
      <div className="flex-1 space-y-2 p-4 flex flex-col justify-start">
        {segment?.jtbd?.map((need, needIndex) => (
          <div
            key={needIndex}
            className="text-gray-300 text-sm leading-relaxed"
          >
            {need}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ReportCard
      title="New Customer Segments"
      subtitle="Your market share distribution based on your inputs"
      columns={["Name", "Archetype & Definition", "JTBD / Top 3 Needs"]}
      data={segments}
      renderRow={renderSegmentRow}
    />
  );
};

export default CustomerSegmentsCard;
