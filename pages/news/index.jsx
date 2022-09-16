import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/PostItem";
import PostItemShort from "../../components/PostItemShort";
import { MainLayout } from "../../layouts/MainLayout";
import { loadingGif } from "../../public/assets";
import { getAllPosts } from "../../redux/features/post/postSlice";

export default function News() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <MainLayout title={"Новости"}>
      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {!posts.length && (
          <>
            <span>Новостей нет, или они загружаются</span>
            <Image src={loadingGif} alt="loading" width={40} height={40} />
          </>
        )}
        {posts.length ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <></>
        )}
      </div>
    </MainLayout>
  );
}
