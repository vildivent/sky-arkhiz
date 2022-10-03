import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { loadingGif } from "../../public/assets";
import { getRequestsWithStatus } from "../../redux/features/request/requestSlice";
import { getUncheckedReviews } from "../../redux/features/review/reviewSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const reviewsState = useSelector((state) => state.review);
  const { reviews } = reviewsState;
  const requestsState = useSelector((state) => state.request);
  const { requests } = requestsState;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUncheckedReviews());
    dispatch(getRequestsWithStatus({ status: "new" }));
    setLoading(false);
  }, [dispatch]);

  return (
    <DashboardLayout title={"Панель управления"}>
      {reviewsState.loading || requestsState.loading || loading ? (
        <div className="flex justify-center w-full mt-5">
          <Image src={loadingGif} alt="loading" width={40} height={40} />
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap items-center gap-5 sm:justify-around justify-start">
          <Link href={"/dashboard/reviews"}>
            <a>
              <ActionButton>{`Отзывов ожидают проверку (${
                reviews.length > 0 && reviews.length
              })`}</ActionButton>
            </a>
          </Link>
          <Link href={"/dashboard/requests"}>
            <a>
              <ActionButton
                title={`Новых заявок (${
                  requests.length > 0 && requests.length
                })`}
              />
            </a>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
