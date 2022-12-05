/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useReducer } from "react";
import type { MouseEventHandler, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { createReview } from "../../redux/features/review/reviewSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../components/Buttons";
import { MainLayout } from "../../components/layouts/MainLayout";
import Label from "../../components/Label";
import { InputName } from "../../components/Inputs";
import {
  setName,
  setAvatar,
  setPhoto,
  setParagraph,
  pushParagraph,
  setStars,
  reset,
} from "../../redux/features/newReviewForm/newReviewFormSlice";
import ReviewItem from "../../components/ReviewItem";
import useImgPreview from "../../utils/hooks/useImgPreview";
import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import translit from "../../utils/translit";
import Image from "next/image";
import { loadingGif } from "../../public/assets";
import { MdError } from "react-icons/md";
import type { IReview } from "../../models/Review";

const fileAPI = process.env.NEXT_PUBLIC_FILE_API_URL;

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

type wrongFormatState = {
  name: string;
  text: string;
  stars: string;
  avatar?: string;
  photo?: string;
};

const initialState: wrongFormatState = {
  name: "",
  text: "",
  stars: "",
  avatar: "",
  photo: "",
};

enum ActionKind {
  setNameError = "setNameError",
  setTextError = "setTextError",
  setStarsError = "setStarsError",
  setAvatarError = "setAvatarError",
  setPhotoError = "setPhotoError",
  resetError = "resetError",
}

type Action = {
  type: ActionKind;
  payload?: string;
};

const wrongFormat = (state: wrongFormatState, action: Action) => {
  switch (action.type) {
    case ActionKind.setNameError:
      return { ...state, name: action.payload };
    case ActionKind.setTextError:
      return { ...state, text: action.payload };
    case ActionKind.setStarsError:
      return { ...state, stars: action.payload };
    case ActionKind.setAvatarError:
      return { ...state, avatar: action.payload };
    case ActionKind.setPhotoError:
      return { ...state, photo: action.payload };
    case ActionKind.resetError:
      return initialState;
    default:
      throw new Error();
  }
};

const CreateReview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const hiddenAvatarInput = useRef<HTMLInputElement>(null);
  const hiddenPhotoInput = useRef<HTMLInputElement>(null);

  const [wrongFormatState, dispatchFormat] = useReducer(
    wrongFormat,
    initialState
  );

  const [avatarFile, setAvatarFile] = useState<File>();
  const [photoFile, setPhotoFile] = useState<File>();

  const previewAvatar = useImgPreview(avatarFile);
  const previewPhoto = useImgPreview(photoFile);

  const [loading, setLoading] = useState(false);

  const {
    name,
    avatarUrl,
    avatarAspectRatio,
    photoAspectRatio,
    photoUrl,
    stars,
    paragraph,
    text,
  } = useAppSelector((state) => state.newReviewForm);

  const { error } = useAppSelector((state) => state.review);

  const starArray = [1, 2, 3, 4, 5];

  const uploadFile = async (
    file: File,
    setError:
      | typeof ActionKind.setAvatarError
      | typeof ActionKind.setPhotoError,
    setImg: typeof setAvatar | typeof setPhoto
  ) => {
    const formData = new FormData();
    formData.append(translit(file.name), file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    interface IAPIResponse {
      status: string;
      message: string;
      filenames?: string[];
      aspectRatio?: number[];
    }
    try {
      const res: AxiosResponse<IAPIResponse> = await axios.post(
        fileAPI + "upload/skyarhyz",
        formData,
        config
      );
      dispatch(
        setImg({
          imgUrl: `${fileAPI}skyarhyz/${res.data.filenames[0]}`,
          imgAspectRatio: res.data.aspectRatio[0],
        })
      );

      dispatchFormat({ type: setError, payload: "" });
      console.log("Файл загружен!");
      return {
        error: "",
        imgUrl: `${fileAPI}skyarhyz/${res.data.filenames[0]}`,
        aspectRatio: res.data.aspectRatio[0],
      };
    } catch (error) {
      const err = error as Error | AxiosError<IAPIResponse>;
      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          const errorMessage =
            "Ошибка загрузки! Возможно размер файла превышает 5 MБ.";
          console.error(errorMessage);
          dispatchFormat({
            type: setError,
            payload: errorMessage,
          });
          return {
            error: errorMessage,
            imgUrl: "",
            aspectRatio: 0,
          };
        }
        const errorMessage = (err.response?.data as IAPIResponse)?.message;
        console.error(errorMessage);
        dispatchFormat({
          type: setError,
          payload: errorMessage,
        });
        return {
          error: errorMessage,
          imgUrl: "",
          aspectRatio: 0,
        };
      } else {
        const errorMessage = "Неизвестная ошибка!";
        console.error(err);
        dispatchFormat({
          type: setError,
          payload: errorMessage,
        });
        return {
          error: errorMessage,
          imgUrl: "",
          aspectRatio: 0,
        };
      }
    }
  };

  const submitHandler = async () => {
    let uploadAvatarData = {
      error: "",
      imgUrl: "",
      aspectRatio: 0,
    };
    let uploadPhotoData = {
      error: "",
      imgUrl: "",
      aspectRatio: 0,
    };

    if (!name) {
      dispatchFormat({
        type: ActionKind.setNameError,
        payload: "Введите своё имя",
      });
    }
    if (!stars) {
      dispatchFormat({
        type: ActionKind.setStarsError,
        payload: "Укажите Вашу оценку",
      });
    }
    if (!(text[0] || paragraph)) {
      dispatchFormat({
        type: ActionKind.setTextError,
        payload: "Напишите текст отзыва",
      });
    }
    if (avatarFile && !avatarUrl) {
      const response = await uploadFile(
        avatarFile,
        ActionKind.setAvatarError,
        setAvatar
      );
      uploadAvatarData = { ...response };
    }
    if (photoFile && !photoUrl) {
      const response = await uploadFile(
        photoFile,
        ActionKind.setPhotoError,
        setPhoto
      );
      uploadPhotoData = { ...response };
    }

    if (
      name &&
      (text[0] || paragraph) &&
      stars &&
      !uploadAvatarData.error &&
      !uploadPhotoData.error
    ) {
      const data = {
        name,
        text: [...text],
        stars,
        avatarUrl: avatarUrl || uploadAvatarData.imgUrl,
        avatarAspectRatio: avatarAspectRatio || uploadAvatarData.aspectRatio,
        photoUrl: photoUrl || uploadPhotoData.imgUrl,
        photoAspectRatio: photoAspectRatio || uploadPhotoData.aspectRatio,
      };
      if (paragraph) data.text = [...text, paragraph];

      dispatch(createReview(data));

      if (!error) {
        dispatch(reset());
        console.log("Отзыв добавлен и находится на проверке");
        router.push("/reviews/success");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (name) dispatchFormat({ type: ActionKind.setNameError, payload: "" });
  }, [name]);

  useEffect(() => {
    if (paragraph)
      dispatchFormat({ type: ActionKind.setTextError, payload: "" });
  }, [paragraph]);

  useEffect(() => {
    if (stars) dispatchFormat({ type: ActionKind.setStarsError, payload: "" });
  }, [stars]);

  const changeAvatarFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarFile(e.target.files[0]);
    dispatch(setAvatar({ imgUrl: "", imgAspectRatio: 0 }));
    dispatchFormat({ type: ActionKind.setAvatarError, payload: "" });
  };

  const changePhotoFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoFile(e.target.files[0]);
    dispatch(setPhoto({ imgUrl: "", imgAspectRatio: 0 }));
    dispatchFormat({ type: ActionKind.setPhotoError, payload: "" });
  };

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatchFormat({ type: ActionKind.resetError });
    setAvatarFile(null);
    setPhotoFile(null);

    hiddenAvatarInput.current.value = "";
    hiddenPhotoInput.current.value = "";
  };

  const cancelHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/reviews");
  };

  return (
    <MainLayout title="Добавить отзыв">
      <div className="mx-auto">
        <form
          id="formAddNewReview"
          className="sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*имя пользователя*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">* Ваше имя:</Label>
            <InputName
              id="name"
              value={name}
              onChange={(e) => {
                dispatch(setName(e.target.value));
              }}
              className={inputStyle}
            />
            {wrongFormatState.name && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.name}</span>
              </div>
            )}
          </div>

          {/* рейтинг */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="rating">* Ваша оценка:</Label>
            <ol
              id="rating"
              className="flex justify-start flex-wrap gap-3 items-center text-xl"
            >
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
            {wrongFormatState.stars && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.stars}</span>
              </div>
            )}
          </div>

          {/*Текст*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="text">* Отзыв:</Label>
            <textarea
              id="text"
              rows={6}
              value={paragraph}
              name="text"
              onChange={(e) => {
                dispatch(setParagraph(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  paragraph && dispatch(pushParagraph());
                }
              }}
              placeholder="Напишите отзыв здесь"
              className={`${inputStyle} resize-none`}
            />
            {wrongFormatState.text && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.text}</span>
              </div>
            )}
          </div>

          {/*изображение аватара*/}
          <div className="flex flex-col gap-3">
            <Label>Ваше фото/аватар:</Label>
            <div className="flex gap-3">
              <ActionButton onClick={() => hiddenAvatarInput.current.click()}>
                {avatarFile
                  ? avatarFile.name.slice(0, 24) +
                    (avatarFile.name.length > 25 ? "..." : "")
                  : "Выберите файл..."}
              </ActionButton>
              <input
                type="file"
                name="avatarUrl"
                accept="image/*"
                ref={hiddenAvatarInput}
                onChange={changeAvatarFileHandler}
                className="hidden"
              />
            </div>
            {wrongFormatState.avatar && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.avatar}</span>
              </div>
            )}
          </div>

          {/*изображение*/}
          <div className="flex flex-col gap-3">
            <Label>Фото с места события:</Label>
            <div className="flex gap-3">
              <ActionButton onClick={() => hiddenPhotoInput.current.click()}>
                {photoFile
                  ? photoFile.name.slice(0, 24) +
                    (photoFile.name.length > 25 ? "..." : "")
                  : "Выберите файл..."}
              </ActionButton>
              <input
                type="file"
                name="photoUrl"
                accept="image/*"
                ref={hiddenPhotoInput}
                onChange={changePhotoFileHandler}
                className="hidden"
              />
            </div>
            {wrongFormatState.photo && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.photo}</span>
              </div>
            )}
          </div>

          <div>
            изображения должны быть в формате jpg / jpeg / png / webp и размером
            не больше 5 MБ
          </div>

          <Label
            wrongFormat={
              !!(
                wrongFormatState.name ||
                wrongFormatState.stars ||
                wrongFormatState.text
              )
            }
          >
            *отмечены поля, обязательные к заполнению
          </Label>

          <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
            <ActionButton
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                submitHandler();
              }}
            >
              {loading ? (
                <Image src={loadingGif} alt="loading" width={20} height={20} />
              ) : (
                <span>Подтвердить</span>
              )}
            </ActionButton>
            <ResetButton
              onClick={(e) => {
                e.preventDefault();
                paragraph && dispatch(pushParagraph());
              }}
            >
              Новый абзац
            </ResetButton>
            <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
            <ResetButton onClick={resetHandler}>Сбросить поля</ResetButton>
          </div>
        </form>
      </div>
      <div>
        <ReviewItem
          review={
            {
              name,
              avatarUrl: previewAvatar,
              photoUrl: previewPhoto,
              stars,
              text: [...text, paragraph],
              createdAt: new Date("2022/1/1"),
            } as IReview
          }
          createPage={true}
        />
      </div>
    </MainLayout>
  );
};
export default CreateReview;
