import useDimentions from "./useDimetions";

export default function useBackground(mainBg, mobileBg) {
  const dimentions = useDimentions();
  let bg = mainBg;

  if (typeof window !== "undefined") {
    const { width } = dimentions;
    bg = width > 640 ? mainBg : mobileBg;
  }
  return bg;
}
