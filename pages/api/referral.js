import { serialize } from "cookie";
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function referral(req, res) {
  const seconds = 60,
    minutes = 60,
    hours = 24,
    days = 1;
  try {
    const { ref } = req.query;
    if (!ref) {
      return res.status(400).json({ message: "Некорректный формат" });
    }
    const serialized = serialize("SkyArkhyzReferral", ref, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: seconds * minutes * hours * days,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Success! Referral cookie setted" });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
