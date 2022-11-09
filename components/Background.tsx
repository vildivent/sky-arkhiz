import Image from "next/image";
import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";

const Background = ({
  children,
  bg,
  position = "fixed",
  opacity = "",
}: BackgroundProps) => {
  return (
    <>
      <div className={`h-full w-full ${position} ${opacity}`}>
        <Image
          src={bg}
          alt="background"
          layout="fill"
          quality={100}
          placeholder="blur"
          objectFit={position === "absolute" ? "cover" : undefined}
          objectPosition={position === "absolute" ? "bottom right" : undefined}
        />
      </div>

      <div className="pt-[5rem] relative z-[1]">{children}</div>
    </>
  );
};

export default Background;
type BackgroundProps = {
  children?: ReactNode;
  bg: string | StaticImageData;
  position?: "fixed" | "absolute";
  opacity?: string;
};
