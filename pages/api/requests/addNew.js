import Request from "../../../models/Request";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function addNew(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const { name, phoneNumber, groupSize, dates, comment } = req.body.data;
    const referral = req.cookies.SkyArkhyzReferral || "";

    const newRequest = new Request({
      name,
      phoneNumber,
      groupSize,
      dates: [...dates],
      comment,
      status: "new",
      excursionDate: new Date(0),
      referral,
    });

    await newRequest.save();
    console.log("Request added!");

    res.status(201).json({ message: "Request added!" });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
