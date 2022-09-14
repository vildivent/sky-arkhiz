export default async function dashboardData(req, res) {
  const { cookies } = req;

  const jwt = cookies.SkyArkhyzJWT;

  if (!jwt) return res.json({ message: "Invalid token!" });

  res.json({ data: "top secret data" });
}
