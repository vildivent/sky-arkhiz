import { useState } from "react";
import { motion } from "framer-motion";
import ImageSlider, { ImageSlide } from "../../ImageSlider";
import "react-slideshow-image/dist/styles.css";
import {
  slider2Image1,
  slider2Image2,
  slider2Image3,
  slider2Image4,
  slider2Image5,
  slider2Image6,
} from "../../../public/assets/gallery/you will see";
import { IoIosArrowDown } from "react-icons/io";

const textAnimation = {
  hidden: {
    x: 80,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.4 },
  }),
};
const headingAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.15, duration: 0.4 },
  }),
};

const WhatYoullSee = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      className={`h-full w-full flex flex-col items-center overflow-hidden gap-5 bg-[#151515] ${
        isOpen ? "md:p-5 py-5" : "pt-5 md:px-5"
      }`}
    >
      <motion.h2
        variants={headingAnimation}
        custom={1}
        className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center"
      >
        Как видно глазом в телескоп
      </motion.h2>
      <motion.button
        variants={headingAnimation}
        custom={2}
        className="mx-auto"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {
          <div className="flex items-center gap-2 text-cyan-500 hover:text-white ">
            <span className="transition-all duration-300">Подробнее</span>
            <IoIosArrowDown
              className={`transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        }
      </motion.button>
      <motion.div
        className="h-full w-full lg:flex lg:flex-row lg:justify-around"
        animate={{
          height: isOpen ? "auto" : 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <div className="md:w-[60vw] w-[100vw] mx-auto">
          <ImageSlider>
            <ImageSlide src={slider2Image1} />
            <ImageSlide src={slider2Image2} />
            <ImageSlide src={slider2Image3} />
            <ImageSlide src={slider2Image4} />
            <ImageSlide src={slider2Image5} />
            <ImageSlide src={slider2Image6} />
          </ImageSlider>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1, once: true }}
          className="mx-5 md:mx-10 my-auto"
        >
          <motion.p variants={textAnimation} custom={1} className="mx-0">
            Красочные изображения, какие все привыкли видеть на фотографиях в
            интернете, глазом через телескоп вы не сможете увидеть.
          </motion.p>
          <motion.p variants={textAnimation} custom={2} className="mx-0">
            К сожалению наши глаза не фотоаппараты и имеют ограниченную
            чувствительность. К тому же атмосфера Земли искажает видимость
            космических объектов.
          </motion.p>
          <motion.p variants={textAnimation} custom={3} className="mx-0">
            Однако с лёгкостью можно наблюдать в телескоп кратеры на Луне,
            облака на Юпитере и его спутники, кольца Сатурна, ледяную шапку на
            полюсе Марса, различные звёздные скопления.
          </motion.p>
          <motion.p variants={textAnimation} custom={4} className="mx-0">
            А при чистой атмосфере, отсутствии засветки и нужной подготовке
            глаз, возможно рассмотреть туманности и далёкие галактики.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WhatYoullSee;
