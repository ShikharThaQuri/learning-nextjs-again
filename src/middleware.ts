import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";

const portectedRoutes = [
  "/Admin-Page",
  "/Admin-Page/Add-Product",
  "/Admin-Page/Delete-Product",
  "/Admin-Page/Update-Product",
];
const publicRoutes = ["/Login", "/Register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookie = req.cookies.get("session");
  const isProtectedRoute = portectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = cookie?.value as string;

  const decoded = await decrypt(token);

  if (isProtectedRoute && !decoded) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  if (isPublicRoute && decoded) {
    return NextResponse.redirect(new URL("/Admin-Page", req.url));
  }

  return NextResponse.next();
}
