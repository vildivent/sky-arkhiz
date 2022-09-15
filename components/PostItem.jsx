/* eslint-disable @next/next/no-img-element */

import Moment from "react-moment";

const PostItem = ({ post }) => {
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

      <Moment
        className="ml-auto mr-3"
        date={post.createdAt}
        format="D. M. YYYY г."
      />
    </div>
  );
};

export default PostItem;
