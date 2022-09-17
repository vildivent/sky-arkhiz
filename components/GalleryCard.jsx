import Image from "next/image";

const GalleryCard = ({ picture, setId }) => {
  return (
    <div
      className={`hover:scale-110 cursor-pointer`}
      onClick={() => setId(picture.id)}
    >
      <Image
        src={`/assets/gallery/${picture.id}.jpg`}
        alt={picture.title || "photo"}
        layout={"responsive"}
        placeholder="blur"
        blurDataURL={`/assets/gallery/${picture.id}.jpg`}
        quality={20}
        width={40}
        height={40}
      />
    </div>
  );
};

export default GalleryCard;
