import axios from "axios";
import PostItem from "../../components/PostItem";
import { MainLayout } from "../../layouts/MainLayout";

const path = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`${path}api/posts/getAll`);
    return {
      props: { posts: data.posts },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function News({ posts }) {
  return (
    <MainLayout title={"Новости"} mainProps={"px-2"}>
      <div className={`flex flex-col flex-wrap items-center gap-3 mt-3`}>
        {posts ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <span>Новостей нет</span>
        )}
      </div>
    </MainLayout>
  );
}
