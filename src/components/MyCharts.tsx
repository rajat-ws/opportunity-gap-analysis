import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataItem {
  name: string;
  priority: number;
  description: string;
  color: string;
}

interface MyChartsProps {
  title?: string;
  subtitle?: string;
  data?: ChartDataItem[];
  showViewReport?: boolean;
  onViewReport?: () => void;
  className?: string;
}

interface BarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  [key: string]: unknown;
}

const defaultData: ChartDataItem[] = [
  {
    name: "Onboarding",
    priority: 85,
    description:
      "Clear, guided onboarding with education to invest confidently.",
    color: "#FF5757",
  },
  {
    name: "Analytics",
    priority: 68,
    description:
      "In-depth tools & analytics across assets for informed investing.",
    color: "#FF8A47",
  },
  {
    name: "Insights",
    priority: 52,
    description: "Instant insights & fast execution to seize market shifts.",
    color: "#FFD54F",
  },
];

const CustomBar = (props: BarProps) => {
  const { fill, ...rest } = props;
  return (
    <g>
      <rect {...rest} fill={fill} />
      <circle
        cx={(rest.x || 0) + (rest.width || 0) / 2}
        cy={rest.y || 0}
        r={6}
        fill="white"
        stroke="none"
      />
    </g>
  );
};

const MyCharts: React.FC<MyChartsProps> = ({
  title = "Ranked Unmet Needs",
  subtitle = "Your market share distribution based on your inputs",
  data = defaultData,
  showViewReport = true,
  onViewReport,
  className = "",
}) => {
  return (
    <div className={`bg-gray-900 text-white p-6 rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90">
          <span className="text-xs text-gray-400">Priority</span>
        </div>

        {/* Chart */}
        <div className="ml-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
              barCategoryGap="20%"
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis hide />
              <Bar
                dataKey="priority"
                shape={<CustomBar />}
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Descriptions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCharts;
