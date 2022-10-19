import { useState, useEffect } from "react";
import useScrollFetch from "./useScrollFetch";
import { addPosts, getPosts } from "../../redux/features/post/postSlice";
import { useSelector } from "react-redux";

const usePostsFetchAndSearch = () => {
  const limit = 2;
  const timeoutDefaultValue = 500;
  const { posts, loading, query, hasMore } = useSelector((state) => state.post);
  const [searchQuery, setSearchQuery] = useState(query);
  const [inputValue, setInputValue] = useState(searchQuery);
  const { lastElementRef, setPageNumber } = useScrollFetch({
    searchQuery,
    limit,
    loading,
    hasMore,
    getPosts,
    addPosts,
  });

  //timeout for input search query
  useEffect(() => {
    let timeout;
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

  return { posts, loading, lastElementRef, inputValue, setInputValue };
};
export default usePostsFetchAndSearch;
