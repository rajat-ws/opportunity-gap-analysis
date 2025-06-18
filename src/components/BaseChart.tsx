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
  name: string; // long description
  label: string; // short label for footer and x-axis
  priority: number;
  description?: string;
  color?: string;
  persona?: {
    archetype: string;
    ageBand: string;
    role: string;
  };
  jtbd?: string;
  chartToolTipProps?: ChartToolTipProps;
}

interface PersonaProps {
  label: string;
  data: Record<string, string>;
}

interface StatementProps {
  label: string;
  data: string;
}

interface ChartToolTipProps {
  heading: string;
  personaProps: PersonaProps;
  statementProps: StatementProps;
}

interface BaseChartProps {
  title?: string;
  subtitle?: string;
  data: ChartDataItem[];
  personaProps?: PersonaProps;
  statementProps?: StatementProps;
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

const CustomBar = (props: BarProps) => {
  const { fill, ...rest } = props;
  
  // Check if fill is a custom color (not the default gradient)
  const isCustomColor = fill && fill !== "url(#barGradient)" && !fill.startsWith("url(#");
  const gradientId = isCustomColor ? `barGradient-${fill?.replace('#', '')}` : "barGradient";
  
  return (
    <g>
      <defs>
        {isCustomColor ? (
          // Create a custom gradient based on the provided color
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.8" />
            <stop offset="100%" stopColor={fill} stopOpacity="1" />
          </linearGradient>
        ) : (
          // Default gradient
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B09FFF" />
            <stop offset="100%" stopColor="#8D79F6" />
          </linearGradient>
        )}
      </defs>
      <rect 
        {...rest} 
        fill={fill?.startsWith("url(#") ? fill : `url(#${gradientId})`} 
      />
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

const CustomTooltip: React.FC<TooltipProps<number, string> & { 
  chartData: ChartDataItem[];
  personaProps?: PersonaProps;
  statementProps?: StatementProps;
}> = ({
  active,
  payload,
  personaProps,
}) => {
  const payloadData = payload?.[0]?.payload as ChartDataItem;
  if (!payloadData || !active || !payload || !payload.length) return null;

  const { chartToolTipProps } = payloadData;
  if (!chartToolTipProps) return null;

  const heading = chartToolTipProps?.heading;
  const perosonaLabel = chartToolTipProps?.personaProps?.label;
  const personaData = chartToolTipProps?.personaProps?.data;
  const statementLabel = chartToolTipProps?.statementProps?.label;
  const statementData = chartToolTipProps?.statementProps?.data;

  // Use provided props or fallback to default behavior
  const firstRowLabel = personaProps?.label || "Primary Persona";
  const firstRowData = personaProps?.data || (payloadData.persona ? {
    "Archetype": payloadData.persona.archetype,
    "Age Band": payloadData.persona.ageBand,
    "Role": payloadData.persona.role
  } : {});

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 max-w-sm w-[300px] z-50">
      <div className="mb-3">
        <div className="text-sm font-semibold border-b border-[#111111]/20 pb-2 text-gray-900 mb-2 -mx-4 px-4">
          {heading}
        </div>
      </div>

      <div>
        <div className="flex items-start space-x-3">
          <NumberCircle number={1} />
          <NumberedRow label={perosonaLabel}>
            {Object.keys(personaData).length > 0 && (
              <div className="space-y-1 text-xs text-gray-600">
                {Object.entries(firstRowData).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium">{key}:</span>{" "}
                    {value}
                  </div>
                ))}
              </div>
            )}
          </NumberedRow>
        </div>

        <div className="bg-[#111111]/20 w-full h-px mt-4 mb-3"></div>

        <div className="flex items-start space-x-3">
          <NumberCircle number={2} />
          <NumberedRow label={statementLabel}>
            <div className="text-xs text-gray-600 leading-relaxed">
              {statementData}
            </div>
          </NumberedRow>
        </div>
      </div>
    </div>
  );
};

const CustomXAxisTick = (props: any) => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <foreignObject x={-75} y={0} width={150} height={80}>
        <div className="flex items-center justify-center h-full">
          <span className="text-xs text-gray-400 font-medium text-center leading-tight break-words">
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
  data,
  personaProps,
  statementProps,
  onViewReport,
  className = "",
}) => {
  return (
    <div className={`bg-[#151517] text-white p-6 rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="-mx-6 mb-8 mt-6 bg-white/10 h-[1px]" ></div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90">
          <span className="text-xs text-gray-400">Priority</span>
        </div>

        {/* Chart */}
        <div className="ml-8 max-w-[477.65px] w-full">
          <ResponsiveContainer width="100%" height={372}>
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
                dataKey="label"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={<CustomXAxisTick />}
                height={100}
              />
              <YAxis hide />
              <Tooltip
                content={<CustomTooltip chartData={data} personaProps={personaProps} statementProps={statementProps} />}
                cursor={false}
                wrapperStyle={{ backgroundColor: "transparent" }}
                // offset={8}
                allowEscapeViewBox={{ x: false, y: true }}
              />
              <Bar
                dataKey="priority"
                shape={<CustomBar />}
                radius={[0, 0, 0, 0]}
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
