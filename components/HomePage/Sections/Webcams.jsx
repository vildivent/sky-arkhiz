import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cameraPreview } from "../../../public/assets";
import { style } from "../../../styles/style";
import { ActionButton } from "../../Buttons";

const textAnimation = {
  hidden: {
    x: 0,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.25 },
  }),
};
const imgAnimation = {
  hidden: {
    x: -100,
    rotate: -90,
    opacity: 0,
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.8 },
  },
};

const Webcams = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      className="p-5 flex sm:flex-row flex-col bg-[#151515] gap-5 sm:justify-around"
    >
      <motion.div
        variants={imgAnimation}
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
        viewport={{ amount: 0.2 }}
        className="flex flex-col justify-center sm:w-1/2 text-center gap-5 sm:max-w-[25%]"
      >
        <motion.h2
          variants={textAnimation}
          custom={1}
          className="font-h1 text-3xl sm:text-4xl xl:text-5xl"
        >
          Камеры
        </motion.h2>
        <motion.p variants={textAnimation} custom={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          bibendum euismod felis, vel egestas risus porta bibendum euismod
          felis, vel egestas risus porta
        </motion.p>
        <motion.div>
          <motion.div variants={textAnimation} custom={3}>
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
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Webcams;
