import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/PostItem";
import { MainLayout } from "../../layouts/MainLayout";
import { getAllPosts } from "../../redux/features/post/postSlice";

export default function News() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <MainLayout title={"Новости"}>
      <div className={`flex flex-col flex-wrap gap-3 mt-3`}>
        {!posts.length ? <div>Новостей нет, или они загружаются</div> : <></>}
        {posts?.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </MainLayout>
  );
}
