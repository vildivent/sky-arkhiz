import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/Post";
import type { NextApiRequest, NextApiResponse } from "next";
import type { FilterQuery } from "mongoose";

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    console.log("Mongo connected! Get Posts request");

    const defaultLimit = 5;

    const page = +req.query.page || 0;
    const limit = +req.query.limit || (page ? defaultLimit : 0);

    const { id, q } = req.query;

    if (id) {
      const post = await Post.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
      if (post) return res.json({ post });
      else
        return res
          .status(404)
          .json({ message: "Новости с таким id не существует" });
    }

    let filter: FilterQuery<typeof Post>;
    if (q) {
      filter = { $text: { $search: `\"${q}\"` } };
    }
    const posts = await Post.find(filter).sort("-createdAt");
    const numFound = posts.length;

    if (limit) {
      return res.json({
        posts: posts.slice(page * limit, (page + 1) * limit),
        start: page * limit,
        numFound,
      });
    }

    return res.json({ posts, start: page * limit, numFound });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError")
      return res.status(400).json({ message: "Некорректный формат" });

    res.status(400).json({ message: "Ошибка! Не удалось получить новости" });
  }
};
export default getPosts;
