import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ message: "تم تسجيل الخروج بنجاح" })

    // حذف التوكن من الكوكيز
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
