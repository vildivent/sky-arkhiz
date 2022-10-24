import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";
import * as jose from "jose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const secret = process.env.NEXT_PUBLIC_SECRET;

export default async function deleteReview(req, res) {
  try {
    //auth check
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации" });
    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.query;

    const review = await Review.findByIdAndDelete(id);

    if (!review)
      return res.status(404).json({ message: `Отзыв с id:${id} не найден` });

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
