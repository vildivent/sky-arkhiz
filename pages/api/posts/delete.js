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
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.query;
    const post = await Post.findByIdAndDelete(id);

    if (!post) return res.json({ message: "Новости с таким id не существует" });

    console.log("Post deleted!");
    res.status(200).json({ deletedPost: post, message: "Новость удалена!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось удалить новость" });
  }
}
