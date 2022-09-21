import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function setChecked(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;
    const filter = { _id: id };

    const review = await Review.findOneAndUpdate(
      filter,
      [
        {
          $set: { checked: { $eq: ["$checked", false] } },
        },
      ],
      {
        new: true,
      }
    );

    res.status(200).json({ review });
  } catch (error) {
    res.json(error);
  }
}
