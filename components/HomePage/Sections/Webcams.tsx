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
      viewport={{ amount: 0.2, once: true }}
      className="flex flex-col gap-5 overflow-hidden items-center bg-[#151515] p-5"
    >
      <motion.h2
        variants={textAnimation}
        custom={2}
        className="font-h1 text-3xl text-center sm:text-4xl xl:text-5xl"
      >
        Камеры
      </motion.h2>
      <div className="flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-around">
        <motion.div
          variants={imgAnimation}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          className="md:w-[50vw] w-[80vw] rounded-full md:h-[50vw] h-[80vw] shadow-lg shadow-black hover:scale-[1.02]"
        >
          <Link href="/webcams/">
            <a>
              <Image
                src={cameraPreview}
                alt="Небо над обсерваторией"
                placeholder="blur"
                layout="responsive"
              />
            </a>
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: true }}
          className="flex flex-col justify-center md:w-1/2 text-start gap-5 md:max-w-[30%]"
        >
          <motion.p className="m-0" variants={textAnimation} custom={5}>
            В Специальной Астрофизической Обсерватории, около которой проводятся
            экскурсии, находятся различные камеры - обзора неба и окрестностей,
            камеры внутри обсерватории и пр.
          </motion.p>
          <motion.p className="m-0" variants={textAnimation} custom={8}>
            Вы можете заглянуть в некоторые из них и увидеть ночное небо,
            красивые виды вокруг обсерватории, а так же обстановку внутри и
            снаружи.
          </motion.p>
          <div>
            <motion.div
              variants={textAnimation}
              custom={10}
              className="flex justify-center w-full m-0"
            >
              <Link href="/webcams/">
                <a>
                  <ActionButton className={style.button}>
                    Посмотреть
                  </ActionButton>
                </a>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Webcams;
