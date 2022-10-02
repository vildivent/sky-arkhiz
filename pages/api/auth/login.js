import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = "MYSECRETKEY";

export default async function login(req, res) {
  const { username, password } = req.body;

  //Check in databese
  //if the user with this username
  //and password exists

  if (username === "admin" && password === "admin") {
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
