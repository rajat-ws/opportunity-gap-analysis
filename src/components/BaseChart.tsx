import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface ChartDataItem {
  name: string;
  priority: number;
  description?: string;
  color: string;
  persona?: {
    archetype: string;
    ageBand: string;
    role: string;
  };
  jtbd?: string;
}

interface BaseChartProps {
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
    name: "Clear, guided onboarding with education to invest confidently.",
    priority: 85,
    color: "#FF5757",
    persona: {
      archetype: "Tech-Savvy Beginners",
      ageBand: "25-34",
      role: "Retail Investor",
    },
    jtbd:
      "An integrated, step-by-step onboarding experience with contextual, in-app education and transparent pricing.",
  },
  {
    name: "In-depth tools & analytics across assets for informed investing.",
    priority: 68,
    color: "#FF8A47",
    persona: {
      archetype: "Data-Driven Investors",
      ageBand: "35-44",
      role: "Active Trader",
    },
    jtbd:
      "Comprehensive analytics and research tools to make informed investment decisions across multiple asset classes.",
  },
  {
    name: "Instant insights & fast execution to seize market shifts.",
    priority: 52,
    color: "#FFD54F",
    persona: {
      archetype: "Quick Decision Makers",
      ageBand: "25-44",
      role: "Day Trader",
    },
    jtbd:
      "Real-time market insights and rapid execution capabilities to capitalize on market opportunities.",
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

const NumberCircle = ({ number }: { number: number }) => {
  return (
    <div className="flex-shrink-0 w-6 h-6 bg-[#9D8BF6]/20 rounded-full flex items-center justify-center">
      <span className="text-[#121417] text-xs font-bold">{number}</span>
    </div>
  );
};

interface NumberedRowProps {
  children: React.ReactNode;
  label: string;
}

const NumberedRow: React.FC<NumberedRowProps> = ({ children, label }) => {
  return (
    <div className="flex-1">
      <div className="font-semibold text-gray-900 text-sm mb-1">{label}</div>
      {children}
    </div>
  );
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartDataItem;
    const priorityRank =
      defaultData.findIndex((item) => item.name === data.name) + 1;

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-w-sm w-[300px]">
        <div className="mb-3">
          <div className="text-sm font-semibold border-b border-[#111111]/20 pb-2 text-gray-900 mb-2 -mx-4 px-4">
            Priority Rank: {priorityRank}
          </div>
        </div>

        <div>
          <div className="flex items-start space-x-3">
            <NumberCircle number={1} />
            <NumberedRow label="Primary Persona">
              {data.persona && (
                <div className="space-y-1 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Archetype:</span>{" "}
                    {data.persona.archetype}
                  </div>
                  <div>
                    <span className="font-medium">Age Band:</span>{" "}
                    {data.persona.ageBand}
                  </div>
                  <div>
                    <span className="font-medium">Role:</span>{" "}
                    {data.persona.role}
                  </div>
                </div>
              )}
            </NumberedRow>
          </div>

          <div className="bg-[#111111]/20 w-full h-px mt-4 mb-3" ></div>

          <div className="flex items-start space-x-3">
            <NumberCircle number={2} />
            <NumberedRow label="JTBD / Unmet Need Ref">
              <div className="text-xs text-gray-600 leading-relaxed">
                {data.jtbd || data.description}
              </div>
            </NumberedRow>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const CustomXAxisTick = (props: any) => {
  console.log({props});
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <foreignObject x={-50} y={0} width={100} height={40}>
        <div className="flex items-center justify-center h-full">
          <span className="text-xs text-gray-400 font-medium text-center leading-tight">
            {props.payload?.value}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const BaseChart: React.FC<BaseChartProps> = ({
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
        <div className="ml-8 max-w-[477.65px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
              barCategoryGap={4}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
                height={60}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                wrapperStyle={{ backgroundColor: "transparent" }}
              />
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
      </div>
    </div>
  );
};

export default BaseChart;
