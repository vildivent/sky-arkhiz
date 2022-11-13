import { useState, useEffect, useCallback, useRef } from "react";
import { useAppDispatch } from "./redux";
import type { AsyncThunk } from "@reduxjs/toolkit";

type ScrollFetchProps = {
  searchQuery: string;
  limit: number;
  loading: boolean;
  error: string;
  hasMore: boolean;
  getPosts: AsyncThunk<any, any, any>;
  addPosts: AsyncThunk<any, any, any>;
  checked?: boolean;
};

const useScrollFetch = ({
  searchQuery,
  limit = 2,
  loading,
  error,
  hasMore,
  getPosts,
  addPosts,
  checked,
}: ScrollFetchProps) => {
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(0);

  const observer = useRef<IntersectionObserver | null>(null);
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
