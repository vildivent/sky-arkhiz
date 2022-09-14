import mongoose, { models } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", PostSchema);

export default Post;
