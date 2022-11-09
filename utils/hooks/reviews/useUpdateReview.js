import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../../redux/features/review/reviewSlice";

const useUpdateReview = (review, createPage) => {
  const dispatch = useDispatch();

  const [view, setView] = useState(false);
  const [detailed, setDetailed] = useState(createPage || false);

  const [rated, setRated] = useState(false);
  const [useful, setUseful] = useState();

  const clickMoreHandler = () => {
    setDetailed((prev) => !prev);
    if (!view) dispatch(updateReview({ id: review._id, views: true }));
    setView(true);
  };

  const clickUpvoteHandler = () => {
    setUseful(1);
    let update = { id: review._id, upvotes: true };
    if (!view) update = { ...update, views: true };
    if (!rated) dispatch(updateReview(update));
    setRated(true);
    setView(true);
  };

  const clickDownvoteHandler = () => {
    setUseful(2);
    let update = { id: review._id, downvotes: true };
    if (!view) update = { ...update, views: true };
    if (!rated) dispatch(updateReview(update));
    setRated(true);
    setView(true);
  };
  return {
    detailed,
    useful,
    clickMoreHandler,
    clickUpvoteHandler,
    clickDownvoteHandler,
  };
};

export default useUpdateReview;
