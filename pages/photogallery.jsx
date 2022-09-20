import Image from "next/image";
import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import { photoGallery } from "../constasnts";
import { MainLayout } from "../layouts/MainLayout";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function Photogallery() {
  const [imgSrc, setImgSrc] = useState(photoGallery[0]);

  return (
    <MainLayout title={"Фотогалерея"}>
      <div className="flex justify-around text-5xl mt-5">
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
      {imgSrc?.img && (
        <div className="">
          <Image
            src={imgSrc?.img}
            alt="image"
            layout={"responsive"}
            quality={50}
            priority
          />
        </div>
      )}

      <div
        className={`grid lg:grid-cols-12 md:grid-cols-10 grid-cols-5 gap-2 mt-5 relative`}
      >
        {photoGallery &&
          photoGallery.map((picture) => (
            <GalleryCard
              key={picture.id}
              picture={picture}
              setImgSrc={setImgSrc}
            />
          ))}
      </div>
    </MainLayout>
  );
}
