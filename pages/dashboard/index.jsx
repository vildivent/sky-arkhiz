import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { getUncheckedReviews } from "../../redux/features/review/reviewSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getUncheckedReviews());
  }, [dispatch]);

  return (
    <DashboardLayout title={"Панель управления"}>
      <div className="mt-10">
        <Link href={"/dashboard/reviews"}>
          <a>
            <ActionButton
              title={`Отзывов ожидают проверку (${
                reviews.length > 0 && reviews.length
              })`}
            />
          </a>
        </Link>
      </div>
    </DashboardLayout>
  );
}
