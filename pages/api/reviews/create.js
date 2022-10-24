import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function createReview(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { name, text, avatarUrl, photoUrl, stars } = req.body;

    const newRewiew = new Review({
      name,
      text: [...text],
      avatarUrl,
      photoUrl,
      stars,
    });

    await newRewiew.save();
    console.log("Rewiew saved!");

    res.status(201).json(newRewiew);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
