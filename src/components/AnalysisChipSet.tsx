import { cn } from "@/lib/utils";
import React, { useCallback, useMemo } from "react";
import AnalysisChip from "./AnalysisChip";

interface AnalysisChipSetProps {
  items: string[];
  currentIndex?: number;
  completedSteps?: boolean[];
  className?: string;
  chipClassName?: string;
}

const AnalysisChipSet: React.FC<AnalysisChipSetProps> = ({
  items,
  currentIndex = -1,
  completedSteps = [],
  className,
  chipClassName,
}) => {
  const getChipState = useCallback(
    (index: number): "complete" | "loading" | "incomplete" => {
      if (completedSteps.length > 0 && index < completedSteps.length) {
        if (completedSteps[index]) return "complete";
        if (index === currentIndex) return "loading";
        return "incomplete";
      }

      if (index < currentIndex) return "complete";
      if (index === currentIndex) return "loading";
      return "incomplete";
    },
    [currentIndex, completedSteps]
  );

  const memoizedChips = useMemo(() => {
    return items.map((item, index) => {
      const state = getChipState(index);
      return (
        <AnalysisChip
          key={`analysis-${item}-${index}`}
          state={state}
          className={cn(chipClassName)}
        >
          {item}
        </AnalysisChip>
      );
    });
  }, [items, getChipState, chipClassName]);

  return (
    <div
      className={cn("flex flex-col gap-y-8 items-stretch relative", className)}
    >
      <div className="bg-[#D9D9D9]/20 w-0.5 h-[90%] translate-x-[45px] top-2/4 -translate-y-2/4 absolute"></div>
      {memoizedChips}
    </div>
  );
};

export default AnalysisChipSet;
