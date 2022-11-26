/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { MouseEventHandler } from "react";
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
import Label from "../../../components/Label";

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 mt-1 outline-none placeholder:text-gray-400 rounded-md";

const CreatePhoto = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { title, imgUrl, category } = useAppSelector(
    (state) => state.newPhotoForm
  );
  const [wrongFormatTitle, setWrongFormatTitle] = useState(false);
  const [wrongFormatImgUrl, setWrongFormatImgUrl] = useState(false);
  const [wrongFormatCategory, setWrongFormatCategory] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const submitHandler = () => {
    if (!title) {
      setWrongFormatTitle(true);
      setWrongFormatDescription(true);
    }
    if (!imgUrl) {
      setWrongFormatImgUrl(true);
      setWrongFormatDescription(true);
    }
    if (!category) {
      setWrongFormatCategory(true);
      setWrongFormatDescription(true);
    }
    if (title && imgUrl && category) {
      const data = {
        title,
        imgUrl,
        category,
      };

      dispatch(createPhoto(data));
      dispatch(reset());

      router.push("/dashboard/photogallery");
    }
  };

  useEffect(() => {
    if (title) setWrongFormatTitle(false);
  }, [title]);

  useEffect(() => {
    if (imgUrl) setWrongFormatImgUrl(false);
  }, [imgUrl]);

  useEffect(() => {
    if (category) setWrongFormatCategory(false);
  }, [category]);

  useEffect(() => {
    if (title && imgUrl && category) setWrongFormatDescription(false);
  }, [title, imgUrl, category]);

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    setWrongFormatTitle(false);
    setWrongFormatImgUrl(false);
    setWrongFormatCategory(false);
    setWrongFormatDescription(false);
  };

  const cancelHandler: MouseEventHandler = (e) => {
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
            className="sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            {/*заголовок*/}
            <div>
              <Label htmlFor="title" wrongFormat={wrongFormatTitle}>
                * Заголовок фото:
              </Label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
                className={inputStyle}
              />
            </div>

            {/*изображение*/}
            <div>
              <Label htmlFor="imgUrl" wrongFormat={wrongFormatImgUrl}>
                URL изображения:
              </Label>
              <input
                id="imgUrl"
                type="text"
                name="imgUrl"
                placeholder="https://"
                value={imgUrl}
                onChange={(e) => dispatch(setImgUrl(e.target.value))}
                className={inputStyle}
              />
            </div>

            {/*Категория*/}
            <Label htmlFor="category" wrongFormat={wrongFormatCategory}>
              * Категория:
            </Label>
            <div
              id="category"
              className="flex flex-col gap-3 justify-center items-start"
            >
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

            <Label wrongFormat={wrongFormatDescription}>
              *отмечены поля, обязательные к заполнению
            </Label>

            <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
              <ActionButton onClick={submitHandler}>Подтвердить</ActionButton>
              <ResetButton onClick={resetHandler}>Сбросить поля</ResetButton>
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
export default CreatePhoto;
