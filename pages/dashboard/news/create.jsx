/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../../components/Buttons";
import PostItem from "../../../components/PostItem";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { createPost } from "../../../redux/features/post/postSlice";
import {
  setTitle,
  setImgUrl,
  setParagraph,
  setSrcUrl,
  pushParagraph,
  reset,
} from "../../../redux/features/newPostForm/newPostFormSlice";

export default function CreateNews() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { title, imgUrl, srcUrl, paragraph, text } = useSelector(
    (state) => state.newPostForm
  );
  const [wrongFOrmatTitle, setWrongFOrmatTitle] = useState(false);
  const [wrongFOrmatText, setWrongFOrmatText] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const submitHandler = () => {
    if (title && text) {
      const data = {
        title,
        text: [...text],
        imgUrl,
        srcUrl,
      };
      if (paragraph) {
        data.text = [...text, paragraph];
      }
      try {
        console.log("uploading...");
        dispatch(createPost(data));
        console.log("Post added!");

        dispatch(reset());
        router.push("/dashboard/news");
      } catch (error) {
        console.log(error);
      }
    } else {
      setWrongFOrmatTitle(true);
      setWrongFOrmatText(true);
      setWrongFormatDescription(true);
    }
  };

  useEffect(() => {
    if (title && text) setWrongFormatDescription(false);
  }, [title, text]);

  const cancelHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/dashboard/news");
  };

  return (
    <DashboardLayout title={"Добавить новость"}>
      <>
        <div className={`mx-auto`}>
          <form
            id="formAddNewPost"
            className={`sm:w-1/2 w-full mx-auto py-10`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/*заголовок*/}
            <label className="text-xs text-white opacity-70">
              Заголовок новости:
              <input
                type="text"
                name="title"
                placeholder="*Заголовок"
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
              URL изображения:
              <input
                type="text"
                name="imgUrl"
                placeholder="https://"
                value={imgUrl}
                onChange={(e) => dispatch(setImgUrl(e.target.value))}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
              />
            </label>

            {/*Текст*/}
            <label className="text-xs text-white opacity-70">
              Текст новости:
              <textarea
                value={paragraph}
                name="text"
                onChange={(e) => {
                  dispatch(setParagraph(e.target.value));
                  setWrongFOrmatText(false);
                }}
                placeholder="*Текст"
                className={`mt-1 resize-none h-40 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm ${
                  wrongFOrmatText
                    ? "placeholder:text-red-700"
                    : "placeholder:text-gray-700"
                }`}
              />
            </label>
            {/*Ссылка на источник*/}
            <label className="text-xs text-white opacity-70">
              Ссылка на источник:
              <input
                type="text"
                name="srcUrl"
                placeholder="https://"
                value={srcUrl}
                onChange={(e) => dispatch(setSrcUrl(e.target.value))}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
              />
            </label>
            <div
              className={`mt-2 ${
                wrongFormatDescription ? "text-red-500" : "text-gray-300"
              } font-p italic text-sm `}
            >
              *отмечены поля, обязательные к заполнению
            </div>

            <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
              <ActionButton
                title={"Подтвердить"}
                onClick={() => submitHandler()}
              />
              <ActionButton
                title={"Добавить абзац"}
                onClick={() => dispatch(pushParagraph())}
              />
              <ResetButton
                title={"Сбросить поля"}
                onClick={() => dispatch(reset())}
              />
              <CancelButton title={"Отменить"} onClick={cancelHandler} />
            </div>
          </form>
        </div>
        <div>
          <PostItem
            post={{
              title,
              imgUrl,
              srcUrl,
              paragraph,
              text,
              createdAt: Date.now(),
            }}
          />
        </div>
      </>
    </DashboardLayout>
  );
}
