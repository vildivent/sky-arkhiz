import { useState } from "react";
import Image from "next/image";
import Router from "next/router";

import { backArrowWhite, backArrowCyan500 } from "../../public/assets";
import PostItem from "../../components/PostItem";
import axios from "axios";
import { MainLayout } from "../../layouts/MainLayout";

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/posts/getAll`
  );

  const paths = data.posts.map((post) => ({ params: { pid: post._id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const _id = context.params.pid;
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/posts/getOneById`,
    { _id }
  );
  return { props: { post: data.post } };
};

const NewsPage = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <MainLayout title={post.title} h1Props={"hidden"}>
      <div className={`my-3`}>
        <Image
          src={hovered ? backArrowWhite : backArrowCyan500}
          alt="Back"
          className={`cursor-pointer`}
          width={50}
          height={50}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => Router.back()}
        />
      </div>
      <PostItem post={post} />
    </MainLayout>
  );
};

export default NewsPage;
