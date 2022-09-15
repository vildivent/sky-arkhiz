/* eslint-disable @next/next/no-img-element */

import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";

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
      key={`item${post._id}`}
      className="flex flex-col flex-wrap justify-around gap-3 flex-grow border border-gray-600 rounded-lg"
    >
      <h2 className={`font-h1 text-center sm:text-4xl text-2xl`}>
        {post.title}
      </h2>
      <div className={`mt-3 flex justify-center`}>
        {post.imgUrl && <img src={post.imgUrl} alt="post img" />}
      </div>
      <p className="px-3 my-0">{post.text}</p>
      <button
        onClick={deleteHandler}
        className="flex justify-center items-center bg-red-800 hover:bg-red-900 text-xs text-white rounded-sm py-2 px-4 w-40 mx-auto "
      >
        Удалить новость
      </button>
      <Moment
        className="ml-auto mr-3"
        date={post.createdAt}
        format="D. M. YYYY г."
      />
    </div>
  );
};

export default PostItemDashboard;
