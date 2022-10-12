/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */

import { forwardRef } from "react";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { updateViews } from "../redux/features/post/postSlice";

const PostItem = forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    setDetailed((prev) => !prev);
    if (detailed && !view) {
      dispatch(updateViews({ id: post._id }));
      setView(true);
    }
  };

  const [detailed, setDetailed] = useState(false);
  const [view, setView] = useState(false);
  return (
    <div
      ref={ref}
      className="flex flex-col flex-wrap justify-around gap-3 flex-grow border border-gray-600 rounded-lg w-full"
    >
      <h2 className={`font-h1 text-center sm:text-4xl text-2xl`}>
        {post.title}
      </h2>

      <div className={`mt-3 flex justify-center max-h-[25rem]`}>
        {post.imgUrl && (
          <img src={post.imgUrl} alt="post img" className="object-contain" />
        )}
      </div>
      {!detailed && <p className="font-p px-3 my-0">{post.text[0]}</p>}

      {detailed &&
        post.text.map((item, index) => (
          <p key={index} className="font-p px-3 my-0">
            {item}
          </p>
        ))}
      {detailed && post.srcUrl && (
        <a
          href={`${post.srcUrl}`}
          className={`text-cyan-500 hover:text-white ml-3`}
        >{`Источник`}</a>
      )}
      <div className="flex">
        <button
          className={`text-cyan-500 hover:text-white ml-3`}
          onClick={clickHandler}
        >
          {detailed ? "Свернуть..." : "Подробнее..."}
        </button>
      </div>
      <div className="flex flex-wrap gap-5 sm:justify-end justify-around ">
        <div className="flex flex-wrap gap-1  items-center">
          <AiFillEye />
          <span>{post.views}</span>
        </div>

        <Moment
          className="m-2"
          date={post.createdAt}
          format="DD/MM/YYYY HH:mm"
        />
      </div>
    </div>
  );
});

export default PostItem;
