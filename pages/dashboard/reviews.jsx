import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";

import ReviewItemDashboard from "../../components/ReviewItemDashboard";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { loadingGif } from "../../public/assets";
import {
  getAllReviews,
  getUncheckedReviews,
} from "../../redux/features/review/reviewSlice";

export default function Reviews() {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    dispatch(getUncheckedReviews());
  }, [dispatch]);

  return (
    <DashboardLayout title={"Отзывы"} mainProps={"px-2"}>
      <div className={`flex flex-wrap gap-3 justify-center mt-5`}>
        <ActionButton
          onClick={() => {
            dispatch(getUncheckedReviews());
            setFilter("pending");
          }}
          disabled={filter === "pending"}
        >
          Ожидают проверку
        </ActionButton>
        <ActionButton
          onClick={() => {
            dispatch(getAllReviews());
            setFilter("all");
          }}
          disabled={filter === "all"}
        >
          Все
        </ActionButton>
      </div>

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {!reviews.length && (
          <>
            {loading ? (
              <Image src={loadingGif} alt="loading" width={40} height={40} />
            ) : (
              <span>Отзывов нет</span>
            )}
          </>
        )}
        {reviews &&
          reviews.map((review) => (
            <ReviewItemDashboard key={review._id} review={review} />
          ))}
      </div>
    </DashboardLayout>
  );
}
