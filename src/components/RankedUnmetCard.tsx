import React from "react"
import ChartCard from "./ChartCard"

interface RankedUnmetCardProps {
    className?: string
}

const RankedUnmetCard: React.FC<RankedUnmetCardProps> = ({ className }) => {
    return (
        <ChartCard
            heading="Ranked Unmet Needs"
            description="Your market share distribution based on your inputs"
            chartProps={{
                className: "h-[405px] w-full",
                yLabel: "Priority",
                xLabelClassName: "text-left",
                chartItems: [
                    {
                        yValue: 252,
                        xLabel: "Clear, guided onboarding with education to invest confidently.",
                        color: "#FD5558"
                    },
                    {
                        yValue: 199,
                        xLabel: "In-depth tools & analytics across assets for informed investing.",
                        color: "#FC8556"
                    },
                    {
                        yValue: 130,
                        xLabel: "Instant insights & fast execution to seize market shifts.",
                        gradientFrom: "#FFD572",
                        gradientTo: "#FEBD38"
                    }
                ]
            }}
        />
    )
}

export default RankedUnmetCard