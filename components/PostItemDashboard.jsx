/* eslint-disable @next/next/no-img-element */

import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { CancelButton } from "./Buttons";

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
    <div
      key={`${post._id}`}
      className="flex flex-col flex-wrap justify-around gap-3 flex-grow border border-gray-600 rounded-lg"
    >
      <h2 className={`font-h1 text-center sm:text-4xl text-2xl`}>
        {post.title}
      </h2>
      <div className={`mt-3 flex justify-center`}>
        {post.imgUrl && <img src={post.imgUrl} alt="post img" />}
      </div>
      <p className="px-3 my-0">{post.text}</p>
      <div className="flex justify-center">
        <CancelButton title={`Удалить новость`} onClick={deleteHandler} />
      </div>

      <Moment
        className="ml-auto mr-3"
        date={post.createdAt}
        format="D. M. YYYY г."
      />
    </div>
  );
};

export default PostItemDashboard;
