import { serialize } from "cookie";

export default async function logout(req, res) {
  const { cookies } = req;

  const jwt = cookies.SkyArkhyzJWT;

  if (!jwt) {
    return res.json({ message: "You are already not logged in" });
  } else {
    const serialized = serialize("SkyArkhyzJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Successfuly logged out!" });
  }
}
