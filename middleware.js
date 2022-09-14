import { NextResponse } from "next/server";
import * as jose from "jose";

const secret = process.env.SECRET;

export default async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const jwt = req.cookies.get("SkyArkhyzJWT");

    const url = req.nextUrl.clone();
    url.pathname = "/login";

    if (jwt === undefined) {
      return NextResponse.redirect(url);
    }
    try {
      console.log("trying to verify jwt");
      const verifying = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(`${secret}`)
      );
      console.log("verifying", verifying);
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    const jwt = req.cookies.get("SkyArkhyzJWT");

    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";

    if (jwt !== undefined) {
      try {
        console.log("trying to verify jwt");
        const verifying = await jose.jwtVerify(
          jwt,
          new TextEncoder().encode(`${secret}`)
        );
        console.log("verifying", verifying);
        return NextResponse.redirect(url);
      } catch (e) {
        return NextResponse.next();
      }
    }
  }
  return NextResponse.next();
}
