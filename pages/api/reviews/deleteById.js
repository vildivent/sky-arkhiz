import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function deleteReview(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;

    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.json({ message: "такого отзыва не существует" });
    res.status(200).json({ review });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
