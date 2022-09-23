/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewItem = ({ review, createPage }) => {
  const dispatch = useDispatch();

  const [detailed, setDetailed] = useState(createPage || false);
  const [rated, setRated] = useState(false);
  const [useful, setUseful] = useState(undefined);

  const starsArray = [1, 2, 3, 4, 5];

  return (
    <div
      key={`review${review._id}`}
      className="flex flex-wrap justify-around border border-gray-600 rounded-lg w-full"
    >
      {/* блок пользователя */}
      <div className={`flex flex-col flex-wrap gap-3 justify-start sm:w-1/4`}>
        <h2 className={`font-h1 text-center text-2xl`}>{review.name}</h2>

        {review.avatarUrl && (
          <div className="flex mx-auto h-[10rem] w-[10rem]">
            <img
              src={review.avatarUrl}
              alt="avatar"
              className="rounded-full object-cover object-center border border-gray-500"
            />
          </div>
        )}

        <div className="flex justify-center">
          {starsArray.map((number) =>
            review.stars >= number ? <AiFillStar /> : <AiOutlineStar />
          )}
        </div>
      </div>

      {/* блок с отзывом */}
      <div className={`flex flex-col flex-wrap gap-3 sm:w-[70%] w-full`}>
        <div className={`mt-3 flex max-h-[25rem] `}>
          {review.photoUrl && (
            <img
              src={review.photoUrl}
              alt="photo"
              className="object-contain object-left"
            />
          )}
        </div>

        {/* абзацы */}
        {detailed ? (
          review.text.map((item, index) => (
            <p key={index} className="font-p px-3 my-0">
              {item}
            </p>
          ))
        ) : (
          <p className="font-p px-3 my-0">{review.text[0]}</p>
        )}

        {review.paragraph && detailed && (
          <p className="font-p px-3 my-0">{review.paragraph}</p>
        )}

        {review.text.length > 1 && (
          <div className="flex">
            <button
              className={`text-cyan-500 hover:text-white ml-3`}
              onClick={() => setDetailed((prev) => !prev)}
            >
              {detailed ? "Свернуть..." : "Подробнее..."}
            </button>
          </div>
        )}

        <div
          className={`flex flex-wrap gap-3 mt-10 ${
            createPage ? "justify-end" : "sm:justify-between justify-end"
          }`}
        >
          {!createPage && (
            <div className="flex flex-wrap gap-3 items-center mx-auto sm:mx-0">
              <span>Был ли отзыв полезен?</span>
              <span
                className={`border-cyan-500 cursor-pointer ${
                  useful === 1
                    ? "text-cyan-500 border-b"
                    : "hover:text-cyan-500 hover:border-b"
                }  `}
                onClick={() => {
                  setUseful(1);
                  setRated(true);
                }}
              >
                Да
              </span>
              <span
                className={`border-cyan-500 cursor-pointer ${
                  useful === 2
                    ? "text-cyan-500 border-b"
                    : "hover:text-cyan-500 hover:border-b"
                }  `}
                onClick={() => {
                  setUseful(2);
                  setRated(true);
                }}
              >
                Нет
              </span>
            </div>
          )}

          <Moment
            className="m-2"
            date={review.createdAt}
            format="D. M. YYYY г."
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
