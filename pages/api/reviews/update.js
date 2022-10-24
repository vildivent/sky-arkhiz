import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";
import * as jose from "jose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const secret = process.env.NEXT_PUBLIC_SECRET;

export default async function updateReview(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id, checked, upvotes, downvotes, views } = req.body;
    const filter = { _id: id };
    const jwt = req.cookies["SkyArkhyzJWT"];

    if (!id) return res.status(400).json({ message: "Отсутствует id отзыва" });
    const reviewBeforeUpdate = await Review.findOne(filter);
    if (!reviewBeforeUpdate)
      return res.status(404).json({ message: `Отзыв с id:${id} не найден` });

    //auth check
    if (reviewBeforeUpdate.checked === false || checked) {
      if (!jwt)
        return res
          .status(401)
          .json({ message: "Отсутствует токен аутентификации" });
      await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));
    }

    if (checked) {
      if (checked === "true")
        await Review.updateOne(filter, { $set: { checked: true } });
      else if (checked === "false")
        await Review.updateOne(filter, { $set: { checked: false } });
      else
        await Review.updateOne(filter, [
          {
            $set: { checked: { $eq: ["$checked", false] } },
          },
        ]);
    }
    if (upvotes) {
      await Review.updateOne(filter, { $inc: { upvotes: 1 } });
    }
    if (downvotes) {
      await Review.updateOne(filter, { $inc: { downvotes: 1 } });
    }
    if (views) {
      await Review.updateOne(filter, { $inc: { views: 1 } });
    }

    const review = await Review.findOne(filter);

    res.status(200).json({ review });
  } catch (error) {
    console.error(error);
    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(401)
        .json({ message: "Некорректный токен аутентификации" });
    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат id" });
    res.status(400).json(error);
  }
}
