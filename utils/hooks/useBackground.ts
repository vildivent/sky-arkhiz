import useDimentions from "./useDimetions";
import type { StaticImageData } from "next/image";

const useBackground = (
  mainBg: string | StaticImageData,
  mobileBg: string | StaticImageData
) => {
  const { isBrowser, windowDimentions } = useDimentions();
  let bg = mainBg;

  if (isBrowser) {
    const { width } = windowDimentions;
    bg = width > 640 ? mainBg : mobileBg;
  }
  return bg;
};
export default useBackground;
