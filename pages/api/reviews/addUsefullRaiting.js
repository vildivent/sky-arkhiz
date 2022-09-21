import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function addUsefullRaiting(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;
    const filter = { _id: id };

    const rewiew = await Review.findOneAndUpdate(
      filter,
      {
        $inc: { usefullRaiting: 1 },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ rewiew });
  } catch (error) {
    res.json(error);
  }
}
