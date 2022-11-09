/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../components/Buttons";
import Label from "../../components/Label";
import { InputName } from "../../components/Inputs";
import { MainLayout } from "../../components/layouts/MainLayout";
import { createReview } from "../../redux/features/review/reviewSlice";
import {
  setName,
  setAvatarUrl,
  setPhotoUrl,
  setParagraph,
  pushParagraph,
  setStars,
  reset,
} from "../../redux/features/newReviewForm/newReviewFormSlice";
import ReviewItem from "../../components/ReviewItem";

export default function CreateReview() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { name, avatarUrl, photoUrl, stars, paragraph, text } = useSelector(
    (state) => state.newReviewForm
  );
  const starArray = [1, 2, 3, 4, 5];

  const [wrongFormat, setWrongFormat] = useState(false);

  const submitHandler = () => {
    if (name && (text[0] || paragraph) && stars > 0) {
      const data = {
        name,
        text: [...text],
        avatarUrl,
        photoUrl,
        stars,
      };
      if (paragraph) {
        data.text = [...text, paragraph];
      }
      try {
        console.log("Загрузка...");
        dispatch(createReview(data));
        console.log("Отзыв добавлен и находится на проверке");

        router.push("/reviews/success");
      } catch (error) {
        console.log(error);
      }
    } else {
      setWrongFormat(true);
    }
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (name && (text[0] || paragraph) && stars > 0) setWrongFormat(false);
  }, [name, text, paragraph, stars]);

  const cancelHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/reviews");
  };

  return (
    <MainLayout title={"Добавить отзыв"}>
      <>
        <div className={`mx-auto`}>
          <form
            id="formAddNewReview"
            className={`sm:w-1/2 w-full mx-auto py-10`}
            onSubmit={(e) => e.preventDefault()}
          >
            {/*имя пользователя*/}
            <Label wrongFormat={wrongFormat && !name}>
              * Ваше имя:
              <InputName
                value={name}
                onChange={(e) => {
                  dispatch(setName(e.target.value));
                }}
                className={`mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm`}
              />
            </Label>

            {/*изображение аватара*/}
            <Label>
              URL Вашего фото (аватара):
              <input
                type="text"
                name="avatarUrl"
                placeholder="https://"
                value={avatarUrl}
                onChange={(e) => dispatch(setAvatarUrl(e.target.value))}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
              />
            </Label>
            {/*изображение*/}
            <Label>
              URL фото с места события:
              <input
                type="text"
                name="photoUrl"
                placeholder="https://"
                value={photoUrl}
                onChange={(e) => dispatch(setPhotoUrl(e.target.value))}
                className="mt-1 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm"
              />
            </Label>

            {/*Текст*/}
            <Label wrongFormat={wrongFormat && !(text.length || paragraph)}>
              * Отзыв:
              <textarea
                value={paragraph}
                name="text"
                onChange={(e) => {
                  dispatch(setParagraph(e.target.value));
                }}
                placeholder="Напишите отзыв здесь"
                className={`mt-1 resize-none h-40 text-black w-full bg-gray-200 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 rounded-sm`}
              />
            </Label>

            {/* рейтинг */}
            <ol className="flex justify-start flex-wrap gap-3 items-center text-xl">
              <span
                className={`text-xs text-white opacity-70 ${
                  wrongFormat && !stars ? "text-red-500" : ""
                }`}
              >
                * Ваша оценка:
              </span>
              {starArray.map((number) => (
                <li
                  key={number}
                  onClick={() => dispatch(setStars(number))}
                  className={`cursor-pointer p-1`}
                >
                  {stars >= number ? <AiFillStar /> : <AiOutlineStar />}
                </li>
              ))}
            </ol>
            <div
              className={`mt-2 ${
                wrongFormat ? "text-red-500" : "text-gray-300"
              } font-p italic text-sm `}
            >
              *отмечены поля, обязательные к заполнению
            </div>

            <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
              <ActionButton onClick={() => submitHandler()}>
                Подтвердить
              </ActionButton>
              <ResetButton
                onClick={(e) => {
                  e.preventDefault();
                  paragraph && dispatch(pushParagraph());
                }}
              >
                Добавить абзац
              </ResetButton>
              <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
              <ResetButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(reset());
                  setWrongFormat(false);
                }}
              >
                Сбросить поля
              </ResetButton>
            </div>
          </form>
        </div>
        <div>
          <ReviewItem
            review={{
              name,
              avatarUrl,
              photoUrl,
              stars,
              paragraph,
              text,
              createdAt: Date.now(),
            }}
            createPage={true}
          />
        </div>
      </>
    </MainLayout>
  );
}
