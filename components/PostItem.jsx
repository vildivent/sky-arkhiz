/* eslint-disable @next/next/no-img-element */

import { AiFillEye } from "react-icons/ai";
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
      {post.text.map((item, index) => (
        <p key={index} className="font-p px-3 my-0">
          {item}
        </p>
      ))}
      {post.srcUrl && (
        <a
          href={`${post.srcUrl}`}
          className={`text-cyan-500 hover:text-white ml-3`}
        >{`Источник`}</a>
      )}

      <div className="flex flex-wrap gap-5 justify-end ">
        <div className="flex flex-wrap gap-1  items-center">
          <AiFillEye />
          <span>{post.views}</span>
        </div>

        <Moment className="m-2" date={post.createdAt} format="D. M. YYYY г." />
      </div>
    </div>
  );
};

export default PostItem;
