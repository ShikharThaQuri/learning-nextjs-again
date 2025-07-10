import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyCookie } from "./lib/auth/session";

const portectedRoutes = [
  "/Admin-Page",
  "/Admin-Page/Add-Product",
  "/Admin-Page/Delete-Product",
  "/Admin-Page/Update-Product",
];
const publicRoutes = ["/Login", "/Register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = portectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = (await cookies()).get("session")?.value || "";

  const session = verifyCookie(token);

  // console.log("session-Check", session);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/Admin-Page", req.url));
  }

  return NextResponse.next();
}
