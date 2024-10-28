export { default } from "next-auth/middleware";

// protect all routes under /(protected)/*
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/clients/:path*",
    "/invoices/:path*",
    "/companies/:path*",
    "/settings/:path*",
  ],
};
