"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function UnauthorizedPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">غير مصرح بالوصول</CardTitle>
          <CardDescription>ليس لديك الصلاحية للوصول إلى هذه الصفحة</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {user && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">مسجل الدخول كـ:</p>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          )}

          <p className="text-muted-foreground">
            تحتاج إلى صلاحيات إضافية للوصول إلى هذا المحتوى. يرجى التواصل مع مدير النظام.
          </p>

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                الرئيسية
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="javascript:history.back()">
                <ArrowRight className="mr-2 h-4 w-4" />
                العودة
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
