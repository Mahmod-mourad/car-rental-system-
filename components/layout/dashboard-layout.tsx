"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

// المسارات التي تحتاج لوحة التحكم
const dashboardPaths = [
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

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  // التحقق من أن المسار يحتاج لوحة التحكم
  const isDashboardPath = dashboardPaths.some((path) => pathname.startsWith(path))

  // إذا لم يكن مسار لوحة التحكم أو لا يوجد مستخدم، عرض المحتوى مباشرة
  if (!isDashboardPath || !user) {
    return <>{children}</>
  }

  // عرض لوحة التحكم
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  )
}
