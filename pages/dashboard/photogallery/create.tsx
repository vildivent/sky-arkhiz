/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useReducer } from "react";
import type { MouseEventHandler, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks/redux";
import {
  ActionButton,
  ResetButton,
  CancelButton,
} from "../../../components/Buttons";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { createPhoto } from "../../../redux/features/photo/photoSlice";
import {
  setTitle,
  setImgUrl,
  setCategory,
  reset,
  setAspectRatio,
} from "../../../redux/features/newPhotoForm/newPhotoFormSlice";
import { categories } from "../../../constasnts";
import Label from "../../../components/Label";
import useImgPreview from "../../../utils/hooks/useImgPreview";
import axios from "axios";
import { MdError } from "react-icons/md";
import type { AxiosResponse, AxiosError } from "axios";
import translit from "../../../utils/translit";
import Image from "next/image";
import { loadingGif } from "../../../public/assets";

const fileAPI = process.env.NEXT_PUBLIC_FILE_API_URL;

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

type wrongFormatState = {
  title: string;
  imgUrl: string;
  category: string;
};

const initialState: wrongFormatState = {
  title: "",
  imgUrl: "",
  category: "",
};

enum ActionKind {
  setTitleError = "setTitleError",
  setImgUrlError = "setImgUrlError",
  setCategoryError = "setCategoryError",
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
    case ActionKind.setCategoryError:
      return { ...state, category: action.payload };
    case ActionKind.resetError:
      return initialState;
    default:
      throw new Error();
  }
};

const CreatePhoto = () => {
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

  const { title, imgUrl, aspectRatio, category } = useAppSelector(
    (state) => state.newPhotoForm
  );

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
            "Ошибка загрузки! Возможно размер файла превышает 5 MБ.";
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
    if (!category) {
      dispatchFormat({
        type: ActionKind.setCategoryError,
        payload: "Выберите категорию",
      });
    }
    if (!file) {
      dispatchFormat({
        type: ActionKind.setImgUrlError,
        payload: "Выберите файл",
      });
      uploadData.error = "Отсутствует файл";
    } else if (!imgUrl) {
      const response = await uploadFile();
      uploadData = { ...response };
    }

    if (title && (imgUrl || !uploadData.error) && category) {
      const data = {
        title,
        imgUrl: imgUrl || uploadData.imgUrl,
        aspectRatio: aspectRatio || uploadData.aspectRatio,
        category,
      };

      dispatch(createPhoto(data));
      dispatch(reset());

      router.push("/dashboard/photogallery");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (title) dispatchFormat({ type: ActionKind.setTitleError, payload: "" });
  }, [title]);

  useEffect(() => {
    if (category)
      dispatchFormat({ type: ActionKind.setCategoryError, payload: "" });
  }, [category]);

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    dispatchFormat({ type: ActionKind.resetError });
    setFile(null);

    hiddenFileInput.current.value = "";
  };

  const cancelHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/dashboard/photogallery");
  };

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    dispatch(setImgUrl(""));
    dispatch(setAspectRatio(0));
    dispatchFormat({ type: ActionKind.setImgUrlError, payload: "" });

    if (e.target.files[0] && !title) {
      dispatch(setTitle(e.target.files[0].name.split(".")[0]));
    }
  };

  return (
    <DashboardLayout title="Добавить фото">
      <div className="mx-auto">
        <form
          id="formAddNewPhoto"
          className="sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*заголовок*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">* Заголовок фото:</Label>
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
              больше 5 MБ:
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

          {/*Категория*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="category">* Категория:</Label>
            <div
              id="category"
              className="flex flex-col gap-3 justify-center items-start"
            >
              <ActionButton
                onClick={() => dispatch(setCategory(categories[1]))}
                disabled={categories[1] === category}
              >
                {categories[1]}
              </ActionButton>
              <ActionButton
                onClick={() => dispatch(setCategory(categories[2]))}
                disabled={categories[2] === category}
              >
                {categories[2]}
              </ActionButton>
              <ActionButton
                onClick={() => dispatch(setCategory(categories[3]))}
                disabled={categories[3] === category}
              >
                {categories[3]}
              </ActionButton>
            </div>
            {wrongFormatState.category && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{wrongFormatState.category}</span>
              </div>
            )}
          </div>

          <Label
            wrongFormat={
              !!(
                wrongFormatState.title ||
                wrongFormatState.imgUrl ||
                wrongFormatState.category
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
            <ResetButton onClick={resetHandler}>Сбросить поля</ResetButton>
            <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
          </div>
        </form>
      </div>

      <div className="flex justify-center">
        {fileAPI && file && <img src={preview} alt={file.name} />}
      </div>
    </DashboardLayout>
  );
};
export default CreatePhoto;
