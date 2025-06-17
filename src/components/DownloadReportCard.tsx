import React from "react";

const DownloadReportCard: React.FC = () => {
  return (
    <div
      className="bg-[#151517] backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-between px-8 py-6"
      style={{
        width: "1148px",
        height: "108px",
        borderRadius: "12px",
        borderWidth: "1px",
      }}
    >
      <div className="flex items-center">
        <h2 className="text-white text-2xl font-semibold">
          Identified Opportunity Gaps
        </h2>
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
        <span>Download Comprehensive report</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path d="M12 15L7 10H17L12 15Z" fill="currentColor" />
          <path
            d="M12 4V14M12 14L16 10M12 14L8 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default DownloadReportCard;
