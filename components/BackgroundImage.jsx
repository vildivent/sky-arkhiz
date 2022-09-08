import Image from "next/image";

const BackgroundImage = ({ src, alt, fixed }) => {
  const style = "";
  return (
    <>
      <div
        className={`${
          fixed ? "fixed h-[120%]" : "absolute h-full"
        } top-0 left-0 right-0 overflow-hidden`}
      >
        <Image
          alt={alt}
          src={src}
          layout={"fill"}
          objectFit={fixed ? "" : "cover"}
          quality={100}
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default BackgroundImage;
