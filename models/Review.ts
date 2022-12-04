import { model, Schema, models } from "mongoose";
import type { Document, Model } from "mongoose";

export interface IReview extends Document {
  name: string;
  text: string[];
  avatarUrl?: string;
  avatarAspectRatio?: number;
  photoUrl?: string;
  photoAspectRatio?: number;
  stars: number;
  checked?: boolean;
  upvotes?: number;
  downvotes?: number;
  views?: number;

  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview, Model<IReview>>(
  {
    name: { type: String, required: true },
    text: [{ type: String, required: true }],
    avatarUrl: { type: String, default: "" },
    avatarAspectRatio: { type: Number, default: 0 },
    photoUrl: { type: String, default: "" },
    photoAspectRatio: { type: Number, default: 0 },
    stars: { type: Number, required: true },
    checked: { type: Boolean, default: false },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Review: Model<IReview> = models.Review || model("Review", ReviewSchema);

export default Review;
