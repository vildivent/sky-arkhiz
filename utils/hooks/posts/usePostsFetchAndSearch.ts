import { useState, useEffect, useRef, useCallback } from "react";
import { addPosts, getPosts } from "../../../redux/features/post/postSlice";
import { useAppDispatch, useAppSelector } from "../redux";

const usePostsFetchAndSearch = () => {
  const limit = 2;
  const timeoutDefaultValue = 500;
  const { posts, loading, error, query, hasMore } = useAppSelector(
    (state) => state.post
  );
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState(query);
  const [inputValue, setInputValue] = useState(searchQuery);

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
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

  //timeout for input search query
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (inputValue !== query) {
      timeout = setTimeout(() => {
        setSearchQuery(inputValue);
        setPageNumber(0);
      }, timeoutDefaultValue);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [inputValue, query, setPageNumber]);

  useEffect(() => {
    if (pageNumber === 0) {
      dispatch(getPosts({ limit, q: searchQuery, page: pageNumber }));
    } else {
      dispatch(addPosts({ limit, q: searchQuery, page: pageNumber }));
    }
  }, [dispatch, searchQuery, pageNumber, limit]);

  return { posts, loading, error, lastElementRef, inputValue, setInputValue };
};
export default usePostsFetchAndSearch;
