import connectMongo from "../../../utils/connectMongo";
import Review from "../../../models/Review";
import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXT_PUBLIC_SECRET;

const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected! Delete Review request");

    const { id } = req.query;
    const review = await Review.findByIdAndDelete(id);

    if (!review)
      return res
        .status(404)
        .json({ message: "Отзыва с таким id не существует" });

    console.log("Review deleted from db!");

    await fetch(review.avatarUrl, {
      method: "delete",
    });
    await fetch(review.photoUrl, {
      method: "delete",
    });
    console.log("Review deleted from storage!");

    res.status(200).json({ deletedReview: review, message: "Отзыв удалён!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось удалить отзыв" });
  }
};
export default deleteReview;
