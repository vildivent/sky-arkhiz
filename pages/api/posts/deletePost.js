import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function createPost(req, res) {
  try {
    console.log("Connecting to Mongo...");
    await connectMongo();
    console.log("Mongo connected!");

    const { post } = req.body;

    if (post._id) {
      await post.deleteOne({ _id: post._id });
      console.log("Post deleted");
      res.status(201).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post id not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
