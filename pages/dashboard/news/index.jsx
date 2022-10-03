import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../../components/Buttons";
import Loading from "../../../components/Loading";
import PostItemDashboard from "../../../components/PostItemDashboard";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { getAllPosts } from "../../../redux/features/post/postSlice";

const News = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, posts]);

  return (
    <DashboardLayout title={"Новости"} mainProps={"px-2"}>
      <div>
        <div className="flex flex-col flex-wrap items-center gap-3 mt-3">
          <Loading array={posts} loading={loading} alt="Новостей нет" />

          <Link href="/dashboard/news/create">
            <a>
              <ActionButton title={"Добавить новость"} />
            </a>
          </Link>
        </div>
        <div className={`flex flex-col flex-wrap gap-3 mt-2`}>
          {posts?.map((post) => (
            <PostItemDashboard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
