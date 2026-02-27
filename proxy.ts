import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession();

  const isLogInPage = pathname.startsWith("/auth/login");
  const isRegisterPage = pathname.startsWith("/auth/register");

  if (session?.user && (isLogInPage || isRegisterPage)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
