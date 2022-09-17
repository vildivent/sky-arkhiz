import Image from "next/image";
import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import { photoGallery } from "../constasnts";
import { MainLayout } from "../layouts/MainLayout";

export default function Photogallery() {
  const [mainPicture, setMainPicture] = useState("");

  return (
    <MainLayout title={"Фотогалерея"}>
      {mainPicture && (
        <div className="mt-5">
          <Image
            src={`/assets/gallery/${mainPicture}.jpg`}
            alt="image"
            layout={"responsive"}
            quality={50}
            width={200}
            height={200}
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
              setId={setMainPicture}
            />
          ))}
      </div>
    </MainLayout>
  );
}
