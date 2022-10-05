import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const CamMenuSwitchButton = ({
  children,
  liveTV,
  onClick,
  mode,
  menuIsActive,
}) => {
  return (
    <button
      className={`sm:w-48 w-1/2 h-16 flex justify-center items-center gap-1 ${
        liveTV === mode ? "text-white bg-[#111111] bg-opacity-70" : ""
      } ${
        mode ? "rounded-r-md" : "rounded-l-md"
      } hover:bg-[#181818] hover:bg-opacity-70 hover:text-white`}
      onClick={onClick}
    >
      {children}
      {liveTV === mode && (
        <span
          className={`font-bold text-xl md:hidden transition-all duration-300 ${
            menuIsActive ? "rotate-90" : ""
          }`}
        >
          <IoIosArrowForward />
        </span>
      )}
    </button>
  );
};

export default CamMenuSwitchButton;
