import mongoose, { models } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: [{ type: String, required: true }],
    imgUrl: { type: String, default: "" },
    srcUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", PostSchema);

export default Post;

export interface IPost {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  text: string[];
  imgUrl: string;
  srcUrl: string;
  views: number;
}
