import Image from "next/image";
import { useEffect } from "react";
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
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getUncheckedReviews());
  }, [dispatch]);

  return (
    <DashboardLayout title={"Отзывы"} mainProps={"px-2"}>
      <div className={`flex flex-wrap gap-3 justify-center mt-5`}>
        <ActionButton
          title={"Ожидают проверку"}
          onClick={() => dispatch(getUncheckedReviews())}
        />
        <ActionButton title={"Все"} onClick={() => dispatch(getAllReviews())} />
      </div>

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {!reviews.length && (
          <>
            <span>Отзывов нет, или они загружаются</span>
            <Image src={loadingGif} alt="loading" width={40} height={40} />
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
