import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItemDashboard from "../../../components/PostItemDashboard";
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
              <button className=" bg-gray-600 hover:bg-gray-700 text-xs text-white rounded-sm py-2 px-4 ">
                Добавить новость
              </button>
            </a>
          </Link>
        </div>
        <div className={`flex flex-col flex-wrap gap-3`}>
          {!posts.length ? <div>Новостей нет, или они загружаются</div> : <></>}
          {posts?.map((post) => (
            <PostItemDashboard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
