/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks/redux";
import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../../components/Buttons";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { createPhoto } from "../../../redux/features/photo/photoSlice";
import {
  setTitle,
  setImgUrl,
  setCategory,
  reset,
} from "../../../redux/features/newPhotoForm/newPhotoFormSlice";
import { categories } from "../../../constasnts";

const CreateNews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { title, imgUrl, category } = useAppSelector(
    (state) => state.newPhotoForm
  );
  const [wrongFOrmatTitle, setWrongFOrmatTitle] = useState(false);
  const [wrongFOrmatImgUrl, setWrongFOrmatImgUrl] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const submitHandler = () => {
    if (title && imgUrl) {
      const data = {
        title,
        imgUrl,
        category,
      };

      dispatch(createPhoto(data));
      dispatch(reset());

      router.push("/dashboard/photogallery");
    } else {
      setWrongFOrmatTitle(true);
      setWrongFOrmatImgUrl(true);
    }
  };

  useEffect(() => {
    if (title && imgUrl) setWrongFormatDescription(false);
  }, [title, imgUrl]);

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/dashboard/photogallery");
  };

  return (
    <DashboardLayout title="Добавить фото">
      <>
        <div className={`mx-auto`}>
          <form
            id="formAddNewPhoto"
            className={`sm:w-1/2 w-full mx-auto py-10`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/*заголовок*/}
            <label className="text-xs text-white opacity-70">
              *Заголовок Фото:
              <input
                type="text"
                name="title"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => {
                  dispatch(setTitle(e.target.value));
                  setWrongFOrmatTitle(false);
                }}
                className={`mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm ${
                  wrongFOrmatTitle
                    ? "placeholder:text-red-700"
                    : "placeholder:text-gray-700"
                }`}
              />
            </label>
            {/*изображение*/}
            <label className="text-xs text-white opacity-70">
              *URL изображения:
              <input
                type="text"
                name="imgUrl"
                placeholder="https://"
                value={imgUrl}
                onChange={(e) => {
                  dispatch(setImgUrl(e.target.value));
                  setWrongFOrmatImgUrl(false);
                }}
                className={`mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm ${
                  wrongFOrmatImgUrl
                    ? "placeholder:text-red-700"
                    : "placeholder:text-gray-700"
                }`}
              />
            </label>

            {/*Категория*/}
            <label className="text-xs text-white opacity-70">Категория:</label>
            <div className="flex flex-col gap-3 justify-center items-start">
              <ActionButton
                onClick={() => dispatch(setCategory(categories[0]))}
                disabled={categories[0] === category}
              >
                Все
              </ActionButton>
              <ActionButton
                onClick={() => dispatch(setCategory(categories[1]))}
                disabled={categories[1] === category}
              >
                {categories[1]}
              </ActionButton>
              <ActionButton
                onClick={() => dispatch(setCategory(categories[2]))}
                disabled={categories[2] === category}
              >
                {categories[2]}
              </ActionButton>
              <ActionButton
                onClick={() => dispatch(setCategory(categories[3]))}
                disabled={categories[3] === category}
              >
                {categories[3]}
              </ActionButton>
            </div>

            <div
              className={`mt-2 ${
                wrongFormatDescription ? "text-red-500" : "text-gray-300"
              } font-p italic text-sm `}
            >
              *отмечены поля, обязательные к заполнению
            </div>

            <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
              <ActionButton onClick={submitHandler}>Подтвердить</ActionButton>
              <ResetButton onClick={() => dispatch(reset())}>
                Сбросить поля
              </ResetButton>
              <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          {imgUrl && <img src={imgUrl} alt="preview" />}
        </div>
      </>
    </DashboardLayout>
  );
};
export default CreateNews;
