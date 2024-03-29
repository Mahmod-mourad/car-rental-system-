"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Car, Eye, EyeOff, Loader2, User, Shield, CreditCard, Calculator, UserCheck } from "lucide-react"

// الحسابات التجريبية
const demoAccounts = [
  {
    email: "admin@cardealer.com",
    role: "مدير النظام الأعلى",
    description: "جميع الصلاحيات",
    icon: Shield,
    color: "bg-red-500",
  },
  {
    email: "sales@cardealer.com",
    role: "مدير المبيعات",
    description: "إدارة المبيعات والسيارات والعملاء",
    icon: Car,
    color: "bg-blue-500",
  },
  {
    email: "rental@cardealer.com",
    role: "مدير التأجير",
    description: "إدارة عقود التأجير والمتابعة",
    icon: CreditCard,
    color: "bg-green-500",
  },
  {
    email: "accountant@cardealer.com",
    role: "محاسب",
    description: "التقارير المالية والمدفوعات",
    icon: Calculator,
    color: "bg-purple-500",
  },
  {
    email: "employee@cardealer.com",
    role: "موظف مبيعات",
    description: "بيع السيارات وإدارة العملاء",
    icon: UserCheck,
    color: "bg-orange-500",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في نظام إدارة معرض السيارات",
        })
        router.push("/dashboard")
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
    } catch (error) {
      setError("حدث خطأ في تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("123456")
    setIsLoading(true)
    setError("")

    try {
      const success = await login(demoEmail, "123456")
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحباً بك كـ ${demoAccounts.find((acc) => acc.email === demoEmail)?.role}`,
        })
        router.push("/dashboard")
      } else {
        setError("فشل في تسجيل الدخول")
      }
    } catch (error) {
      setError("حدث خطأ في تسجيل الدخول")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
              <CardDescription>نظام إدارة معرض السيارات</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cardealer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="123456"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-right pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    تسجيل الدخول
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">الحسابات التجريبية</h2>
            <p className="text-gray-600">اختر حساب للدخول المباشر (كلمة المرور: 123456)</p>
          </div>

          <div className="grid gap-4">
            {demoAccounts.map((account) => (
              <Card
                key={account.email}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => handleDemoLogin(account.email)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${account.color} rounded-full flex items-center justify-center`}>
                      <account.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{account.role}</h3>
                        <Badge variant="secondary" className="text-xs">
                          تجريبي
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{account.description}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDemoLogin(account.email)
                      }}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "دخول"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              جميع الحسابات تستخدم كلمة المرور: <strong>123456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
