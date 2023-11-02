export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        "/editor/:path*",
        "/admin/:path*",
        "/user/:path*"
    ]
 }