/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PostItem from "../../../components/PostItem";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { createPost } from "../../../redux/features/post/postSlice";

export default function CreateNews() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const data = { title, text, imgUrl };

      console.log("uploading...");
      dispatch(createPost(data));
      router.push("/dashboard/news");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setTitle("");
    setText("");
    setImgUrl("");
  };

  return (
    <DashboardLayout title={"Добавить новость"}>
      <>
        <div className={`mx-auto`}>
          <form
            id="formAddNewPost"
            className={`w-1/2 mx-auto py-10`}
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="text-xs text-white opacity-70">
              Заголовок поста:
              <input
                type="text"
                name="title"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
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
              Текст поста:
              <textarea
                value={text}
                name="text"
                onChange={(e) => setText(e.target.value)}
                placeholder="Текст поста"
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700 rounded-sm"
              />
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
              <button
                onClick={submitHandler}
                className="flex justify-center items-center bg-zinc-600 text-xs text-white rounded-sm py-2 px-4 "
              >
                Добавить пост
              </button>
              <button
                onClick={cancelHandler}
                className="flex justify-center items-center bg-red-800 text-xs text-white rounded-sm py-2 px-4 "
              >
                Отменить
              </button>
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
