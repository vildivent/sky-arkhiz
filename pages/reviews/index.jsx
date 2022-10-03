import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import Loading from "../../components/Loading";
import ReviewItem from "../../components/ReviewItem";
import { MainLayout } from "../../layouts/MainLayout";
import { getCheckedReviews } from "../../redux/features/review/reviewSlice";

export default function Reviews() {
  const dispatch = useDispatch();

  const { reviews, loading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getCheckedReviews());
  }, [dispatch]);

  return (
    <MainLayout title={"Отзывы"} mainProps={"px-2"}>
      <div className={"flex justify-center mt-3"}>
        <Link href="/reviews/create">
          <a>
            <ActionButton>Оставить отзыв</ActionButton>
          </a>
        </Link>
      </div>

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <Loading array={reviews} loading={loading} alt="Отзывов нет" />
        {reviews &&
          reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
      </div>
    </MainLayout>
  );
}
