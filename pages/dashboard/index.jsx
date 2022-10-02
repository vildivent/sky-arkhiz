import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { getRequestsWithStatus } from "../../redux/features/request/requestSlice";
import { getUncheckedReviews } from "../../redux/features/review/reviewSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);
  const { requests } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(getUncheckedReviews());
    dispatch(getRequestsWithStatus({ status: "new" }));
  }, [dispatch]);

  return (
    <DashboardLayout title={"Панель управления"}>
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
              title={`Новых заявок (${requests.length > 0 && requests.length})`}
            />
          </a>
        </Link>
      </div>
    </DashboardLayout>
  );
}
