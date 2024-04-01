"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Wrench,
  Bell,
} from "lucide-react"
import Link from "next/link"

// بيانات وهمية للإحصائيات
const stats = {
  cars: {
    total: 156,
    available: 134,
    rented: 18,
    sold: 4,
  },
  customers: {
    total: 1247,
    active: 89,
    new: 12,
  },
  revenue: {
    today: 45000,
    month: 890000,
    year: 8900000,
  },
  rentals: {
    active: 18,
    pending: 5,
    overdue: 2,
  },
}

// بيانات الأنشطة الأخيرة
const recentActivities = [
  {
    id: 1,
    type: "sale",
    title: "بيع سيارة BMW X5",
    description: "تم بيع السيارة للعميل أحمد محمد",
    time: "منذ 30 دقيقة",
    amount: 320000,
    status: "completed",
  },
  {
    id: 2,
    type: "rental",
    title: "تأجير سيارة Mercedes C-Class",
    description: "تم تأجير السيارة لمدة أسبوع",
    time: "منذ ساعة",
    amount: 2450,
    status: "active",
  },
  {
    id: 3,
    type: "service",
    title: "صيانة دورية - Toyota Camry",
    description: "تم إنجاز الصيانة الدورية",
    time: "منذ 2 ساعة",
    status: "completed",
  },
  {
    id: 4,
    type: "customer",
    title: "عميل جديد",
    description: "انضم عميل جديد: سارة أحمد",
    time: "منذ 3 ساعات",
    status: "new",
  },
]

// التنبيهات المهمة
const alerts = [
  {
    id: 1,
    type: "warning",
    title: "سيارات متأخرة في الإرجاع",
    description: "2 سيارة متأخرة في الإرجاع",
    action: "عرض التفاصيل",
  },
  {
    id: 2,
    type: "info",
    title: "صيانة مجدولة",
    description: "5 سيارات تحتاج صيانة دورية",
    action: "جدولة المواعيد",
  },
  {
    id: 3,
    type: "success",
    title: "هدف المبيعات",
    description: "تم تحقيق 85% من هدف الشهر",
    action: "عرض التقرير",
  },
]

export default function DashboardPage() {
  const { user, hasPermission } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">جاري التحميل...</h2>
          <p className="text-gray-500 mt-2">نظام إدارة معرض السيارات</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">مرحباً، {user.name}</h1>
            <p className="text-blue-100 text-lg">
              {user.role === "super_admin" && "مدير النظام الأعلى - صلاحيات كاملة"}
              {user.role === "sales_manager" && "مدير المبيعات - إدارة المبيعات والسيارات"}
              {user.role === "rental_manager" && "مدير التأجير - إدارة عقود التأجير"}
              {user.role === "accountant" && "محاسب - التقارير المالية والمدفوعات"}
              {user.role === "sales_employee" && "موظف مبيعات - بيع السيارات وإدارة العملاء"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">اليوم</div>
            <div className="text-2xl font-bold">{new Date().toLocaleDateString("ar-SA")}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hasPermission("cars.view") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إجمالي السيارات</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.cars.total}</p>
                  <p className="text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 inline ml-1" />
                    متاح: {stats.cars.available}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {hasPermission("customers.view") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">العملاء</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.customers.total}</p>
                  <p className="text-sm text-blue-600">
                    <Users className="w-4 h-4 inline ml-1" />
                    نشط: {stats.customers.active}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {hasPermission("sales.view") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">إيرادات اليوم</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.revenue.today.toLocaleString()}</p>
                  <p className="text-sm text-green-600">
                    <DollarSign className="w-4 h-4 inline ml-1" />
                    ريال سعودي
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {hasPermission("rentals.view") && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">التأجير النشط</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.rentals.active}</p>
                  <p className="text-sm text-orange-600">
                    <Calendar className="w-4 h-4 inline ml-1" />
                    معلق: {stats.rentals.pending}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              التنبيهات المهمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {alert.type === "warning" && <AlertCircle className="w-5 h-5 text-orange-500" />}
                    {alert.type === "info" && <Clock className="w-5 h-5 text-blue-500" />}
                    {alert.type === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              الأنشطة الأخيرة
            </CardTitle>
            <CardDescription>آخر العمليات في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {activity.type === "sale" && <DollarSign className="w-5 h-5 text-blue-600" />}
                    {activity.type === "rental" && <Calendar className="w-5 h-5 text-green-600" />}
                    {activity.type === "service" && <Wrench className="w-5 h-5 text-orange-600" />}
                    {activity.type === "customer" && <Users className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="text-left">
                      <p className="font-bold text-green-600">{activity.amount.toLocaleString()} ريال</p>
                    </div>
                  )}
                  <Badge
                    variant={
                      activity.status === "completed"
                        ? "default"
                        : activity.status === "active"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {activity.status === "completed" && "مكتمل"}
                    {activity.status === "active" && "نشط"}
                    {activity.status === "new" && "جديد"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              إجراءات سريعة
            </CardTitle>
            <CardDescription>الوصول السريع للوظائف الأساسية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {hasPermission("cars.view") && (
                <Link href="/cars/add">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Car className="w-6 h-6" />
                    <span>إضافة سيارة</span>
                  </Button>
                </Link>
              )}

              {hasPermission("customers.view") && (
                <Link href="/customers">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Users className="w-6 h-6" />
                    <span>إدارة العملاء</span>
                  </Button>
                </Link>
              )}

              {hasPermission("sales.view") && (
                <Link href="/sales">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <DollarSign className="w-6 h-6" />
                    <span>المبيعات</span>
                  </Button>
                </Link>
              )}

              {hasPermission("rentals.view") && (
                <Link href="/rentals">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Calendar className="w-6 h-6" />
                    <span>التأجير</span>
                  </Button>
                </Link>
              )}

              {hasPermission("services.view") && (
                <Link href="/services">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <Wrench className="w-6 h-6" />
                    <span>الخدمات</span>
                  </Button>
                </Link>
              )}

              {hasPermission("reports.view") && (
                <Link href="/reports">
                  <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                    <BarChart3 className="w-6 h-6" />
                    <span>التقارير</span>
                  </Button>
                </Link>
              )}

              <Link href="/settings">
                <Button className="w-full h-20 flex flex-col gap-2 bg-transparent" variant="outline">
                  <Settings className="w-6 h-6" />
                  <span>الإعدادات</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart (for users with reports permission) */}
      {hasPermission("reports.view") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              نظرة عامة على الإيرادات
            </CardTitle>
            <CardDescription>الإيرادات الشهرية من جميع الأقسام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">المبيعات</h3>
                <p className="text-3xl font-bold text-blue-600">{(stats.revenue.month * 0.6).toLocaleString()}</p>
                <p className="text-sm text-blue-600">60% من الإيرادات</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">التأجير</h3>
                <p className="text-3xl font-bold text-green-600">{(stats.revenue.month * 0.3).toLocaleString()}</p>
                <p className="text-sm text-green-600">30% من الإيرادات</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-800">الخدمات</h3>
                <p className="text-3xl font-bold text-orange-600">{(stats.revenue.month * 0.1).toLocaleString()}</p>
                <p className="text-sm text-orange-600">10% من الإيرادات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
