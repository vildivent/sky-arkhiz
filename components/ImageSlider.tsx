import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Slide } from "react-slideshow-image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import type { ReactNode } from "react";

export const ImageSlide = ({ src }: ImageSlideProps) => {
  return (
    <div className="flex justify-center items-center relative sm:h-[40vw] h-[70vw] select-none">
      <Image
        src={src}
        alt="slider photo"
        draggable={false}
        placeholder="blur"
        objectFit="cover"
        layout="fill"
        quality={100}
      />
    </div>
  );
};

const ImageSlider = ({ children }: ImageSliderProps) => {
  return (
    <Slide
      transitionDuration={400}
      prevArrow={
        <div className="text-5xl opacity-50 hover:text-cyan-500 h-full flex flex-col justify-center z-[1]">
          <BiChevronLeft />
        </div>
      }
      nextArrow={
        <div className="text-5xl opacity-50 hover:text-cyan-500 h-full flex flex-col justify-center">
          <BiChevronRight />
        </div>
      }
      indicators={() => (
        <div className="rounded-full p-1 bg-[#444] cursor-pointer indicator" />
      )}
    >
      {children}
    </Slide>
  );
};

export default ImageSlider;

type ImageSlideProps = {
  src: StaticImageData | string;
};

type ImageSliderProps = {
  children: ReactNode;
};
