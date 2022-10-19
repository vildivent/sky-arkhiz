import Image from "next/image";
import PostItem from "../components/PostItem";
import SearchBar from "../components/SearchBar";
import { MainLayout } from "../layouts/MainLayout";
import { loadingGif } from "../public/assets";
import usePostsFetchAndSearch from "../utils/hooks/usePostsFetchAndSearch";

export default function News() {
  const { posts, loading, lastElementRef, inputValue, setInputValue } =
    usePostsFetchAndSearch();

  return (
    <MainLayout title={"Новости"} mainProps={"px-2"}>
      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          reset={() => setInputValue("")}
        />

        {posts.length > 0 &&
          posts.map((post, index) => {
            if (posts.length === index + 1)
              return (
                <PostItem
                  ref={lastElementRef}
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
