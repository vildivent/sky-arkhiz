import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";
import * as jose from "jose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const secret = process.env.NEXT_PUBLIC_SECRET;

export default async function createPost(req, res) {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

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

    res.status(201).json({ createdPost: newPost, message: "Новость создана!" });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось создать новость" });
  }
}
