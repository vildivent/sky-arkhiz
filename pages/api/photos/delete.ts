import connectMongo from "../../../utils/connectMongo";
import Photo from "../../../models/Photo";
import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXT_PUBLIC_SECRET;

const deletePhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jwt = req.cookies["SkyArkhyzJWT"];
    if (!jwt)
      return res
        .status(401)
        .json({ message: "Отсутствует токен аутентификации!" });

    await jose.jwtVerify(jwt, new TextEncoder().encode(`${secret}`));

    await connectMongo();
    console.log("Mongo connected! Delete Photo request");

    const { id } = req.query;
    const photo = await Photo.findByIdAndDelete(id);

    if (!photo)
      return res.status(404).json({ message: "Фото с таким id не существует" });

    console.log("Photo deleted from db!");

    await fetch(photo.imgUrl, {
      method: "delete",
    });
    console.log("Photo deleted from storage!");

    res.status(200).json({ deletedPhoto: photo, message: "Фото удалено!" });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    if (error.code === "ERR_JWS_INVALID")
      return res
        .status(403)
        .json({ message: "Некорректный токен аутентификации!" });

    res.status(400).json({ message: "Ошибка! Не удалось удалить фото" });
  }
};
export default deletePhoto;
