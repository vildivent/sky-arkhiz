import { useState, useEffect } from "react";

export default function useBackground(mainBg, mobileBg) {
  let bg = mainBg;
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
    bg = width > 640 ? mainBg : mobileBg;
  }
  return bg;
}
