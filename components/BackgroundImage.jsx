import Image from "next/image";

const BackgroundImage = ({ src, alt }) => {
  const style =
    "absolute top-0 left-0 right-0 h-[100vh] w-[100vw] overflow-hidden z-[-1]";
  return (
    <>
      <div className={`${style}`}>
        <Image
          alt={alt}
          src={src}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </>
  );
};

export default BackgroundImage;
