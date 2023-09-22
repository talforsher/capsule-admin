// import { NextResponse } from "next/server";

// export function middleware(request) {
//   if (request.nextUrl.pathname.startsWith("/lunarServer")) {
//     const url = new URL(request.nextUrl.href);
//     const params = url.searchParams;
//     return NextResponse.rewrite(
//       new URL(
//         request.nextUrl.pathname.replace("/lunarServer", ""),
//         `http://172.16.0.120:${process.env.PRODUCTION === "TRUE" ? 4545 : 5545}`
//       ).href + (params.toString() ? `?${params.toString()}` : "")
//     );
//   } else if (request.nextUrl.pathname.startsWith("/playground/server")) {
//     const url = new URL(request.nextUrl.href);
//     const params = url.searchParams;
//     return NextResponse.rewrite(
//       new URL(
//         request.nextUrl.pathname.replace("/playground/server", ""),
//         `https://${process.env.PRODUCTION === "TRUE" ? "" : "staging."}webz.io`
//       ).href + (params.toString() ? `?${params.toString()}` : "")
//     );
//   }

//   return NextResponse.next();
// }

import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/aws")) {
    const url = new URL(
      req.nextUrl.pathname.replace("/aws", ""),
      `https://96ezm6oys2.execute-api.us-east-2.amazonaws.com`
    ).href;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
