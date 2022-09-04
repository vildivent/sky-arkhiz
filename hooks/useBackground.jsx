import { useState, useEffect } from "react";
import { bgStars4k, mobileBg } from "../public/assets";

export default function useBackground(altBg) {
  let bg = altBg;

  function getWindowDimentions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
  }

  const [windowDimentions, setWindowDimentions] = useState(
    getWindowDimentions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimentions(getWindowDimentions());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (typeof window !== "undefined") {
    const { height, width } = windowDimentions;
    bg = width > 768 ? altBg : mobileBg;
  }
  const fixed = bg === altBg ? false : true;
  return [bg, fixed];
}
