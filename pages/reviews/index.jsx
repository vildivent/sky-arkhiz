import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionButton } from "../../components/Buttons";
import ReviewItem from "../../components/ReviewItem";
import { MainLayout } from "../../layouts/MainLayout";
import { loadingGif } from "../../public/assets";
import {
  getAllReviews,
  getCheckedReviews,
} from "../../redux/features/review/reviewSlice";

export default function Reviews() {
  const dispatch = useDispatch();

  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getCheckedReviews());
  }, [dispatch]);

  return (
    <MainLayout title={"Отзывы"} mainProps={"px-2"}>
      <div className={"flex justify-center mt-3"}>
        <Link href="/reviews/create">
          <a>
            <ActionButton title={"Оставить отзыв"} />
          </a>
        </Link>
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
            <ReviewItem key={review._id} review={review} />
          ))}
      </div>
    </MainLayout>
  );
}
