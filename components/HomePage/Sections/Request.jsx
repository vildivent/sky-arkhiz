import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { style } from "../../../styles/style";
import { ActionButton } from "../../Buttons";

const headingAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom) => ({
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.25 },
  }),
};
const buttonAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.25 },
  }),
};

const Request = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1 }}
      className="p-5 pb-20 flex flex-col gap-10 bg-[#151515]"
    >
      <motion.h2
        variants={headingAnimation}
        custom={2}
        className="font-h1 text-3xl sm:text-4xl xl:text-5xl text-center"
      >
        Уже посмотрели на звёзды? Оставьте отзыв
      </motion.h2>

      <motion.div
        variants={buttonAnimation}
        custom={2}
        className="flex justify-center"
      >
        <Link href={"/reviews/create"}>
          <a>
            <ActionButton className={style.button}>Оставить отзыв</ActionButton>
          </a>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Request;
