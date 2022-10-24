import mongoose, { models } from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: [
      {
        type: String,
        required: true,
      },
    ],
    avatarUrl: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    stars: { type: Number, required: true },
    checked: { type: Boolean, default: false },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
