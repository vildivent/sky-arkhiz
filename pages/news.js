import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../components/PostItem";
import { MainLayout } from "../layouts/MainLayout";
import { getAllPosts } from "../redux/features/post/postSlice";

export default function News() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <MainLayout title={"Новости"}>
      <div>
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
    </MainLayout>
  );
}
