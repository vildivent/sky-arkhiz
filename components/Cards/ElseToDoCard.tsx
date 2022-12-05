import { motion } from "framer-motion";
import { forwardRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

export const ElseToDoCard = forwardRef<HTMLDivElement, ElseToDoCardProps>(
  function forwardRef({ title, href, imgSrc }, ref) {
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

              <h3 className="font-h2 px-3 text-xl sm:text-2xl xl:text-3xl text-center">
                {title}
              </h3>
            </div>
          </a>
        </Link>
      </div>
    );
  }
);

export const MElseToDoCard = motion(ElseToDoCard);

type ElseToDoCardProps = {
  title: string;
  href: string;
  imgSrc: string | StaticImageData;
};
