import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateViews } from "../../../redux/features/post/postSlice";

const useUpdatePost = (post) => {
  const dispatch = useDispatch();

  const [detailed, setDetailed] = useState(false);
  const [view, setView] = useState(false);

  const clickHandler = () => {
    setDetailed((prev) => !prev);
    if (!view) dispatch(updateViews({ id: post._id }));
    setView(true);
  };
  return { detailed, clickHandler };
};

export default useUpdatePost;
