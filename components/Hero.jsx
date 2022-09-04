import React from "react";
import BackgroundImage from "./BackgroundImage";

const Hero = ({ children, bg, fixed }) => {
  return (
    <div className={`w-full h-[100vh] relative`}>
      <BackgroundImage src={bg} alt="background" fixed={fixed} />

      <div className={`pt-[125px] relative z-[1] bg-transparent`}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
