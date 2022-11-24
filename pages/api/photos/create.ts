import connectMongo from "../../../utils/connectMongo";
import Photo, { IPhoto } from "../../../models/Photo";
import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXT_PUBLIC_SECRET;

const createPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected! Create Photo request");

    const { title, imgUrl, category } = req.body as PhotoCreateParams;

    const newPhoto: IPhoto = new Photo({
      title,
      imgUrl,
      category,
    });

    await newPhoto.save();
    console.log("Photo saved!");

    res
      .status(201)
      .json({ createdPhoto: newPhoto, message: "Фото добавлено!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось добавить фото" });
  }
};
export default createPhoto;

export type PhotoCreateParams = {
  title: string;
  imgUrl: string;
  category?: string;
};
