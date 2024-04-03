"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign, Car, Users, Calendar, Download, FileText } from "lucide-react"
import type { DateRange } from "react-day-picker"

// Mock data for reports
const monthlyRevenue = [
  { month: "يناير", sales: 450000, rentals: 120000, services: 35000 },
  { month: "فبراير", sales: 380000, rentals: 140000, services: 42000 },
  { month: "مارس", sales: 520000, rentals: 160000, services: 38000 },
  { month: "أبريل", sales: 470000, rentals: 180000, services: 45000 },
  { month: "مايو", sales: 610000, rentals: 200000, services: 52000 },
  { month: "يونيو", sales: 580000, rentals: 220000, services: 48000 },
]

const carUtilization = [
  { category: "سيدان", utilization: 85, revenue: 180000 },
  { category: "SUV", utilization: 92, revenue: 320000 },
  { category: "هاتشباك", utilization: 78, revenue: 95000 },
  { category: "رياضية", utilization: 65, revenue: 150000 },
  { category: "بيك أب", utilization: 88, revenue: 210000 },
]

const servicePerformance = [
  { name: "صيانة دورية", count: 145, revenue: 43500 },
  { name: "إصلاحات", count: 89, revenue: 67200 },
  { name: "تنظيف", count: 234, revenue: 18720 },
  { name: "فحص", count: 67, revenue: 20100 },
]

const customerSegments = [
  { name: "عملاء VIP", value: 25, color: "#8884d8" },
  { name: "عملاء منتظمون", value: 45, color: "#82ca9d" },
  { name: "عملاء جدد", value: 30, color: "#ffc658" },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [reportType, setReportType] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const kpiData = [
    {
      title: "إجمالي الإيرادات",
      value: "2,847,000 ر.س",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "السيارات المباعة",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Car,
      color: "text-blue-600",
    },
    {
      title: "عقود التأجير",
      value: "89",
      change: "+15.3%",
      trend: "up",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "العملاء النشطون",
      value: "234",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const exportReport = (format: string) => {
    console.log(`Exporting report as ${format}`)
    // Implementation for export functionality
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التقارير والإحصائيات</h1>
          <p className="text-muted-foreground">تحليل شامل لأداء المعرض</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport("pdf")}>
            <FileText className="mr-2 h-4 w-4" />
            تصدير PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport("excel")}>
            <Download className="mr-2 h-4 w-4" />
            تصدير Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فلاتر التقرير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="نوع التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">نظرة عامة</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
                <SelectItem value="rentals">التأجير</SelectItem>
                <SelectItem value="services">الخدمات</SelectItem>
                <SelectItem value="customers">العملاء</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">يومي</SelectItem>
                <SelectItem value="weekly">أسبوعي</SelectItem>
                <SelectItem value="monthly">شهري</SelectItem>
                <SelectItem value="yearly">سنوي</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpi.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                {kpi.change} من الشهر الماضي
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="utilization">استخدام السيارات</TabsTrigger>
          <TabsTrigger value="services">أداء الخدمات</TabsTrigger>
          <TabsTrigger value="customers">تحليل العملاء</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="المبيعات" />
                  <Bar dataKey="rentals" fill="#82ca9d" name="التأجير" />
                  <Bar dataKey="services" fill="#ffc658" name="الخدمات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>نمو الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="المبيعات" />
                    <Line type="monotone" dataKey="rentals" stroke="#82ca9d" strokeWidth={2} name="التأجير" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>توزيع الإيرادات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>المبيعات</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>التأجير</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>الخدمات</span>
                    <span className="font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="utilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معدل استخدام السيارات حسب الفئة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={carUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#8884d8" name="معدل الاستخدام %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أداء الخدمات</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={servicePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="عدد الخدمات" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="الإيرادات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>تصنيف العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات العملاء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>إجمالي العملاء</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>عملاء جدد هذا الشهر</span>
                  <span className="font-bold text-green-600">+89</span>
                </div>
                <div className="flex justify-between">
                  <span>معدل الاحتفاظ</span>
                  <span className="font-bold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span>متوسط قيمة العميل</span>
                  <span className="font-bold">15,750 ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>العملاء النشطون</span>
                  <span className="font-bold">456</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
