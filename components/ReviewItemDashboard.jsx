/* eslint-disable @next/next/no-img-element */

import { useDispatch } from "react-redux";
import { deleteReview, setChecked } from "../redux/features/review/reviewSlice";
import { ActionButton, CancelButton } from "./Buttons";
import ReviewItem from "./ReviewItem";

const ReviewItemDashboard = ({ review }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    try {
      const id = review._id;
      dispatch(deleteReview({ id }));
      console.log("Post deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  const setCheckedHandler = () => {
    try {
      const id = review._id;
      dispatch(setChecked({ id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center flex-wrap gap-3 mt-5">
        <ActionButton
          title={review.checked ? "На проверку" : "Подтвердить"}
          onClick={setCheckedHandler}
        />

        <CancelButton title={`Удалить отзыв`} onClick={deleteHandler} />
      </div>
      <ReviewItem review={review} />
    </>
  );
};

export default ReviewItemDashboard;
