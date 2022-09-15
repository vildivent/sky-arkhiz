/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../../components/Buttons";
import PostItem from "../../../components/PostItem";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { createPost } from "../../../redux/features/post/postSlice";

export default function CreateNews() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [wrongFOrmatTitle, setWrongFOrmatTitle] = useState(false);
  const [wrongFOrmatText, setWrongFOrmatText] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (title && text) {
      try {
        const data = { title, text, imgUrl };

        console.log("uploading...");
        dispatch(createPost(data));
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

  const resetFields = (e) => {
    e.preventDefault();
    setTitle("");
    setText("");
    setImgUrl("");
    setWrongFOrmatTitle(false);
    setWrongFOrmatText(false);
    setWrongFormatDescription(false);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
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
            <label className="text-xs text-white opacity-70">
              Заголовок новости:
              <input
                type="text"
                name="title"
                placeholder="*Заголовок"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setWrongFOrmatTitle(false);
                }}
                className={`mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm ${
                  wrongFOrmatTitle
                    ? "placeholder:text-red-700"
                    : "placeholder:text-gray-700"
                }`}
              />
            </label>

            <label className="text-xs text-white opacity-70">
              URL изображения:
              <input
                type="text"
                name="imgUrl"
                placeholder="https://"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
              />
            </label>

            <label className="text-xs text-white opacity-70">
              Текст новости:
              <textarea
                value={text}
                name="text"
                onChange={(e) => {
                  setText(e.target.value);
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
            <div
              className={`${
                wrongFormatDescription ? "text-red-500" : "text-gray-300"
              } font-p italic text-sm `}
            >
              *отмечены поля, обязательные к заполнению
            </div>

            <div className="flex gap-2 flex-wrap items-center justify-center mt-4">
              <ActionButton
                title={"Добавить новость"}
                onClick={submitHandler}
              />
              <ResetButton title={"Сбросить поля"} onClick={resetFields} />
              <CancelButton title={"Отменить"} onClick={cancelHandler} />
            </div>
          </form>
        </div>
        <div>
          <PostItem post={{ title, text, imgUrl, createdAt: Date.now() }} />
        </div>
      </>
    </DashboardLayout>
  );
}
