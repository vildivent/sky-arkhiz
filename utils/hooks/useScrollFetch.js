import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

const useScrollFetch = ({
  searchQuery,
  limit = 2,
  loading,
  hasMore,
  getPosts,
  addPosts,
  checked,
}) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (pageNumber === 0) {
      dispatch(getPosts({ limit, q: searchQuery, page: pageNumber, checked }));
    } else {
      dispatch(addPosts({ limit, q: searchQuery, page: pageNumber, checked }));
    }
  }, [dispatch, searchQuery, pageNumber, limit, getPosts, addPosts, checked]);

  return { lastElementRef, setPageNumber };
};

export default useScrollFetch;
