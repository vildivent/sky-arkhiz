import React from "react";
import BackgroundImage from "./BackgroundImage";

const Hero = ({ children, bg, height, opacity }) => {
  return (
    <div className={`w-full h-[${height}] relative`}>
      <div className={` opacity-${opacity}`}>
        <BackgroundImage src={bg} alt="background" />
      </div>

      <div className={`pt-[125px] relative z-[1] bg-transparent`}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
