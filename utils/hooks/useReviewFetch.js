import useScrollFetch from "./useScrollFetch";
import {
  addReviews,
  getReviews,
} from "../../redux/features/review/reviewSlice";
import { useSelector } from "react-redux";

const useReviewFetch = () => {
  const limit = 2;
  const { reviews, loading, hasMore } = useSelector((state) => state.review);
  const { lastElementRef } = useScrollFetch({
    searchQuery,
    limit,
    loading,
    hasMore,
    getPosts,
    addPosts,
  });

  return { reviews, loading, lastElementRef };
};
export default useReviewFetch;
