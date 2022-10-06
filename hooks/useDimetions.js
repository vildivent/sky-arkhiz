import { useState, useEffect } from "react";

export default function useDimentions() {
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

  return windowDimentions;
}
