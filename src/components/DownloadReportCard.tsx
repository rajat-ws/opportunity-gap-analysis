import React from "react";
import { Button } from "./ui/button";
import Download from "../../public/svg/download.svg";
import { cn } from "@/lib/utils";
interface DownloadReportCardProps {
  className?: string;
}

const DownloadReportCard: React.FC<DownloadReportCardProps> = ({className}) => {
  return (
    <div className={cn("@container bg-[#151517] backdrop-blur-sm border border-white/20 rounded-xl flex max-xl:flex-col max-xl:gap-y-4 items-center justify-between px-8 py-6 w-full xl:w-[1148px] xl:h-[108px]", className)}>
      <div className="flex items-center">
        <h2 className="text-white text-lg xl:text-2xl font-semibold">
          Identified Opportunity Gaps
        </h2>
      </div>

      <Button
        variant="secondary"
        size="secondary"
        className="w-[200px] sm:text-xs sm:w-[356px] max-xl:text-sm text-[clamp(0.75rem,3.5cqw,1rem)] min-w-[min(356px,80cqw)]"
        icon={<img src={Download} className="w-6 h-6" alt="Download" />}
      >
        Download Comprehensive report
      </Button>
    </div>
  );
};

export default DownloadReportCard;
