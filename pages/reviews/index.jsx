import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "../../components/Buttons";
import ReviewItem from "../../components/ReviewItem";
import { MainLayout } from "../../layouts/MainLayout";
import { loadingGif } from "../../public/assets";
import useReviewFetch from "../../utils/hooks/useReviewFetch";

export default function Reviews() {
  const { reviews, loading, lastElementRef } = useReviewFetch({
    checked: true,
  });

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
        {reviews.length > 0 &&
          reviews.map((review, index) => {
            if (reviews.length === index + 1)
              return (
                <ReviewItem
                  ref={lastElementRef}
                  key={review._id + index}
                  review={review}
                />
              );
            else return <ReviewItem key={review._id + index} review={review} />;
          })}

        {loading && (
          <Image src={loadingGif} alt="loading" width={40} height={40} />
        )}
        {reviews.length === 0 && !loading && <span>Отзывы не найдены</span>}
      </div>
    </MainLayout>
  );
}
