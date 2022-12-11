import { useEffect, useState, useRef, useReducer } from "react";
import type { ChangeEvent, MouseEventHandler, MouseEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
  setAspectRatio,
} from "../../../redux/features/newPostForm/newPostFormSlice";
import { IPost } from "../../../models/Post";
import useImgPreview from "../../../utils/hooks/useImgPreview";
import translit from "../../../utils/translit";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import Label from "../../../components/Label";
import { MdError } from "react-icons/md";
import { loadingGif } from "../../../public/assets";

const fileAPI = process.env.NEXT_PUBLIC_FILE_API_URL;

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

type wrongFormatState = {
  title: string;
  imgUrl: string;
  text: string;
};

const initialState: wrongFormatState = {
  title: "",
  imgUrl: "",
  text: "",
};

enum ActionKind {
  setTitleError = "setTitleError",
  setImgUrlError = "setImgUrlError",
  setTextError = "setTextError",
  resetError = "resetError",
}

type Action = {
  type: ActionKind;
  payload?: string;
};

const wrongFormat = (state: wrongFormatState, action: Action) => {
  switch (action.type) {
    case ActionKind.setTitleError:
      return { ...state, title: action.payload };
    case ActionKind.setImgUrlError:
      return { ...state, imgUrl: action.payload };
    case ActionKind.setTextError:
      return { ...state, text: action.payload };
    case ActionKind.resetError:
      return initialState;
    default:
      throw new Error();
  }
};

const CreateNews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [wrongFormatState, dispatchFormat] = useReducer(
    wrongFormat,
    initialState
  );

  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const preview = useImgPreview(file);

  const { title, imgUrl, srcUrl, aspectRatio, paragraph, text } =
    useAppSelector((state) => state.newPostForm);
  const { error } = useAppSelector((state) => state.post);
  console.log(wrongFormatState);

  const uploadFile = async () => {
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

      dispatch(setImgUrl(`${fileAPI}skyarhyz/${res.data.filenames[0]}`));
      dispatch(setAspectRatio(res.data.aspectRatio[0]));
      dispatchFormat({ type: ActionKind.setImgUrlError, payload: "" });
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
            "Ошибка загрузки! Возможно размер файла превышает 10 MБ.";
          console.error(errorMessage);
          dispatchFormat({
            type: ActionKind.setImgUrlError,
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
          type: ActionKind.setImgUrlError,
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
          type: ActionKind.setImgUrlError,
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
    let uploadData = {
      error: "",
      imgUrl: "",
      aspectRatio: 0,
    };

    if (!title) {
      dispatchFormat({
        type: ActionKind.setTitleError,
        payload: "Введите заголовок",
      });
    }
    if (!(text[0] || paragraph)) {
      dispatchFormat({
        type: ActionKind.setTextError,
        payload: "Напишите текст новости",
      });
    }
    if (file && !imgUrl) {
      const response = await uploadFile();
      uploadData = { ...response };
    }
    if (title && (text[0] || paragraph) && !uploadData.error) {
      const data = {
        title,
        text: [...text],
        imgUrl: imgUrl || uploadData.imgUrl,
        aspectRatio: aspectRatio || uploadData.aspectRatio,
      };
      if (paragraph) data.text = [...text, paragraph];

      dispatch(createPost(data));

      if (!error) {
        dispatch(reset());
        console.log("Новость добавлена");
        router.push("/dashboard/news");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (title) dispatchFormat({ type: ActionKind.setTitleError, payload: "" });
  }, [title]);

  useEffect(() => {
    if (paragraph)
      dispatchFormat({ type: ActionKind.setTextError, payload: "" });
  }, [paragraph]);

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    dispatch(setImgUrl(""));
    dispatch(setAspectRatio(0));
    dispatchFormat({ type: ActionKind.setImgUrlError, payload: "" });
  };

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatchFormat({ type: ActionKind.resetError });
    setFile(null);

    hiddenFileInput.current.value = "";
  };

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
          className="sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*заголовок*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">* Заголовок новости:</Label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              placeholder="Заголовок"
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className={inputStyle}
            />
            {wrongFormatState.title && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.title}</span>
              </div>
            )}
          </div>

          {/*изображение*/}
          <div className="flex flex-col gap-3">
            <Label>
              * Изображение в формате jpg / jpeg / png / webp, размером не
              больше 10 MБ:
            </Label>
            <div className="flex gap-3">
              <ActionButton onClick={() => hiddenFileInput.current.click()}>
                {file
                  ? file.name.slice(0, 24) +
                    (file.name.length > 25 ? "..." : "")
                  : "Выберите файл..."}
              </ActionButton>
              <input
                id="imgUrl"
                type="file"
                name="imgUrl"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={changeFileHandler}
                className="hidden"
              />
            </div>
            {wrongFormatState.imgUrl && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.imgUrl}</span>
              </div>
            )}
          </div>

          {/*Текст*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="text">* Текст новости:</Label>
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
              placeholder="Напишите текст новости здесь"
              className={`${inputStyle} resize-none`}
            />
            {wrongFormatState.text && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.text}</span>
              </div>
            )}
          </div>

          {/*Ссылка на источник*/}
          <div className="flex flex-col gap-1">
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
          <Label
            wrongFormat={!!(wrongFormatState.title || wrongFormatState.text)}
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
        <PostItem
          post={
            {
              title,
              text: [...text, paragraph],
              imgUrl: preview,
              aspectRatio,
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
