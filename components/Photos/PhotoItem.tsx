/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IPhoto } from "../../models/Photo";
import { deletePhoto } from "../../redux/features/photo/photoSlice";
import useUpdatePhotoViews from "../../utils/hooks/photos/useUpdatePhotoViews";
import { useAppDispatch } from "../../utils/hooks/redux";
import ModalYesNo from "../ModalYesNo";
import PhotoModal from "./PhotoModal";

const PhotoItem = forwardRef<HTMLDivElement, PhotoItemProps>(function PhotoItem(
  { photo },
  ref
) {
  const [hovered, setHovered] = useState(false);
  const { detailed, clickHandler } = useUpdatePhotoViews(photo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    setModalIsOpen(false);
    dispatch(deletePhoto({ id: photo._id }));
  };

  return (
    <div ref={ref}>
      <PhotoModal
        photo={photo}
        detailed={detailed}
        clickHandler={clickHandler}
      />

      <div
        className="flex justify-center border border-gray-600 rounded-md relative cursor-pointer bg-[#1e1e1e] min-h-[50px]"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {router.pathname.includes("dashboard") && (
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
              <h1>Вы действительно хотите удалить это фото?</h1>
            </ModalYesNo>
          </div>
        )}
        <div
          className={`flex justify-center items-center w-full bg-[#1e1e1e] opacity-75 absolute z-[1] rounded-t-md ${
            hovered ? "transition-all duration-[250ms] h-auto" : "h-0"
          }`}
          onClick={clickHandler}
        >
          <h2
            className={`font-h2 sm:text-xl text-md ${
              hovered ? "opacity-100 h-full" : "opacity-0 h-0"
            }`}
          >
            {photo.title}
          </h2>
        </div>
        <div onClick={clickHandler}>
          {photo.imgUrl && (
            <img
              src={photo.imgUrl}
              alt={photo.title}
              className={`rounded-md`}
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default PhotoItem;

export type PhotoItemProps = {
  photo: IPhoto;
};
