import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  // Pages
  "/",
  "/terms",
  "/privacy",
  "/explore",
  "/partnerships",
  "/search(.*)",
  "/blog(.*)",
  "/auth/callback",

  // Auth
  "/login(.*)",
  "/sign-up(.*)",
  "/_next/static/(.*)", // Allow Next.js static assets

  // API
  "/api/(.*)",

  // Docs
  "/docs(.*)",
  "/eliza(.*)",

  // Static
  "/sitemap(.*)",
  "/.well-known/apple-developer-merchantid-domain-association",

  // Rewrites
  "/ingest(.*)",
  "/widget(.*)",
  "/monitoring(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Handle public routes
  console.log("NODE_ENV:", process.env.NODE_ENV);
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Keep going for public routes
  }

  // Protect non-public routes
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
