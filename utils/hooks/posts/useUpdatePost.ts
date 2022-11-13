import { useState } from "react";
import { updateViews } from "../../../redux/features/post/postSlice";
import { useAppDispatch } from "../redux";
import type { IPost } from "../../../models/Post";

const useUpdatePost = (post: IPost, preview = false) => {
  const dispatch = useAppDispatch();

  const [detailed, setDetailed] = useState(preview);
  const [view, setView] = useState(false);

  const clickHandler = () => {
    setDetailed((prev) => !prev);
    if (!view && !preview) {
      dispatch(updateViews({ id: post._id }));
      setView(true);
    }
  };
  return { detailed, clickHandler };
};

export default useUpdatePost;
