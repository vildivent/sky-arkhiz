import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../../components/PostItem";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { getAllPosts } from "../../../redux/features/post/postSlice";

const News = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <DashboardLayout title={"Новости"}>
      <div>
        <div className="flex justify-center my-5">
          <Link href="/dashboard/news/create">
            <a>
              <button className="hover:text-cyan-500 bg-zinc-600 text-xs text-white rounded-sm py-2 px-4 ">
                Добавить новость
              </button>
            </a>
          </Link>
        </div>

        {!posts.length ? (
          <div>Новостей нет, или что-то пошло не так</div>
        ) : (
          <></>
        )}
        {posts?.map((post) => (
          <div key={post._id} className={`pb-5`}>
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default News;
