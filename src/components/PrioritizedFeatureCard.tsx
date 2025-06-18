import React from "react"
import ChartCard from "./ChartCard"

interface PrioritizedFeatureCardProps {
    className?: string
}

const PrioritizedFeatureCard: React.FC<PrioritizedFeatureCardProps> = ({ className }) => {
    return (
        <ChartCard 
            className={className}
            heading="Prioritized Feature Backlog"
            description="Your market share distribution based on your inputs"
            chartProps={{
                className: "h-[372.29px] w-full",
                yLabel: "Priority",
                chartItems: [
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
                ]
            }}
        />
    )
}

export default PrioritizedFeatureCard