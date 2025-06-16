import React from "react";
import AnalysisChip from "./AnalysisChip";
import { cn } from "@/lib/utils";

interface AnalysisChipSetProps {
  items: string[];
  currentIndex?: number;
  className?: string;
}

const AnalysisChipSet: React.FC<AnalysisChipSetProps> = ({
  items,
  currentIndex = -1,
  className,
}) => {
  const getChipState = (index: number): "complete" | "loading" | "incomplete" => {
    if (index < currentIndex) return "complete";
    if (index === currentIndex) return "loading";
    return "incomplete";
  };

  return (
    <div className={cn("flex flex-col gap-y-8 items-stretch relative", className)}>
      <div className="bg-[#D9D9D9]/20 w-0.5 h-[90%] translate-x-[45px] top-2/4 -translate-y-2/4 absolute"></div>

      {items.map((item, index) => (
        <AnalysisChip key={index} state={getChipState(index)}>
          {item}
        </AnalysisChip>
      ))}
    </div>
  );
};

export default AnalysisChipSet;
