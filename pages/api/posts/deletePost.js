import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function deletePost(req, res) {
  try {
    console.log("Connecting to Mongo...");
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;

    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.json({ message: "такого поста не существует" });
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
