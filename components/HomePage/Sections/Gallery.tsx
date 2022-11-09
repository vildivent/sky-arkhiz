import { motion } from "framer-motion";
import ImageSlider from "../../ImageSlider";

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
      viewport={{ amount: 0.1 }}
      className={`h-full w-full flex flex-col sm:flex-row justify-around overflow-hidden bg-[#151515] p-2 sm:p-5`}
    >
      <div className="sm:w-[60%] w-full flex gap-3 flex-col">
        <motion.h2
          variants={headingAnimation}
          custom={1}
          className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center my-5"
        >
          Объекты, наблюдаемые на экскурсии:
        </motion.h2>
        <ImageSlider />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="sm:max-w-[25%] flex flex-col justify-center"
      >
        <motion.p variants={textAnimation} custom={1}>
          Вы сможете рассмотреть через телескоп интересные и различные по типу
          объекты, доступные в данное время года и ночи.
        </motion.p>
        {/* <motion.p variants={textAnimation} custom={2}>
          
        </motion.p> */}
      </motion.div>
    </motion.section>
  );
};

export default Gallery;
