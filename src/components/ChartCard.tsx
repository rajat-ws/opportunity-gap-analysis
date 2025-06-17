import { cn } from "@/lib/utils"
import React from "react"
import SimpleBarChart from "./SimpleBarChart"

interface ChartCardProps {
    heading: string
    description: string
    className?: string
    chartProps: React.ComponentProps<typeof SimpleBarChart>
}

const ChartCard: React.FC<ChartCardProps> = ({ 
    heading,
    description, 
    className,
    chartProps 
}) => {
    return (
        <div className={cn("bg-[#151517] rounded-xl h-[567px]", className)}>
            <div className="px-8 pt-6 pb-[25px]">
                <p className="text-white text-2xl font-bold leading-[150%] tracking-normal">
                    {heading}
                </p>
                <p className="text-white text-sm font-normal leading-[150%] tracking-normal">
                    {description}
                </p>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="mt-[30px] pl-[38px] pr-[51px]">
                <SimpleBarChart
                    className="h-[372.29px] w-full"
                    yLabel="Priority"
                    chartItems={[
                        {
                            yValue: 252,
                            xLabel: "Onboarding & Education"
                        },
                        {
                            yValue: 199,
                            xLabel: "Unified Research & Analytics"
                        },
                        {
                            yValue: 130,
                            xLabel: "Real-Time Trading Engine"
                        }
                    ]}
                    {...chartProps}
                />
            </div>
        </div>
    )
}

export default ChartCard