import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import PieIcon from '../../public/svg/pie.svg';
import GreenTickCircle from "../../public/svg/green-tick-circle.svg"

const activeStateStyles = "text-white bg-[linear-gradient(25deg,#9560FF00,#9560FF)] p-0.5";

const analysisChipVariants = cva(
  "inline-flex items-center gap-4 rounded-full relative overflow-hidden text-[20px] font-aeonikprotrial-light leading-[150%] tracking-[0%]",
  {
    variants: {
      state: {
        incomplete: "text-white/60 bg-white/30 p-[1px]",
        loading: activeStateStyles,
        complete: activeStateStyles,
      },
      size: {
        default: "h-16"
      },
    },
    defaultVariants: {
      state: 'incomplete',
      size: "default",
    },
  }
);

interface AnalysisChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof analysisChipVariants> {
  children: React.ReactNode;
}

const AnalysisChip = React.memo(({
  children,
  state,
  className,
  size,
  ...props
}: AnalysisChipProps) => {
  return (
    <div
      className={cn(
        analysisChipVariants({ state, size }),
        className
      )}
      {...props}
    >
      <div className="bg-black rounded-full w-full h-full inline-flex items-center gap-4 px-[23px] py-[11px]">
        {state === 'loading' && (
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div className="w-[200%] flex gap-x-8 animate-slide delay-100 -translate-x-1/2">
              <div className="w-[12.93px] h-[188.07px] bg-[#BDA2F4] opacity-50 rotate-[30deg] blur-xl"></div>
              <div className="w-[26px] h-[188.07px] bg-[#BDA2F4] opacity-50 rotate-[30deg] blur-xl"></div>
            </div>
          </div>
        )}
        
        {/* Left Icon */}
        <div className="rounded-full bg-white/10 flex items-center justify-center w-10 h-10">
          <img 
            src={PieIcon} 
            aria-hidden={true} 
            className="w-6 h-6" 
          />
        </div>

        {/* Text Content */}
        <span className="flex-1">{children}</span>

        {/* Right Tick Icon (only shown in complete state) */}
        {state === 'complete' && (
          <div className="flex items-center">
            <img 
              src={GreenTickCircle} 
              alt="green tick circle icon" 
              aria-hidden={true} 
              className="w-6 h-6 shrink-0" 
            />
          </div>
        )}
      </div>
    </div>
  );
});

AnalysisChip.displayName = 'AnalysisChip';

export default AnalysisChip;
