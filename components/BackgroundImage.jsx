import Image from "next/image";

const BackgroundImage = ({ src, alt, fixed }) => {
  const style = "";
  return (
    <>
      <div
        className={`${
          fixed ? "fixed" : "absolute"
        } top-0 left-0 right-0 h-full w-full overflow-hidden`}
      >
        <Image
          alt={alt}
          src={src}
          layout={fixed ? "responsive" : "fill"}
          objectFit={fixed ? "" : "cover"}
          quality={100}
          placeholder="blur"
        />
      </div>
    </>
  );
};

export default BackgroundImage;
