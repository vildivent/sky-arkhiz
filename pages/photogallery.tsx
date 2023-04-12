import Image from "next/image";
import { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { loadingGif } from "../public/assets";
import usePhotosFetchAndSearch from "../utils/hooks/photos/usePhotosFetchAndSearch";
import PhotoColumn from "../components/Photos/PhotoColumn";
import { categories } from "../constants";
import { ActionButton } from "../components/Buttons";
import useDimentions from "../utils/hooks/useDimetions";

const Photogallery = () => {
  const [category, setCategory] = useState(categories[1]);
  const { photos, loading, lastElementRef } = usePhotosFetchAndSearch(category);
  const { windowDimentions } = useDimentions();

  return (
    <MainLayout title="Фотогалерея" mainProps="px-2">
      <div className={`flex flex-col flex-wrap gap-3 mt-3`}>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-start">
          <ActionButton
            onClick={() => setCategory(categories[1])}
            disabled={categories[1] === category}
          >
            {categories[1]}
          </ActionButton>
          <ActionButton
            onClick={() => setCategory(categories[2])}
            disabled={categories[2] === category}
          >
            {categories[2]}
          </ActionButton>
          <ActionButton
            onClick={() => setCategory(categories[3])}
            disabled={categories[3] === category}
          >
            {categories[3]}
          </ActionButton>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
          {windowDimentions.width >= 640 ? (
            <>
              <PhotoColumn
                photos={photos}
                colsTotal={3}
                colNumber={1}
                lastElementRef={lastElementRef}
              />
              <PhotoColumn
                photos={photos}
                colsTotal={3}
                colNumber={2}
                lastElementRef={lastElementRef}
              />
              <PhotoColumn
                photos={photos}
                colsTotal={3}
                colNumber={3}
                lastElementRef={lastElementRef}
              />
            </>
          ) : (
            <>
              <PhotoColumn
                photos={photos}
                colsTotal={2}
                colNumber={1}
                lastElementRef={lastElementRef}
              />
              <PhotoColumn
                photos={photos}
                colsTotal={2}
                colNumber={2}
                lastElementRef={lastElementRef}
              />
            </>
          )}
        </div>
        {loading && (
          <Image src={loadingGif} alt="loading" width={40} height={40} />
        )}
        {photos.length === 0 && !loading && (
          <span className="text-center">Фото не найдены</span>
        )}
      </div>
    </MainLayout>
  );
};
export default Photogallery;
