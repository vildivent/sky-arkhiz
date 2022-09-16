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
      {post.text.map((item, index) => (
        <p key={index} className="font-p px-3 my-0">
          {item}
        </p>
      ))}
      <p className="font-p px-3 my-0">{post.paragraph}</p>
      {post.srcUrl && (
        <a
          href={`${post.srcUrl}`}
          className={`text-cyan-500 hover:text-white ml-3`}
        >{`Источник`}</a>
      )}

      <Moment
        className="ml-auto mr-3"
        date={post.createdAt}
        format="D. M. YYYY г."
      />
    </div>
  );
};

export default PostItem;
