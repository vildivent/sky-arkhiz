import Request from "../../../models/Request";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function deleteById(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { id } = req.body;
    const filter = { _id: id };

    const request = await Request.findByIdAndDelete(filter);

    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.status(200).json({ request });
  } catch (error) {
    res.json(error);
  }
}
