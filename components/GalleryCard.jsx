import Image from "next/image";

const GalleryCard = ({ picture }) => {
  return (
    <Image
      src={picture.img}
      alt={picture.title || "photo"}
      placeholder="blur"
      quality={20}
      width={70}
      height={70}
    />
  );
};

export default GalleryCard;
