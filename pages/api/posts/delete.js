import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";
import * as jose from "jose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const secret = process.env.NEXT_PUBLIC_SECRET;

export default async function deletePost(req, res) {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "You don't have auth token to proceed" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.query;

    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.json({ message: "такого поста не существует" });
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    if (error.code === "ERR_JWS_INVALID")
      return res.status(403).json({ message: "Wrong auth token" });
    res.status(400).json({ error });
  }
}
