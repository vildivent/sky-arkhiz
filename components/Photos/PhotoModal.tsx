/* eslint-disable @next/next/no-img-element */
import React from "react";
import Modal from "../Modal";
import type { IPhoto } from "../../models/Photo";
import { AiFillEye } from "react-icons/ai";
import Moment from "react-moment";

const PhotoModal = ({ photo, detailed, clickHandler }: PhotoModalProps) => {
  return (
    <Modal isOpen={detailed} setIsOpen={clickHandler} padding={false}>
      <div className="flex flex-col justify-between w-[100vw] h-[100vh]">
        <h2 className="font-h1 text-[7vh] text-center">{photo.title}</h2>
        <div
          className="flex justify-center cursor-pointer relative select-none h-full max-h-[85vh] w-full"
          onClick={clickHandler}
        >
          <img
            src={photo.imgUrl}
            alt={photo.title}
            className={`object-contain`}
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
