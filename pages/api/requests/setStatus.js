import Request from "../../../models/Request";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function setStatus(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id, status } = req.body;
    const filter = { _id: id };

    const request = await Request.findOneAndUpdate(
      filter,
      [{ $set: { status } }],
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.status(200).json({ request });
  } catch (error) {
    res.json(error);
  }
}
