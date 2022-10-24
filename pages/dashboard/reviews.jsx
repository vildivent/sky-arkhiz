import { useState } from "react";
import FilterMenu from "../../components/FilterMenu";
import Loading from "../../components/Loading";
import ReviewItemDashboard from "../../components/ReviewItemDashboard";
import { reviewStatusTypes } from "../../constasnts";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import useReviewFetch from "../../utils/hooks/useReviewFetch";

export default function Reviews() {
  const [filter, setFilter] = useState(reviewStatusTypes[0].id);
  const [checked, setChecked] = useState(false);

  const { reviews, loading, lastElementRef } = useReviewFetch({ checked });

  const filterHandler = (status) => {
    try {
      if (status === reviewStatusTypes[0].id) {
        setChecked(false);
        setFilter(status);
        return;
      }
      if (status === reviewStatusTypes[1].id) {
        setChecked(true);
        setFilter(status);
        return;
      }
      if (status === "all") {
        setChecked(undefined);
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
            <ReviewItemDashboard
              ref={lastElementRef}
              key={review._id}
              review={review}
            />
          ))}
      </div>
    </DashboardLayout>
  );
}
