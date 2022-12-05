import { motion } from "framer-motion";
import Link from "next/link";
import { style } from "../../../styles/style";
import { ActionButton } from "../../Buttons";
import ImageSlider, { ImageSlide } from "../../ImageSlider";
import "react-slideshow-image/dist/styles.css";
import {
  sliderImage1,
  sliderImage2,
  sliderImage3,
  sliderImage4,
  sliderImage5,
  sliderImage6,
  sliderImage7,
  sliderImage8,
} from "../../../public/assets/gallery/observed objects";

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

const Gallery = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      className={`h-full w-full flex flex-col sm:flex-row justify-around overflow-hidden bg-[#151515] sm:p-5`}
    >
      <div className="sm:w-[60%] w-full flex gap-3 flex-col">
        <motion.h2
          variants={headingAnimation}
          custom={1}
          className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5"
        >
          Объекты, наблюдаемые на экскурсии:
        </motion.h2>
        <ImageSlider>
          <ImageSlide src={sliderImage1} />
          <ImageSlide src={sliderImage2} />
          <ImageSlide src={sliderImage3} />
          <ImageSlide src={sliderImage4} />
          <ImageSlide src={sliderImage5} />
          <ImageSlide src={sliderImage6} />
          <ImageSlide src={sliderImage7} />
          <ImageSlide src={sliderImage8} />
        </ImageSlider>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: true }}
        className="sm:max-w-[25%] flex flex-col justify-center"
      >
        <motion.p variants={textAnimation} custom={1} className="mx-10 sm:mx-0">
          Вы сможете рассмотреть через телескоп интересные и различные по типу
          объекты, доступные в данное время года и ночи.
        </motion.p>
        <motion.p
          variants={textAnimation}
          custom={3}
          className="w-full flex justify-center"
        >
          <Link href="/photogallery/">
            <a>
              <ActionButton className={style.button}>Фотогалерея</ActionButton>
            </a>
          </Link>
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default Gallery;
