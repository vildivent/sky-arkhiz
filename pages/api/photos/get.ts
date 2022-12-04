import connectMongo from "../../../utils/connectMongo";
import Photo from "../../../models/Photo";
import { categories } from "../../../constasnts";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FilterQuery } from "mongoose";

const getPhotos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    console.log("Mongo connected! Get Photos request");

    const defaultLimit = 5;

    const page = +req.query.page || 0;
    const limit = +req.query.limit || (page ? defaultLimit : 0);

    const { id, q, category } = req.query;

    if (id) {
      const photo = await Photo.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (photo) return res.json({ photo });
      else
        return res
          .status(404)
          .json({ message: "Новости с таким id не существует" });
    }

    let filter: FilterQuery<typeof Photo>;

    if (category) {
      filter = { category };
    }

    if (q) {
      filter = { ...filter, $text: { $search: `\"${q}\"` } };
    }
    const photos = await Photo.find(filter).sort(
      category === categories[1] ? { createdAt: 1 } : { createdAt: -1 }
    );
    const numFound = photos.length;

    if (limit) {
      return res.json({
        photos: photos.slice(page * limit, (page + 1) * limit),
        start: page * limit,
        numFound,
      });
    }

    return res.json({ photos, start: page * limit, numFound });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    res.status(400).json({ message: "Ошибка! Не удалось получить фото" });
  }
};
export default getPhotos;
