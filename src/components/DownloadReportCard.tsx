import React from "react";
import { Button } from "./ui/button";
import Download from "../../public/svg/download.svg";

interface DownloadReportCardProps {}

const DownloadReportCard: React.FC<DownloadReportCardProps> = () => {
  return (
    <div className="bg-[#151517] backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-between px-8 py-6 xl:w-[1148px] h-[108px]">
      <div className="flex items-center">
        <h2 className="text-white text-lg xl:text-2xl font-semibold">
          Identified Opportunity Gaps
        </h2>
      </div>

      <Button
        variant="secondary"
        size="secondary"
        className="w-[356px] max-xl:text-sm"
        icon={<img src={Download} className="w-6 h-6" alt="Download" />}
      >
        Download Comprehensive report
      </Button>
    </div>
  );
};

export default DownloadReportCard;
