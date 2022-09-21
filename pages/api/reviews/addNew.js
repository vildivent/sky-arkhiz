import Review from "../../../models/Review";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function addNew(req, res) {
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

    res.status(201).json({ message: "Rewiew saved!" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
