import connectMongo from "../../../utils/connectMongo";
import Review, { IReview } from "../../../models/Review";
import type { NextApiRequest, NextApiResponse } from "next";

const createReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    console.log("Mongo connected! Create Review request");

    const {
      name,
      text,
      stars,
      avatarAspectRatio,
      avatarUrl,
      photoAspectRatio,
      photoUrl,
    } = req.body as ReviewCreateParams;

    const newReview: IReview = new Review({
      name,
      text: [...text],
      stars,
      avatarAspectRatio,
      avatarUrl,
      photoAspectRatio,
      photoUrl,
    });

    await newReview.save();
    console.log("Review saved!");

    res
      .status(201)
      .json({ createdReview: newReview, message: "Отзыв добавлен!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    res.status(400).json({ message: "Ошибка! Не удалось добавить отзыв" });
  }
};
export default createReview;

export type ReviewCreateParams = {
  name: string;
  text: string[];
  avatarUrl?: string;
  avatarAspectRatio?: number;
  photoUrl?: string;
  photoAspectRatio?: number;
  stars: number;
};
