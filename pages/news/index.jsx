import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/PostItem";
import { MainLayout } from "../../layouts/MainLayout";
import { loadingGif } from "../../public/assets";
import { getAllPosts } from "../../redux/features/post/postSlice";

export default function News() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <MainLayout title={"Новости"} mainProps={"px-2"}>
      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {!posts.length && (
          <>
            {loading ? (
              <Image src={loadingGif} alt="loading" width={40} height={40} />
            ) : (
              <span>Новостей нет</span>
            )}
          </>
        )}
        {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
    </MainLayout>
  );
}
