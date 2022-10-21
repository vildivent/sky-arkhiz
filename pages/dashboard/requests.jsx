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
import GroupFilter from "../../components/GroupFilter";
import { setFilterByDate } from "../../redux/features/requestFilterByDate/requestFilterByDateSlice";
import { setFilterByGroup } from "../../redux/features/requestFilterByGroup/requestFilterByGroupSlice";
import StattusChangeSwitcher from "../../components/StattusChangeSwitcher";
import { useRouter } from "next/router";
import { DateObject } from "react-multi-date-picker";

const Requests = () => {
  const router = useRouter();
  const { status, date, remove } = router.query;

  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.request);
  const { filteredRequestsByDate } = useSelector(
    (state) => state.requestFilterByDate
  );
  const { filteredRequestsByGroup } = useSelector(
    (state) => state.requestFilterByGroup
  );

  const [initialStatus, setInitialStatus] = useState(requestStatusTypes[0].id);
  const [filter, setFilter] = useState(initialStatus);
  const [filterDate, setFilterDate] = useState(null);
  const [filterGroup, setFilterGroup] = useState("");
  const [hideOnStatusChange, setHideOnStatusChange] = useState(false);

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

  useEffect(() => {
    if (status) setInitialStatus(status);
  }, [status]);

  useEffect(() => {
    if (date) setFilterDate(new DateObject({ date, format: "DD/MM/YYYY" }));
  }, [date]);

  useEffect(() => {
    if (remove) setHideOnStatusChange(remove === "true");
  }, [remove]);

  useEffect(() => {
    filterHandler(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    dispatch(setFilterByDate({ requests, filterDate: filterDate?.format() }));
  }, [dispatch, requests, filterDate]);

  useEffect(() => {
    dispatch(
      setFilterByGroup({
        requests: filteredRequestsByDate,
        filterGroup: +filterGroup,
      })
    );
  }, [dispatch, filteredRequestsByDate, filterGroup]);

  return (
    <DashboardLayout title={"Заявки"} mainProps={"px-2"}>
      <div className="flex justify-center flex-col items-center gap-3 mt-3">
        <div className="flex flex-wrap flex-col sm:flex-row gap-3">
          <StattusChangeSwitcher
            hideOnStatusChange={hideOnStatusChange}
            setHideOnStatusChange={setHideOnStatusChange}
          />
          <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />
          <GroupFilter
            filterGroup={filterGroup}
            setFilterGroup={setFilterGroup}
          />
        </div>

        <FilterMenu
          typesArray={requestStatusTypes}
          filter={filter}
          filterHandler={filterHandler}
          plural={true}
        />
      </div>

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <Loading array={requests} loading={loading} alt="" />

        {filteredRequestsByGroup.length > 0 || loading ? (
          filteredRequestsByGroup.map((request) => (
            <RequestItem
              key={request._id}
              request={request}
              settings={{ hideOnStatusChange }}
            />
          ))
        ) : (
          <div>Заявок нет</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Requests;
