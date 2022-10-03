import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import RequestItem from "../../components/RequestItem";
import FilterMenu from "../../components/FilterMenu";
import { requestStatusTypes } from "../../constasnts";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  getAllRequests,
  getRequestsWithStatus,
} from "../../redux/features/request/requestSlice";
import DateFilter from "../../components/DateFilter";
import { setFilteredRequests } from "../../redux/features/requestFilter/requestFilterSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.request);
  const { filteredRequests } = useSelector((state) => state.requestFilter);

  const initialStatus = requestStatusTypes[0].id;
  const [filter, setFilter] = useState(initialStatus);
  const [filterDate, setFilterDate] = useState(null);

  useEffect(() => {
    dispatch(getRequestsWithStatus({ status: initialStatus }));
  }, [dispatch, initialStatus]);

  useEffect(() => {
    dispatch(
      setFilteredRequests({ requests, filterDate: filterDate?.format() })
    );
  }, [dispatch, requests, filterDate]);

  const filterHandler = (status) => {
    try {
      if (status !== "all") {
        dispatch(getRequestsWithStatus({ status }));
        setFilter(status);
      } else {
        dispatch(getAllRequests());
        setFilter("all");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout title={"Заявки"} mainProps={"px-2"}>
      <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />

      <FilterMenu
        typesArray={requestStatusTypes}
        filter={filter}
        filterHandler={filterHandler}
        plural={true}
      />

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <Loading array={requests} loading={loading} alt="" />

        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestItem key={request._id} request={request} />
          ))
        ) : (
          <div>Заявок нет</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Requests;
