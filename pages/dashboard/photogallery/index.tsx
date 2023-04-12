import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "../../../components/Buttons";
import SearchBar from "../../../components/SearchBar";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { loadingGif } from "../../../public/assets";
import usePhotosFetchAndSearch from "../../../utils/hooks/photos/usePhotosFetchAndSearch";
import useDimentions from "../../../utils/hooks/useDimetions";
import PhotoColumn from "../../../components/Photos/PhotoColumn";
import { categories } from "../../../constants";

const Photogallery = () => {
  const [category, setCategory] = useState(categories[0]);
  const { photos, loading, lastElementRef, inputValue, setInputValue } =
    usePhotosFetchAndSearch(category);
  const { windowDimentions } = useDimentions();

  return (
    <DashboardLayout title="Фотогалерея" mainProps="px-2">
      <div className={`flex flex-col flex-wrap gap-3 mt-3`}>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          reset={() => setInputValue("")}
        />
        <div className="flex justify-center">
          <Link href="/dashboard/photogallery/create">
            <a className="my-3">
              <ActionButton>Добавить фото</ActionButton>
            </a>
          </Link>
        </div>

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
          <ActionButton
            onClick={() => setCategory(categories[0])}
            disabled={categories[0] === category}
          >
            Все
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
    </DashboardLayout>
  );
};

export default Photogallery;
