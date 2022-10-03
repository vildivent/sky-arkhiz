/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview, setChecked } from "../redux/features/review/reviewSlice";
import { ActionButton, CancelButton } from "./Buttons";
import ModalYesNo from "./ModalYesNo";
import ReviewItem from "./ReviewItem";

const ReviewItemDashboard = ({ review }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    try {
      setModalIsOpen(false);
      dispatch(deleteReview({ id: review._id }));
      console.log("Отзыв удалён!");
    } catch (error) {
      console.error(error);
    }
  };

  const setCheckedHandler = () => {
    try {
      dispatch(setChecked({ id: review._id }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-center flex-wrap gap-3 mt-5">
          <ActionButton onClick={setCheckedHandler}>
            {review.checked ? "На проверку" : "Подтвердить"}
          </ActionButton>

          <CancelButton onClick={() => setModalIsOpen(true)}>
            Удалить отзыв
          </CancelButton>

          <ModalYesNo
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            yesClick={deleteHandler}
            noCkick={() => setModalIsOpen(false)}
          >
            <h1>Вы действительно хотите удалить этот отзыв?</h1>
          </ModalYesNo>
        </div>
        <div>
          <div>{`Полезным посчитали: ${review.usefullRaiting}`}</div>
          <div>{`Бесполезным посчитали: ${review.uselessRaiting}`}</div>
        </div>
      </div>
      <ReviewItem review={review} createPage={true} />
    </>
  );
};

export default ReviewItemDashboard;
