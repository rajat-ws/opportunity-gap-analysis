import { cn } from "@/lib/utils"
import React from "react"

interface BarProps {
    className?: string
    style?: React.CSSProperties
}

const Bar: React.FC<BarProps> = ({ className, style }) => {
    return (
        <div 
            className={cn("bg-gradient-to-r from-[#B09FFF] to-[#8D79F6] border-[0.32px] border-white relative", className)} 
            style={style}
        >
            <div className="bg-white rounded-full w-4 h-4 absolute left-2/4 -translate-x-2/4 -translate-y-2/4" />
        </div>
    )
}

interface XValueProps {
    children: React.ReactNode
    className?: string
}

const XValue: React.FC<XValueProps> = ({ children, className }) => {
    return (
        <p className={cn("h-fit text-center text-white text-sm", className)}>
            {children}
        </p>
    )
}

interface ChartItemProp {
    yValue: number
    xLabel: string
    barClassName?: string
    color?: string
    gradientFrom?: string | number
    gradientTo?: string | number
    gradientDirection?: "to top" | "to bottom" | "to left" | "to right"
}

interface SimpleBarChartProps {
    yLabel: string
    chartItems: ChartItemProp[]
    xLabelClassName?: string
    className?: string
    barGap?: number | string
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
    yLabel, 
    xLabelClassName, 
    chartItems, 
    className, 
    barGap 
}) => {
    return (
        <div 
            className={cn("grid grid-cols-[26.21px_1fr_1fr_1fr] grid-rows-[1fr_auto] gap-2", className)} 
            style={{ columnGap: barGap }}
        >
            <div className="h-full border-r-[0.32px] border-[#C6C6C5] flex items-center justify-end">
                <p className="text-white text-xs font-normal leading-[100%] tracking-normal -rotate-90 w-fit h-fit">
                    {yLabel}
                </p>
            </div>
            {chartItems.map((item) => {
                const isColorProvided = !!item.color
                const isGradientProvided = !!item.gradientFrom && !!item.gradientTo
                const background = isColorProvided 
                    ? item.color 
                    : isGradientProvided 
                        ? `linear-gradient(${item.gradientDirection || "to right"}, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)` 
                        : undefined

                return (
                    <div key={item.yValue} className="flex items-end">
                        <Bar 
                            className={cn("max-w-[140.06px] w-full", item.barClassName)}
                            style={{
                                height: item.yValue,
                                background
                            }}
                        />
                    </div>
                )
            })}
            <div className="w-[26px] h-full" />
            {chartItems.map(item => (
                <XValue key={item.xLabel} className={cn(xLabelClassName)}>
                    {item.xLabel}
                </XValue>
            ))}
        </div>
    )
}

export default SimpleBarChart