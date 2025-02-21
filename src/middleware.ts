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
  //"/.*\\.(png|jpg|jpeg|gif|svg|ico|webp)", // Match image files at root or any path

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
  console.log("Request URL:", req.url);
  console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (isPublicRoute(req)) {
    return NextResponse.next(); // Keep going for public routes
  }

  // Protect non-public routes
  try {
    await auth.protect();
  } catch (error) {
    console.error("Clerk protect error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
