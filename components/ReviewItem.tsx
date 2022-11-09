/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */

import { forwardRef } from "react";
import Moment from "react-moment";
import { AiFillEye, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IReview } from "../models/Review";
import useUpdateReview from "../utils/hooks/reviews/useUpdateReview";

const ReviewItem = forwardRef<HTMLDivElement, ReviewItemProps>(
  ({ review, createPage = false }, ref) => {
    const {
      detailed,
      useful,
      clickMoreHandler,
      clickUpvoteHandler,
      clickDownvoteHandler,
    } = useUpdateReview(review, createPage);
    const starsArray = [1, 2, 3, 4, 5];

    return (
      <div
        ref={ref}
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
                className="rounded-full object-cover object-center border mx-auto border-gray-500"
              />
            </div>
          )}

          <div className="flex justify-center">
            {starsArray.map((number) =>
              review.stars >= number ? (
                <AiFillStar key={number} />
              ) : (
                <AiOutlineStar key={number} />
              )
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
                onClick={clickMoreHandler}
              >
                {detailed ? "Свернуть..." : "Подробнее..."}
              </button>
            </div>
          )}

          <div className={`flex flex-wrap gap-3 mt-10 justify-end`}>
            {!createPage && (
              <div className="flex flex-wrap gap-3 items-center mx-auto">
                <span>Был ли отзыв полезен?</span>
                <span
                  className={`border-cyan-500 cursor-pointer ${
                    useful === 1
                      ? "text-cyan-500 border-b"
                      : "hover:text-cyan-500 hover:border-b"
                  }  `}
                  onClick={clickUpvoteHandler}
                >
                  Да
                </span>
                <span
                  className={`border-cyan-500 cursor-pointer ${
                    useful === 2
                      ? "text-cyan-500 border-b"
                      : "hover:text-cyan-500 hover:border-b"
                  }  `}
                  onClick={clickDownvoteHandler}
                >
                  Нет
                </span>
              </div>
            )}

            <div className="flex gap-2">
              {!createPage && (
                <div className="flex flex-wrap gap-1 items-center">
                  <AiFillEye />
                  <span>{review.views}</span>
                </div>
              )}

              <Moment
                className="m-2"
                date={review.createdAt}
                format="DD.MM.YYYY HH:mm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ReviewItem;

type ReviewItemProps = {
  review: IReview & {
    paragraph?: string;
  };
  createPage?: boolean;
};
