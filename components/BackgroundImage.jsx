import Image from "next/image";

const BackgroundImage = ({ src, alt }) => {
  const style = "";
  return (
    <>
      <div
        className={`absolute top-0 left-0 right-0 h-full w-full overflow-hidden`}
      >
        <Image
          alt={alt}
          src={src}
          layout="fill"
          objectFit="cover"
          quality={100}
          placeholder={"blur"}
        />
      </div>
    </>
  );
};

export default BackgroundImage;
