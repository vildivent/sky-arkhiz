import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function getOneById(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;
    const filter = { _id: id };

    const post = await Post.findOneAndUpdate(
      filter,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );

    res.status(200).json({ post });
  } catch (error) {
    res.json(error);
  }
}
