import { model, Schema, models } from "mongoose";
import type { Document, Model } from "mongoose";

export interface IPhoto extends Document {
  title: string;
  imgUrl: string;
  aspectRatio: number;
  category?: string;
  views?: number;

  createdAt: Date;
  updatedAt: Date;
}

const PhotoSchema = new Schema<IPhoto, Model<IPhoto>>(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    aspectRatio: { type: Number, required: true },
    category: { type: String, default: "" },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Photo: Model<IPhoto> = models.Photo || model("Photo", PhotoSchema);

export default Photo;
