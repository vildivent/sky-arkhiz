import Image from "next/image";

const GalleryCard = ({ picture, setImgSrc }) => {
  const clickHandler = () => {
    setImgSrc(picture);
  };

  return (
    <div className={`hover:scale-110 cursor-pointer`} onClick={clickHandler}>
      <Image
        src={picture.img}
        alt={picture.title || "photo"}
        placeholder="blur"
        quality={10}
        width={50}
        height={50}
      />
    </div>
  );
};

export default GalleryCard;
