/* eslint-disable @next/next/no-img-element */

import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { CancelButton } from "./Buttons";
import PostItem from "./PostItem";
import PostItemShort from "./PostItemShort";

const PostItemDashboard = ({ post }) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    try {
      const id = post._id;

      dispatch(deletePost({ id }));
      console.log("Post deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <CancelButton title={`Удалить новость`} onClick={deleteHandler} />
      </div>
      <PostItemShort post={post} />
    </>
  );
};

export default PostItemDashboard;
