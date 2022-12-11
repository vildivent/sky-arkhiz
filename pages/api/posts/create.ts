import connectMongo from "../../../utils/connectMongo";
import Post, { IPost } from "../../../models/Post";
import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXT_PUBLIC_SECRET;

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected! Create Post request");

    const { title, text, imgUrl, aspectRatio, srcUrl } =
      req.body as PostCreateParams;

    const newPost: IPost = new Post({
      title,
      text: [...text],
      imgUrl,
      aspectRatio,
      srcUrl,
    });

    await newPost.save();
    console.log("Post saved!");

    res.status(201).json({ createdPost: newPost, message: "Новость создана!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось создать новость" });
  }
};
export default createPost;

export type PostCreateParams = {
  title: string;
  text: string[];
  imgUrl?: string;
  aspectRatio?: number;
  srcUrl?: string;
};
