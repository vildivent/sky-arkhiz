/* eslint-disable react/display-name */
import { motion } from "framer-motion";
import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const AstronomyCard = forwardRef(
  ({ href, imageSrc, title, description }, ref) => {
    return (
      <div ref={ref}>
        <Link href={href}>
          <a>
            <div className="w-[300px] sm:h-[550px] bg-[#114883] hover:scale-[1.03] shadow-lg shadow-black">
              <Image src={imageSrc} alt={title} />

              <div className="p-5 text-center">
                <h3 className="font-h1 text-2xl sm:text-2xl xl:text-3xl text-center">
                  {title}
                </h3>
                <p className="mb-0">{description}</p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  }
);

export const MAstronomyCard = motion(AstronomyCard);
