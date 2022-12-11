import { model, Schema, models } from "mongoose";
import type { Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: string[];
  imgUrl?: string;
  aspectRatio?: number;
  srcUrl?: string;
  views?: number;

  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost, Model<IPost>>(
  {
    title: { type: String, required: true },
    text: [{ type: String, required: true }],
    imgUrl: { type: String, default: "" },
    aspectRatio: { type: Number, default: 0 },
    srcUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post: Model<IPost> = models.Post || model("Post", PostSchema);

export default Post;
