import { useState, useEffect } from "react";

function getWindowDimentions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

export default function useWindowDimentions() {
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

  return windowDimentions;
}
