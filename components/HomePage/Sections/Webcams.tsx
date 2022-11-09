import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cameraPreview } from "../../../public/assets";
import { style } from "../../../styles/style";
import { ActionButton } from "../../Buttons";

const textAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

const imgAnimation = {
  hidden: {
    x: -150,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: { delay: 0.15, duration: 0.8 },
  },
};

const Webcams = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      className="p-5 flex sm:flex-row flex-col bg-[#151515] gap-5 sm:justify-around overflow-hidden"
    >
      <motion.div
        variants={imgAnimation}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        className="sm:selection:w-1/2 shadow-lg shadow-black rounded-full hover:scale-[1.02] sm:my-10"
      >
        <Link href="/webcams/">
          <a>
            <Image
              src={cameraPreview}
              alt="Небо над обсерваторией"
              placeholder="blur"
            />
          </a>
        </Link>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.4 }}
        className="flex flex-col justify-center sm:w-1/2 text-start gap-5 sm:max-w-[30%]"
      >
        <motion.h2
          variants={textAnimation}
          custom={2}
          className="font-h1 text-3xl text-center sm:text-4xl xl:text-5xl"
        >
          Камеры
        </motion.h2>
        <motion.p className="my-0" variants={textAnimation} custom={4}>
          В Специальной Астрофизической Обсерватории, около которой проводятся
          экскурсии, находятся различные камеры - обзора неба и окрестностей,
          камеры внутри обсерватории и пр.
        </motion.p>
        <motion.p className="my-0" variants={textAnimation} custom={7}>
          Вы можете заглянуть в некоторые из них и увидеть ночное небо, красивые
          виды вокруг обсерватории, а так же обстановку внутри и снаружи.
        </motion.p>
        <motion.p className="my-0" variants={textAnimation} custom={9}>
          Камеры работают как в реальном времени, так и покадрово с накоплением.
        </motion.p>
        <div>
          <motion.div variants={textAnimation} custom={6}>
            <Link href="/webcams/">
              <a>
                <div className="flex justify-center">
                  <ActionButton className={style.button}>
                    Подробнее
                  </ActionButton>
                </div>
              </a>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Webcams;
