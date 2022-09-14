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

    const { title, text, imgUrl } = req.body;

    if (imgUrl) {
      const newPostWithImage = new Post({
        title,
        text,
        imgUrl,
      });
      await newPostWithImage.save();
      console.log("Post saved");
      res.status(201).json({ message: "Post saved" });
    } else {
      const newPostWithoutImage = new Post({
        title,
        text,
        imgUrl: "",
      });
      await newPostWithoutImage.save();
      console.log("Post saved");
      res.status(201).json({ message: "Post saved" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
