import connectMongo from "../../../utils/connectMongo";
import Review from "../../../models/Review";
import * as jose from "jose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const secret = process.env.NEXT_PUBLIC_SECRET;

export default async function getReviews(req, res) {
  try {
    const defaultLimit = 5;

    const page = +req.query.page || 0;
    const limit = +req.query.limit || (page ? defaultLimit : 0);
    const { id, q, checked } = req.query;

    //access check
    if (checked !== "y" || id) {
      const jwt = req.cookies["SkyArkhyzJWT"];
      if (!jwt)
        return res
          .status(401)
          .json({ message: "You don't have auth token to proceed" });

      await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));
    }

    await connectMongo();
    console.log("Mongo connected!");

    let filter;
    if (checked === "y") {
      filter = { checked: true };
    }
    if (checked === "n") {
      filter = { checked: false };
    }

    if (id) {
      const review = await Review.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (review) return res.json({ review });
      else return res.json({ message: "Отзыва с таким id не существует" });
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
    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });
    if (error.code === "ERR_JWS_INVALID")
      return res.status(403).json({ message: "Wrong auth token" });
    res.status(400).json(error);
  }
}