import Image from "next/image";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const GalleryCard = ({ photoGallery, imgSrc, setImgSrc }) => {
  return (
    <>
      <div
        className={`relative w-full sm:h-[40rem] h-[20rem] flex mx-auto text-5xl justify-center my-5`}
      >
        <button
          className=" hover:text-cyan-500 opacity-50 absolute justify-start items-center left-0 h-full w-1/4 z-[1]"
          onClick={() => {
            if (imgSrc.id === photoGallery[0].id)
              setImgSrc(photoGallery[photoGallery.length - 1]);
            else setImgSrc((prev) => photoGallery[prev.id - 2]);
          }}
        >
          <BiChevronLeft />
        </button>
        {photoGallery.map((picture) => (
          <Image
            key={picture.id}
            className={`${
              imgSrc.id !== picture.id
                ? "opacity-0 scale-90 "
                : "transition-all duration-300"
            } `}
            src={`${picture.img}.jpg`}
            alt={picture.title}
            objectFit="contain"
            layout="fill"
            placeholder="blur"
            blurDataURL={`${picture.img}_small.jpg`}
          />
        ))}

        <button
          className="hover:text-cyan-500 opacity-50 absolute flex justify-end items-center right-0 h-full w-1/4 z-[1]"
          onClick={() => {
            if (imgSrc.id === photoGallery[photoGallery.length - 1].id)
              setImgSrc(photoGallery[0]);
            else setImgSrc((prev) => photoGallery[prev.id]);
          }}
        >
          <BiChevronRight />
        </button>
      </div>
      {photoGallery.map((picture) => (
        <div
          key={picture.id}
          className={`${
            imgSrc.id !== picture.id
              ? "w-0 h-0 opacity-0 scale-90"
              : "duration-300 transition-all"
          } text-p text-lg flex justify-center`}
        >
          {picture.title}
        </div>
      ))}
    </>
  );
};

export default GalleryCard;
