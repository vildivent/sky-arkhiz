import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../components/Buttons";
import RequestItem from "../../components/RequestItem";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { loadingGif } from "../../public/assets";
import {
  getAllRequests,
  getRequestsWithStatus,
} from "../../redux/features/request/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.request);

  const [filter, setFilter] = useState("new");

  useEffect(() => {
    dispatch(getRequestsWithStatus({ status: "new" }));
  }, [dispatch]);
  return (
    <DashboardLayout title={"Заявки"} mainProps={"px-2"}>
      <div className={`flex flex-wrap gap-3 justify-center mt-5`}>
        <ActionButton
          onClick={() => {
            dispatch(getRequestsWithStatus({ status: "new" }));
            setFilter("new");
          }}
          disabled={filter === "new"}
        >
          Новые заявки
        </ActionButton>
        <ActionButton
          onClick={() => {
            dispatch(getRequestsWithStatus({ status: "active" }));
            setFilter("active");
          }}
          disabled={filter === "active"}
        >
          Активные заявки
        </ActionButton>
        <ActionButton
          onClick={() => {
            dispatch(getAllRequests());
            setFilter("all");
          }}
          disabled={filter === "all"}
        >
          Все заявки
        </ActionButton>
      </div>

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {!requests.length && (
          <>
            {loading ? (
              <Image src={loadingGif} alt="loading" width={40} height={40} />
            ) : (
              <span>Заявок нет</span>
            )}
          </>
        )}
        {requests &&
          requests.map((request) => (
            <RequestItem key={request._id} request={request} />
          ))}
      </div>
    </DashboardLayout>
  );
};

export default Requests;
