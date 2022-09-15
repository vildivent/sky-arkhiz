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

    const post = await Post.findOne(req.params.id);

    res.status(200).json({ post });
  } catch (error) {
    res.json(error);
  }
}
