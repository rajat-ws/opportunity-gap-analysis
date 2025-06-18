import React from "react";

export interface ReportCardData {
  [key: string]: unknown;
}

interface ReportCardProps {
  title: string;
  subtitle: string;
  columns: string[];
  data: ReportCardData[];
  className?: string;
  renderRow: (item: ReportCardData, index: number) => React.ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  subtitle,
  columns,
  data,
  className = "",
  renderRow,
}) => {
  return (
    <div
      className={`bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden w-[563px] h-[716px] ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#333]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      {/* Table Container with Scroll */}
      <div className="h-[calc(100%-120px)] overflow-y-auto">
        {/* Table Header */}
        <div className="flex border-b border-[#444]">
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex-1 h-[64px] flex items-center p-[14px] text-gray-400 text-sm font-medium border-r border-[#444] last:border-r-0"
            >
              {column}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        <div>
          {data.map((item, index) => (
            <div key={index} className="border-b border-[#444] last:border-b-0">
              {renderRow(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
