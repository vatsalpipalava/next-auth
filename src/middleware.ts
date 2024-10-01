// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const { pathname } = request.nextUrl;

//   if (
//     token &&
//     (pathname.startsWith("/sign-in") ||
//       pathname.startsWith("/sign-up") ||
//       pathname.startsWith("/verify") ||
//       pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
// };


// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const { pathname } = request.nextUrl;

//   // Check if the user is authenticated
//   const isAuthenticated = Boolean(token);

//   // Redirect authenticated users from public pages to the dashboard
//   if (isAuthenticated && (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Redirect unauthenticated users trying to access protected pages
//   if (!isAuthenticated && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // Allow all other requests
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
// };


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Redirect authenticated users from sign-in, sign-up, verify to dashboard
  if (
    token &&
    (pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up") ||
      pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users from dashboard to sign-in
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
