import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/PostItem";
import SearchBar from "../../components/SearchBar";
import { MainLayout } from "../../layouts/MainLayout";
import { loadingGif } from "../../public/assets";
import { addPosts, getPosts } from "../../redux/features/post/postSlice";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`${baseURL}api/posts/get`, {
      params: { limit: 1 },
    });
    return {
      props: { initialPosts: data.posts },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function News({ initialPosts }) {
  const dispatch = useDispatch();
  const limit = 1;
  const timeoutDefaultValue = 500;
  const { posts, loading, query, hasMore } = useSelector((state) => state.post);
  const [searchQuery, setSearchQuery] = useState(query);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [pageNumber, setPageNumber] = useState(0);

  const observer = useRef();
  const lastPostElementRef = useCallback(
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
  }, [inputValue, query]);

  useEffect(() => {
    if (pageNumber === 0) {
      dispatch(getPosts({ limit, q: searchQuery }));
    } else {
      dispatch(addPosts({ limit, q: searchQuery, page: pageNumber }));
    }
  }, [dispatch, searchQuery, pageNumber]);

  return (
    <MainLayout title={"Новости"} mainProps={"px-2"}>
      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          reset={() => setInputValue("")}
        />

        {initialPosts &&
          !posts.length &&
          !query &&
          initialPosts.map((post) => <PostItem key={post._id} post={post} />)}

        {posts.length > 0 &&
          posts.map((post, index) => {
            if (posts.length === index + 1)
              return (
                <PostItem
                  ref={lastPostElementRef}
                  key={post._id + index}
                  post={post}
                />
              );
            else return <PostItem key={post._id + index} post={post} />;
          })}

        {loading && (
          <Image src={loadingGif} alt="loading" width={40} height={40} />
        )}
        {posts.length === 0 && !loading && <span>Новости не найдены</span>}
      </div>
    </MainLayout>
  );
}
