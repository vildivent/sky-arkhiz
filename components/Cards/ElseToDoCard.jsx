/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const ElseToDoCard = forwardRef(({ title, href, imgSrc }, ref) => {
  return (
    <div ref={ref}>
      <Link href={href}>
        <a>
          <div className="w-[22rem] flex flex-col hover:scale-[1.03] items-center sm:gap-5 gap-2">
            <Image
              src={imgSrc}
              alt={title}
              placeholder="blur"
              width={305}
              height={305}
            />

            <h3 className="font-h1 text-2xl px-3 sm:text-3xl xl:text-3xl text-center">
              {title}
            </h3>
          </div>
        </a>
      </Link>
    </div>
  );
});

export const MElseToDoCard = motion(ElseToDoCard);
