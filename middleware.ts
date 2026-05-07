import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Goal } from "lucide-react";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

const isAdminRoute = createRouteMatcher([
  "/users(.*)",
  "/logs(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role as string | undefined;

  // not logged in and trying to access protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // logged in but trying to access admin routes without proper role
  if (
    userId &&
    isAdminRoute(req) &&
    role !== "admin_global" &&
    role !== "admin_metier"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // logged in and trying to access auth pages
  if (userId && isPublicRoute(req) && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};