import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import type { IPhoto } from "../../models/Photo";
import { AiFillEye } from "react-icons/ai";
import Moment from "react-moment";
import useDimentions from "../../utils/hooks/useDimetions";

const PhotoModal = ({ photo, detailed, clickHandler }: PhotoModalProps) => {
  const dimentions = useDimentions();

  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const multiplier = 0.95;
      setImgWidth(dimentions.windowDimentions.width * multiplier);
      setImgHeight(
        (dimentions.windowDimentions.width * multiplier) / photo.aspectRatio
      );
    }, 100);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [dimentions.windowDimentions.width, photo.aspectRatio]);
  return (
    <Modal isOpen={detailed} setIsOpen={clickHandler} padding={false}>
      <div className="flex flex-col justify-between">
        <h2 className="font-h1 sm:text-5xl text-2xl text-center m-2">
          {photo.title}
        </h2>
        <div className="flex justify-center cursor-pointer relative select-none h-full max-h-[85vh] w-full">
          <Image
            src={photo.imgUrl}
            alt={photo.title}
            onClick={clickHandler}
            quality={100}
            placeholder="empty"
            objectFit="contain"
            width={imgWidth || 100}
            height={imgHeight || 100}
          />
        </div>
        <div className="flex flex-wrap gap-5 sm:justify-end justify-around text-[2vh]">
          <div className="flex flex-wrap gap-1 items-center">
            <AiFillEye />
            <span>{photo.views}</span>
          </div>
          <Moment
            className="mx-2"
            date={photo.createdAt}
            format="DD.MM.YYYY HH:mm"
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhotoModal;

type PhotoModalProps = {
  photo: IPhoto;
  detailed: boolean;
  clickHandler: () => void;
};
