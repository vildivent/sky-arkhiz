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
      {photoGallery && (
        <div className={`flex relative mx-auto text-5xl justify-center my-5`}>
          <button
            className="flex hover:text-cyan-500 opacity-50 absolute justify-start items-center left-0 h-full w-1/4 z-[1]"
            onClick={() => {
              if (imgSrc.id === photoGallery[0].id)
                setImgSrc(photoGallery[photoGallery.length - 1]);
              else setImgSrc((prev) => photoGallery[prev.id - 2]);
            }}
          >
            <BiChevronLeft />
          </button>
          {photoGallery.map((picture) => (
            <div
              key={picture.id}
              className={`${
                imgSrc.id !== picture.id
                  ? "w-0 h-0 opacity-0 scale-95"
                  : "duration-300 transition-all"
              } max-w-[50rem] my-auto flex flex-col items-center`}
            >
              <Image
                src={picture.img}
                alt={picture.title}
                objectPosition={"center"}
                placeholder="blur"
              />
            </div>
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
      )}
      {photoGallery.map((picture) => (
        <div
          key={picture.id}
          className={`${
            imgSrc.id !== picture.id
              ? "w-0 h-0 opacity-0 scale-95"
              : "duration-300 transition-all"
          } text-p text-lg flex justify-center`}
        >
          {picture.title}
        </div>
      ))}

      <div className={`flex flex-wrap justify-center gap-2 mt-5`}>
        {photoGallery &&
          photoGallery.map((picture) => (
            <div
              key={picture.id}
              className={`flex hover:scale-110 cursor-pointer ${
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
