import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function getChecked(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const filter = { checked: false };

    const reviews = await Review.find(filter).sort("-createdAt");

    if (!reviews) {
      return res.status(404).json({ message: "Отзывов нет" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.json(error);
  }
}
