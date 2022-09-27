import Image from "next/image";

const Background = ({ children, bg, position = "fixed", opacity = "" }) => {
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
        />
      </div>

      <div className="pt-[5rem] relative z-[1]">{children}</div>
    </>
  );
};

export default Background;
