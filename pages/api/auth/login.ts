import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.NEXT_PUBLIC_SECRET;
const psd = process.env.NEXT_PUBLIC_PASSWORD;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username === "admin" && password === psd) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: username,
      },
      secret
    );

    const serialized = serialize("SkyArkhyzJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    res.status(200).json({ message: "Success!" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
