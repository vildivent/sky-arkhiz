import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function getAllPosts(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!!");

    const posts = await Post.find().sort("-createdAt");
    if (!posts) {
      return res.status(404).json({ message: "Постов нет" });
    }

    res.status(200).json({ posts });
  } catch (error) {
    res.json(error);
  }
}
