import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Slide } from "react-slideshow-image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
  sliderImage6,
  sliderImage7,
  sliderImage8,
} from "../public/assets/gallery/observed objects";

const ImageSlide = ({ src }: ImageSlideProps) => {
  return (
    <div className="flex justify-center items-center relative sm:h-[45vw] h-[75vw]">
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

const ImageSlider = () => {
  return (
    <Slide
      transitionDuration={400}
      prevArrow={
        <div className="text-5xl opacity-50 hover:text-cyan-500 h-full flex flex-col justify-center">
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
      <ImageSlide src={sliderImage1} />
      <ImageSlide src={sliderImage2} />
      <ImageSlide src={sliderImage3} />
      <ImageSlide src={sliderImage4} />
      <ImageSlide src={sliderImage5} />
      <ImageSlide src={sliderImage6} />
      <ImageSlide src={sliderImage7} />
      <ImageSlide src={sliderImage8} />
    </Slide>
  );
};

export default ImageSlider;

type ImageSlideProps = {
  src: StaticImageData | string;
};
