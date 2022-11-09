import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { loadingGif } from "../../public/assets";
import { getAllRequests } from "../../redux/features/request/requestSlice";
import { setFilterByDate } from "../../redux/features/requestFilterByDate/requestFilterByDateSlice";
import { getReviews } from "../../redux/features/review/reviewSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const reviewsState = useSelector((state) => state.review);
  const { reviews } = reviewsState;
  const requestsState = useSelector((state) => state.request);
  const { requests } = requestsState;
  const { filteredRequestsByDate } = useSelector(
    (state) => state.requestFilterByDate
  );
  const [loading, setLoading] = useState(true);
  const [newRequests, setNewRequests] = useState([]);
  const [registeredRequests, setRegisteredRequests] = useState([]);
  const today = new DateObject({
    date: new Date(),
    format: "DD/MM/YYYY",
  }).format();

  useEffect(() => {
    dispatch(getAllRequests());
    dispatch(getReviews({ checked: false }));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setNewRequests(requests.filter((request) => request.status === "new"));
    setRegisteredRequests(
      requests.filter((request) => request.status === "registered")
    );
  }, [dispatch, requests]);

  useEffect(() => {
    dispatch(
      setFilterByDate({
        requests: registeredRequests,
        filterDate: today,
      })
    );
  }, [dispatch, today, registeredRequests]);

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
              <ActionButton>{`Отзывов ожидают проверку (${reviews.length})`}</ActionButton>
            </a>
          </Link>
          <Link href={"/dashboard/requests"}>
            <a>
              <ActionButton
                title={`Новых заявок (${newRequests.length || "нет"})`}
              />
            </a>
          </Link>
          <Link
            href={`/dashboard/requests?status=registered&date=${new DateObject({
              format: "DD/MM/YYYY",
            })}&remove=true`}
          >
            <a>
              <ActionButton
                title={`Заявок на сегодня (${
                  filteredRequestsByDate.length || "нет"
                })`}
              />
            </a>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
