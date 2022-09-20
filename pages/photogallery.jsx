import Image from "next/image";
import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import { photoGallery } from "../constasnts";
import { MainLayout } from "../layouts/MainLayout";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Photogallery() {
  const [imgSrc, setImgSrc] = useState(photoGallery[0]);

  return (
    <MainLayout title={"Фотогалерея"} mainProps={"px-[2px]"}>
      {photoGallery &&
        photoGallery.map((picture) => (
          <div
            key={picture.id}
            className={`${imgSrc.id !== picture.id ? "hidden" : "mt-5"}`}
          >
            <Image
              src={picture.img}
              alt={picture.title}
              layout={"responsive"}
              quality={50}
              placeholder="blur"
            />
          </div>
        ))}

      <div className="flex justify-around text-5xl">
        <button
          className="hover:text-cyan-500"
          onClick={() => {
            if (imgSrc.id === photoGallery[0].id)
              setImgSrc(photoGallery[photoGallery.length - 1]);
            else setImgSrc((prev) => photoGallery[prev.id - 2]);
          }}
        >
          <BiChevronLeft />
        </button>
        <button
          className="hover:text-cyan-500"
          onClick={() => {
            if (imgSrc.id === photoGallery[photoGallery.length - 1].id)
              setImgSrc(photoGallery[0]);
            else setImgSrc((prev) => photoGallery[prev.id]);
          }}
        >
          <BiChevronRight />
        </button>
      </div>

      <div
        className={`grid lg:grid-cols-12 md:grid-cols-10 sm:grid-cols-7 grid-cols-5 gap-2 `}
      >
        {photoGallery &&
          photoGallery.map((picture) => (
            <div
              key={picture.id}
              className={`flex hover:scale-110 cursor-pointer justify-center ${
                imgSrc.id === picture.id ? "border border-cyan-500" : ""
              }`}
              onClick={() => setImgSrc(picture)}
            >
              <GalleryCard picture={picture} />
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
