import useScrollFetch from "./useScrollFetch";
import {
  addReviews,
  getReviews,
} from "../../redux/features/review/reviewSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useReviewFetch = ({ checked }) => {
  const limit = 2;
  const { reviews, loading, hasMore } = useSelector((state) => state.review);
  const { lastElementRef, setPageNumber } = useScrollFetch({
    limit,
    loading,
    hasMore,
    getPosts: getReviews,
    addPosts: addReviews,
    checked,
  });

  useEffect(() => {
    setPageNumber(0);
  }, [checked, setPageNumber]);

  return { reviews, loading, lastElementRef };
};
export default useReviewFetch;
