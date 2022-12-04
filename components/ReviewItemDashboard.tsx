/* eslint-disable @next/next/no-img-element */

import { forwardRef } from "react";
import { useState } from "react";
import { IReview } from "../models/Review";
import {
  deleteReview,
  updateReview,
} from "../redux/features/review/reviewSlice";
import { useAppDispatch } from "../utils/hooks/redux";
import { ActionButton, CancelButton } from "./Buttons";
import ModalYesNo from "./ModalYesNo";
import ReviewItem from "./ReviewItem";

export type ReviewItemProps = {
  review: IReview;
};

const ReviewItemDashboard = forwardRef<HTMLDivElement, ReviewItemProps>(
  function ReviewItemDashboard({ review }, ref) {
    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const deleteHandler = () => {
      setModalIsOpen(false);
      dispatch(deleteReview({ id: review._id }));
      console.log("Отзыв удалён!");
    };

    const setCheckedHandler = () => {
      dispatch(updateReview({ id: review._id, checked: "inv" }));
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
            <div>{`Лайков: ${review.upvotes}`}</div>
            <div>{`Дизлайков: ${review.downvotes}`}</div>
          </div>
        </div>
        <ReviewItem ref={ref} review={review} createPage={true} />
      </>
    );
  }
);

export default ReviewItemDashboard;
