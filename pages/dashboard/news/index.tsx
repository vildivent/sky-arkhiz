import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "../../../components/Buttons";
import PostItem from "../../../components/PostItem";
import SearchBar from "../../../components/SearchBar";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { loadingGif } from "../../../public/assets";
import usePostsFetchAndSearch from "../../../utils/hooks/posts/usePostsFetchAndSearch";

const News = () => {
  const { posts, loading, lastElementRef, inputValue, setInputValue } =
    usePostsFetchAndSearch();

  return (
    <DashboardLayout title="Новости" mainProps="px-2">
      <div className="flex flex-col flex-wrap items-center gap-3 mt-3">
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          reset={() => setInputValue("")}
        />

        <Link href="/dashboard/news/create">
          <a className="my-3">
            <ActionButton>Добавить новость</ActionButton>
          </a>
        </Link>

        {posts.length > 0 &&
          posts.map((post, index) => {
            if (posts.length === index + 1)
              return (
                <PostItem ref={lastElementRef} key={post._id} post={post} />
              );
            else return <PostItem key={post._id} post={post} />;
          })}

        {loading && (
          <Image src={loadingGif} alt="loading" width={40} height={40} />
        )}
        {posts.length === 0 && !loading && <span>Новости не найдены</span>}
      </div>
    </DashboardLayout>
  );
};

export default News;
