import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../../../components/Buttons";
import PostItemDashboard from "../../../components/PostItemDashboard";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { loadingGif } from "../../../public/assets";
import { getAllPosts } from "../../../redux/features/post/postSlice";

const News = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, posts]);

  return (
    <DashboardLayout title={"Новости"} mainProps={"px-2"}>
      <div>
        <div className="flex flex-col flex-wrap items-center gap-3 mt-3">
          {!posts.length && (
            <Image src={loadingGif} alt="loading" width={40} height={40} />
          )}
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
