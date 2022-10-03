import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterMenu from "../../components/FilterMenu";
import Loading from "../../components/Loading";
import ReviewItemDashboard from "../../components/ReviewItemDashboard";
import { reviewStatusTypes } from "../../constasnts";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  getAllReviews,
  getCheckedReviews,
  getUncheckedReviews,
} from "../../redux/features/review/reviewSlice";

export default function Reviews() {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);
  const [filter, setFilter] = useState(reviewStatusTypes[0].id);

  useEffect(() => {
    dispatch(getUncheckedReviews());
  }, [dispatch]);

  const filterHandler = (status) => {
    try {
      if (status === reviewStatusTypes[0].id) {
        dispatch(getUncheckedReviews());
        setFilter(status);
        return;
      }
      if (status === reviewStatusTypes[1].id) {
        dispatch(getCheckedReviews());
        setFilter(status);
        return;
      }
      if (status === "all") {
        dispatch(getAllReviews());
        setFilter("all");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout title={"Отзывы"} mainProps={"px-2"}>
      <FilterMenu
        typesArray={reviewStatusTypes}
        filter={filter}
        filterHandler={filterHandler}
        plural={true}
      />

      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <Loading array={reviews} loading={loading} alt="Отзывов нет" />

        {reviews &&
          reviews.map((review) => (
            <ReviewItemDashboard key={review._id} review={review} />
          ))}
      </div>
    </DashboardLayout>
  );
}
