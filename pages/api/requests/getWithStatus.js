import Request from "../../../models/Request";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function getWithStatus(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { status } = req.body;
    const filter = { status };

    const requests = await Request.find(filter).sort("-createdAt");

    if (!requests) {
      return res.status(404).json({ message: "Заявок нет" });
    }

    res.status(200).json({ requests });
  } catch (error) {
    res.json(error);
  }
}
