import { memo } from "react";

const HeroBanner = memo(() => {
  return (
     <header className="w-full pb-[60.27px] px-4">
            <div className="space-y-[10px] text-center">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-[-1%] font-zangezi08-trial">
                Find Your <span className="text-purple-400">Market Opportunity</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-aeonikprotrial-light">
              Analyze competitors, uncover customer problems, and build features that matter
              </p>
          </div>
    </header>
  );
});

export default HeroBanner;
