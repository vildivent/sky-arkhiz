import Request from "../../../models/Request";
import connectMongo from "../../../utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function setData(req, res) {
  try {
    await connectMongo();
    console.log("Mongo connected!");

    const {
      id,
      status,
      groupSize,
      excursionDate,
      description,
      groupNumber,
      settings,
    } = req.body;
    const filter = { _id: id };

    if (status !== undefined) {
      await Request.findOneAndUpdate(filter, [{ $set: { status } }], {
        new: true,
      });
    }
    if (groupSize !== undefined) {
      await Request.findOneAndUpdate(filter, [{ $set: { groupSize } }], {
        new: true,
      });
    }
    if (excursionDate !== undefined) {
      const date = new Date(excursionDate * 1000);

      await Request.findOneAndUpdate(
        filter,
        [{ $set: { excursionDate: date } }],
        {
          new: true,
        }
      );
    }
    if (description !== undefined) {
      await Request.findOneAndUpdate(filter, [{ $set: { description } }], {
        new: true,
      });
    }
    if (groupNumber !== undefined) {
      await Request.findOneAndUpdate(filter, [{ $set: { groupNumber } }], {
        new: true,
      });
    }

    const request = await Request.findOne(filter);

    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.status(200).json({ request, settings });
  } catch (error) {
    res.json(error);
  }
}
