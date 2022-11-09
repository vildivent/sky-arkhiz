import { useState, useEffect } from "react";
import { useBrowser } from "./useBrowser";

const getWindowDimentions = (isBrowser: boolean) => {
  if (isBrowser) {
    const { innerWidth, innerHeight } = window;
    return {
      width: innerWidth,
      height: innerHeight,
    };
  }
};

const useDimentions = () => {
  const { isBrowser } = useBrowser();
  const defaultDimentions = { width: 0, height: 0 };
  const [windowDimentions, setWindowDimentions] = useState(defaultDimentions);

  useEffect(() => {
    if (isBrowser) setWindowDimentions(getWindowDimentions(isBrowser));
  }, [isBrowser]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimentions(getWindowDimentions(isBrowser));
    };

    if (isBrowser) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowDimentions, isBrowser]);

  return { isBrowser, windowDimentions };
};
export default useDimentions;
