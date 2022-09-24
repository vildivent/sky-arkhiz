import Image from "next/image";
import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import { photoGallery } from "../constasnts";
import { MainLayout } from "../layouts/MainLayout";

export default function Photogallery() {
  const [imgSrc, setImgSrc] = useState(photoGallery[0]);
  return (
    <MainLayout title={"Фотогалерея"} mainProps={"px-[2px]"}>
      <GalleryCard
        photoGallery={photoGallery}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
      />

      <div className={`flex flex-wrap justify-center gap-2 mt-5`}>
        {photoGallery &&
          photoGallery.map((picture) => (
            <div
              key={picture.id}
              className={`flex relative w-16 h-16 hover:scale-110 cursor-pointer ${
                imgSrc.id === picture.id ? "border border-cyan-500" : ""
              }`}
              onClick={() => setImgSrc(picture)}
            >
              <Image
                src={picture.img}
                alt={picture.title || "photo"}
                quality={20}
                layout="fill"
                placeholder="blur"
                blurDataURL={picture.img}
              />
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
