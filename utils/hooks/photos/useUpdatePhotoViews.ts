import { useState } from "react";
import { updateViews } from "../../../redux/features/photo/photoSlice";
import { useAppDispatch } from "../redux";
import type { IPhoto } from "../../../models/Photo";

const useUpdatePhoto = (photo: IPhoto, preview = false) => {
  const dispatch = useAppDispatch();

  const [detailed, setDetailed] = useState(preview);
  const [view, setView] = useState(false);

  const clickHandler = () => {
    setDetailed((prev) => !prev);
    if (!view && !preview) {
      dispatch(updateViews({ id: photo._id }));
      setView(true);
    }
  };
  return { detailed, clickHandler };
};

export default useUpdatePhoto;
