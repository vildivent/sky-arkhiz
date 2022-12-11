/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Moment from "react-moment";
import { IPost } from "../models/Post";
import { deletePost } from "../redux/features/post/postSlice";
import useUpdatePost from "../utils/hooks/posts/useUpdatePost";
import { useAppDispatch } from "../utils/hooks/redux";
import useDimentions from "../utils/hooks/useDimetions";
import ModalYesNo from "./ModalYesNo";

const PostItem = forwardRef<HTMLDivElement, PostItemProps>(function PostItem(
  { post, preview },
  ref
) {
  const { detailed, clickHandler } = useUpdatePost(post, preview);
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const { windowDimentions } = useDimentions();

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const multiplier = windowDimentions.width >= 640 ? 0.6 : 0.4;
      setImgWidth(windowDimentions.height * multiplier * post.aspectRatio);
      setImgHeight(windowDimentions.height * multiplier);
    }, 100);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [windowDimentions.height, windowDimentions.width, post.aspectRatio]);

  const deleteHandler = () => {
    setModalIsOpen(false);
    dispatch(deletePost({ id: post._id }));
  };

  return (
    <div
      ref={ref}
      className="flex flex-col flex-wrap justify-around gap-3 flex-grow border border-gray-600 rounded-lg w-full relative"
    >
      {router.pathname.includes("dashboard") && !preview && (
        <div className="absolute top-0 right-0 z-[2] text-4xl">
          <button
            onClick={() => setModalIsOpen(true)}
            className="hover:text-cyan-500"
          >
            <IoClose />
          </button>

          <ModalYesNo
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            yesClick={deleteHandler}
            noCkick={() => setModalIsOpen(false)}
          >
            <h1>Вы действительно хотите удалить эту новость?</h1>
          </ModalYesNo>
        </div>
      )}
      <h2 className={`font-h1 text-center sm:text-4xl text-2xl mx-10`}>
        {post.title}
      </h2>

      <div className={`mt-3 flex justify-center relative min-h-[250px]`}>
        {post.imgUrl && preview ? (
          <img src={post.imgUrl} alt={post.title} className="object-contain" />
        ) : (
          <Image
            src={post.imgUrl}
            alt={post.title}
            placeholder="empty"
            className="bg-[#1e1e1e]"
            width={imgWidth || 0}
            height={imgHeight || 0}
          />
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
          target="_blank"
          rel="noreferrer"
        >
          Источник
        </a>
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
          format="DD.MM.YYYY HH:mm"
        />
      </div>
    </div>
  );
});

export default PostItem;

export type PostItemProps = {
  post: IPost;
  preview?: boolean;
};
