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
import PostItem from "../../../components/PostItem";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { createPost } from "../../../redux/features/post/postSlice";
import {
  setTitle,
  setImgUrl,
  setParagraph,
  setSrcUrl,
  pushParagraph,
  reset,
} from "../../../redux/features/newPostForm/newPostFormSlice";
import { IPost } from "../../../models/Post";

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

const CreateNews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { title, imgUrl, srcUrl, paragraph, text } = useAppSelector(
    (state) => state.newPostForm
  );
  const [wrongFOrmatTitle, setWrongFOrmatTitle] = useState(false);
  const [wrongFOrmatText, setWrongFOrmatText] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const submitHandler = () => {
    if (!title) {
      setWrongFOrmatTitle(true);
      setWrongFormatDescription(true);
    }
    if (!(text.length > 0 || paragraph)) {
      setWrongFOrmatText(true);
      setWrongFormatDescription(true);
    }
    if (title && (text.length > 0 || paragraph)) {
      const data = {
        title,
        text: [...text],
        imgUrl,
        srcUrl,
      };
      if (paragraph) data.text = [...text, paragraph];

      dispatch(createPost(data));
      dispatch(reset());

      router.push("/dashboard/news");
    }
  };
  useEffect(() => {
    if (title) setWrongFOrmatTitle(false);
  }, [title]);

  useEffect(() => {
    if (text.length > 0 || paragraph) setWrongFOrmatText(false);
  }, [text, paragraph]);

  useEffect(() => {
    if (title && (text.length > 0 || paragraph))
      setWrongFormatDescription(false);
  }, [title, text, paragraph]);

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/dashboard/news");
  };

  return (
    <DashboardLayout title="Добавить новость">
      <div className="mx-auto">
        <form
          id="formAddNewPost"
          className={`sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-3`}
          onSubmit={(e) => e.preventDefault()}
        >
          {/*заголовок*/}
          <div>
            <label
              htmlFor="title"
              className={`font-bold ${
                wrongFOrmatTitle ? "text-red-700" : "text-gray-200"
              }`}
            >
              * Заголовок новости:
            </label>
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
            <label htmlFor="imgUrl" className="font-bold text-gray-200">
              URL изображения:
            </label>
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

          {/*Текст*/}
          <div>
            <label
              htmlFor="text"
              className={`font-bold ${
                wrongFOrmatText ? "text-red-700" : "text-gray-200"
              }`}
            >
              * Текст новости:
            </label>
            <textarea
              id="text"
              value={paragraph}
              name="text"
              rows={5}
              onChange={(e) => dispatch(setParagraph(e.target.value))}
              placeholder="Текст новости"
              className={`resize-none h-auto ${inputStyle}`}
            />
          </div>

          {/*Ссылка на источник*/}
          <div>
            <label htmlFor="srcUrl" className="font-bold text-gray-200">
              Ссылка на источник:
            </label>
            <input
              id="srcUrl"
              type="text"
              name="srcUrl"
              placeholder="https://"
              value={srcUrl}
              onChange={(e) => dispatch(setSrcUrl(e.target.value))}
              className={inputStyle}
            />
          </div>

          {/*подсказка*/}
          <div
            className={`mt-2 font-bold  ${
              wrongFormatDescription ? "text-red-700" : "text-white"
            }`}
          >
            *отмечены поля, обязательные к заполнению
          </div>

          <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
            <ActionButton onClick={submitHandler}>Подтвердить</ActionButton>
            <ActionButton onClick={() => dispatch(pushParagraph())}>
              Добавить абзац
            </ActionButton>
            <ResetButton
              onClick={() => {
                dispatch(reset());
                setWrongFOrmatTitle(false);
                setWrongFOrmatText(false);
                setWrongFormatDescription(false);
              }}
            >
              Сбросить поля
            </ResetButton>
            <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
          </div>
        </form>
      </div>
      <div>
        <PostItem
          post={
            {
              _id: "",
              title,
              text: [...text, paragraph],
              imgUrl,
              srcUrl,
              createdAt: new Date("2022/1/1"),
              views: 0,
            } as IPost
          }
          preview={true}
        />
      </div>
    </DashboardLayout>
  );
};
export default CreateNews;
