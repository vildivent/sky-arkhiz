import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function createPost(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { title, text, imgUrl, srcUrl } = req.body;

    const newPost = new Post({
      title,
      text: [...text],
      imgUrl,
      srcUrl,
    });

    await newPost.save();
    console.log("Post saved!");

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
