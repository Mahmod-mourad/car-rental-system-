import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "نظام إدارة معرض السيارات",
  description: "نظام شامل لإدارة معرض السيارات - المبيعات والتأجير والخدمات",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
          <DashboardLayout>{children}</DashboardLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
