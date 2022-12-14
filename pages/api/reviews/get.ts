import connectMongo from "../../../utils/connectMongo";
import Review from "../../../models/Review";
import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FilterQuery } from "mongoose";

const secret = process.env.NEXT_PUBLIC_SECRET;

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const defaultLimit = 5;

    const page = +req.query.page || 0;
    const limit = +req.query.limit || (page ? defaultLimit : 0);

    const { id, q, checked } = req.query;

    if (checked !== "true" || id) {
      const jwt = req.cookies["SkyArkhyzJWT"];
      if (!jwt)
        return res
          .status(401)
          .json({ message: "Отсутствует токен аутентификации" });

      await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));
    }

    await connectMongo();
    console.log("Mongo connected! Get Reviews request");

    if (id) {
      const review = await Review.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (review) return res.json({ review });
      else
        return res.status(404).json({ message: "Отзыв с таким id не найден" });
    }

    let filter: FilterQuery<typeof Review>;

    if (checked === "true") {
      filter = { checked: true };
    }
    if (checked === "false") {
      filter = { checked: false };
    }

    if (q) {
      filter = { ...filter, $text: { $search: `\"${q}\"` } };
    }
    const reviews = await Review.find(filter).sort("-createdAt");
    const numFound = reviews.length;

    if (limit) {
      return res.json({
        reviews: reviews.slice(page * limit, (page + 1) * limit),
        start: page * limit,
        numFound,
      });
    }

    return res.json({ reviews, start: page * limit, numFound });
  } catch (error) {
    console.error(error);
    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(401)
        .json({ message: "Некорректный токен аутентификации" });

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    res.status(400).json({ message: "Ошибка! Не удалось получить отзыв" });
  }
};
export default getReviews;
