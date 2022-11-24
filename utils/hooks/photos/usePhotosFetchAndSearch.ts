import { useState, useEffect, useRef, useCallback } from "react";
import { addPhotos, getPhotos } from "../../../redux/features/photo/photoSlice";
import { useAppDispatch, useAppSelector } from "../redux";

const usePhotosFetchAndSearch = (category = "") => {
  const limit = 6;
  const timeoutDefaultValue = 500;
  const { photos, loading, error, query, hasMore } = useAppSelector(
    (state) => state.photo
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

  useEffect(() => {
    setPageNumber(0);
  }, [category]);

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
      dispatch(
        getPhotos({ limit, q: searchQuery, page: pageNumber, category })
      );
    } else {
      dispatch(
        addPhotos({ limit, q: searchQuery, page: pageNumber, category })
      );
    }
  }, [dispatch, searchQuery, pageNumber, limit, category]);

  return { photos, loading, error, lastElementRef, inputValue, setInputValue };
};
export default usePhotosFetchAndSearch;
