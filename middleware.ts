import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentUser } from "@/lib/auth"

// المسارات المحمية التي تحتاج تسجيل دخول
const protectedPaths = [
  "/dashboard",
  "/cars",
  "/customers",
  "/sales",
  "/rentals",
  "/services",
  "/reports",
  "/users",
  "/settings",
]

// المسارات العامة التي لا تحتاج تسجيل دخول
const publicPaths = ["/", "/login", "/about", "/contact", "/api/auth/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // السماح بالوصول للمسارات العامة
  if (publicPaths.includes(pathname) || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // التحقق من المسارات المحمية
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtectedPath) {
    try {
      const user = await getCurrentUser()

      if (!user) {
        // إعادة توجيه لصفحة تسجيل الدخول
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // السماح بالوصول للمستخدمين المسجلين
      return NextResponse.next()
    } catch (error) {
      console.error("Middleware auth error:", error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
