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
    usefullRaiting: { type: Number, default: 0 },
    uselessRaiting: { type: Number, default: 0 },
    checked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
