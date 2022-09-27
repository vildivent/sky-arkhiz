import Image from "next/image";
import { Slide } from "react-slideshow-image";
import { sliderImage1 } from "../public/assets";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ImageSlide = ({ src }) => {
  return (
    <div className="flex justify-center">
      <Image
        src={src}
        alt="slider photo"
        draggable={false}
        placeholder="blur"
      />
    </div>
  );
};

const ImageSlider = () => {
  return (
    <Slide
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
      <ImageSlide src={sliderImage1} />
      <ImageSlide src={sliderImage1} />
      <ImageSlide src={sliderImage1} />
    </Slide>
  );
};

export default ImageSlider;
