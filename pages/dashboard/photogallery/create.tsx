/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import type { MouseEventHandler } from "react";
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
} from "../../../redux/features/newPhotoForm/newPhotoFormSlice";
import { categories } from "../../../constasnts";
import Label from "../../../components/Label";
import useImgPreview from "../../../utils/hooks/useImgPreview";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdError } from "react-icons/md";
import type { AxiosResponse, AxiosError } from "axios";
import translit from "../../../utils/translit";

const fileAPI = process.env.NEXT_PUBLIC_FILE_API_URL;

const inputStyle =
  "bg-[#1e1e1e] w-full text-gray-200 border border-sky-500 py-1 px-4 outline-none placeholder:text-gray-400 rounded-md";

const CreatePhoto = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const tilteInput = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const preview = useImgPreview(file);
  const [error, setError] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const { title, imgUrl, category } = useAppSelector(
    (state) => state.newPhotoForm
  );
  const [wrongFormatTitle, setWrongFormatTitle] = useState(false);
  const [wrongFormatImgUrl, setWrongFormatImgUrl] = useState(false);
  const [wrongFormatCategory, setWrongFormatCategory] = useState(false);
  const [wrongFormatDescription, setWrongFormatDescription] = useState(false);

  const uploadFile = async (file: File) => {
    if (!file) {
      setError("Выберите файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", translit(file.name));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    interface IAPIResponse {
      status: string;
      message: string;
      filenames?: string[];
    }
    try {
      const res: AxiosResponse<IAPIResponse> = await axios.post(
        fileAPI + "upload/skyarhyz",
        formData,
        config
      );
      dispatch(setImgUrl(`${fileAPI}skyarhyz/${res.data.filenames[0]}`));
      setUploadMessage("Файл загружен");
      return;
    } catch (error) {
      const err = error as Error | AxiosError<IAPIResponse>;
      if (axios.isAxiosError(err)) {
        if (err.response.status < 500 && err.code === "ERR_NETWORK") {
          console.error("Файл превосходит 5 MБ!");
          setError("Файл превосходит 5 MБ!");
          return;
        }
        console.error((err.response?.data as IAPIResponse)?.message);
        setError((err.response?.data as IAPIResponse)?.message);
        return;
      } else {
        console.error(err);
      }
    }
  };

  const submitHandler = () => {
    if (!title) {
      setWrongFormatTitle(true);
      setWrongFormatDescription(true);
    }
    if (!imgUrl) {
      setWrongFormatImgUrl(true);
      setWrongFormatDescription(true);
    }
    if (!category) {
      setWrongFormatCategory(true);
      setWrongFormatDescription(true);
    }
    if (title && imgUrl && category) {
      const data = {
        title,
        imgUrl,
        category,
      };

      dispatch(createPhoto(data));
      dispatch(reset());

      router.push("/dashboard/photogallery");
    }
  };

  useEffect(() => {
    if (title) setWrongFormatTitle(false);
  }, [title]);

  useEffect(() => {
    if (imgUrl) setWrongFormatImgUrl(false);
  }, [imgUrl]);

  useEffect(() => {
    if (category) setWrongFormatCategory(false);
  }, [category]);

  useEffect(() => {
    if (title && imgUrl && category) setWrongFormatDescription(false);
  }, [title, imgUrl, category]);

  const resetHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    setFile(null);
    setError("");
    setWrongFormatTitle(false);
    setWrongFormatImgUrl(false);
    setWrongFormatCategory(false);
    setWrongFormatDescription(false);
  };

  const cancelHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(reset());
    router.push("/dashboard/photogallery");
  };

  return (
    <DashboardLayout title="Добавить фото">
      <div className="mx-auto">
        <form
          id="formAddNewPhoto"
          className="sm:w-1/2 w-full mx-auto py-10 flex flex-col justify-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          {/*заголовок*/}
          <div className="flex flex-col gap-1">
            <Label htmlFor="title" wrongFormat={wrongFormatTitle}>
              * Заголовок фото:
            </Label>
            <input
              id="title"
              type="text"
              name="title"
              ref={tilteInput}
              placeholder="Заголовок"
              onChange={(e) => dispatch(setTitle(e.target.value))}
              className={inputStyle}
            />
          </div>

          {/*изображение*/}
          <div className="flex flex-col gap-1">
            <Label wrongFormat={wrongFormatImgUrl}>
              * Изображение в формате jpg / jpeg / png / webp, размером не
              больше 5 MБ:
            </Label>
            <div className="flex gap-3">
              <ActionButton onClick={(e) => hiddenFileInput.current.click()}>
                {file ? file.name : "Выберите файл..."}
              </ActionButton>
              <input
                id="imgUrl"
                type="file"
                name="imgUrl"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setError("");
                  setUploadMessage("");
                  if (e.target.files[0]) {
                    tilteInput.current.value =
                      e.target.files[0].name.split(".")[0];
                    setTitle(e.target.files[0].name.split(".")[0]);
                  }
                }}
                className="hidden"
              />
              <ActionButton
                className="p-2 text-xl rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  uploadFile(file);
                }}
              >
                <FaUpload />
              </ActionButton>
            </div>
            {uploadMessage && (
              <div className="flex gap-3 items-center">
                <span>{uploadMessage}</span>
                <GiConfirmed className="text-xl text-green-600" />
              </div>
            )}
            {error && (
              <div className="relative">
                <MdError className="text-xl text-red-600 absolute top-[2px] left-0" />
                <span className="ml-7">{error}</span>
              </div>
            )}
          </div>

          {/*Категория*/}
          <Label htmlFor="category" wrongFormat={wrongFormatCategory}>
            * Категория:
          </Label>
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

          <Label wrongFormat={wrongFormatDescription}>
            *отмечены поля, обязательные к заполнению
          </Label>

          <div className="grid grid-cols-2 gap-2 flex-wrap items-center justify-center mt-4">
            <ActionButton onClick={submitHandler}>Подтвердить</ActionButton>
            <ResetButton onClick={resetHandler}>Сбросить поля</ResetButton>
            <CancelButton onClick={cancelHandler}>Отменить</CancelButton>
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center gap-5">
        {!fileAPI && imgUrl && <img src={imgUrl} alt="preview" />}
        {fileAPI && file && <img src={preview} alt={file.name} />}
      </div>
    </DashboardLayout>
  );
};
export default CreatePhoto;
