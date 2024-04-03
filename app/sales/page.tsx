"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Eye,
  FileText,
  DollarSign,
  TrendingUp,
  Calendar,
  Car,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

// Mock data for sales
const sales = [
  {
    id: 1,
    saleNumber: "SALE-2024-001",
    customer: "أحمد محمد العلي",
    car: "BMW X5 2024",
    saleDate: "2024-01-15",
    totalAmount: 280000,
    paidAmount: 280000,
    paymentMethod: "bank_transfer",
    status: "completed",
    salesperson: "سارة أحمد",
  },
  {
    id: 2,
    saleNumber: "SALE-2024-002",
    customer: "محمد عبدالله السعد",
    car: "تويوتا كامري 2024",
    saleDate: "2024-01-12",
    totalAmount: 95000,
    paidAmount: 30000,
    paymentMethod: "financing",
    status: "pending",
    salesperson: "أحمد محمد",
  },
  {
    id: 3,
    saleNumber: "SALE-2024-003",
    customer: "فاطمة علي الزهراني",
    car: "مرسيدس C200 2023",
    saleDate: "2024-01-10",
    totalAmount: 180000,
    paidAmount: 180000,
    paymentMethod: "cash",
    status: "completed",
    salesperson: "سارة أحمد",
  },
]

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.saleNumber.includes(searchTerm) || sale.customer.includes(searchTerm) || sale.car.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesPayment = paymentFilter === "all" || sale.paymentMethod === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 text-white">مكتملة</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white">معلقة</Badge>
      case "cancelled":
        return <Badge variant="destructive">ملغية</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentMethodBadge = (method: string) => {
    const methods = {
      cash: { label: "نقدي", color: "bg-green-600" },
      card: { label: "بطاقة", color: "bg-blue-600" },
      bank_transfer: { label: "تحويل بنكي", color: "bg-purple-600" },
      financing: { label: "تمويل", color: "bg-orange-600" },
    }

    const methodInfo = methods[method as keyof typeof methods]
    return <Badge className={`${methodInfo?.color || "bg-gray-600"} text-white`}>{methodInfo?.label || method}</Badge>
  }

  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0)
  const completedSales = sales.filter((sale) => sale.status === "completed")
  const pendingSales = sales.filter((sale) => sale.status === "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المبيعات</h1>
          <p className="text-muted-foreground">إدارة جميع عمليات بيع السيارات</p>
        </div>
        <Button asChild>
          <Link href="/sales/new">
            <Plus className="mr-2 h-4 w-4" />
            عملية بيع جديدة
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              إجمالي المبيعات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales.toLocaleString()} ر.س</div>
            <div className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% من الشهر الماضي
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Car className="h-4 w-4" />
              السيارات المباعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
            <div className="text-xs text-muted-foreground">هذا الشهر</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المبيعات المكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedSales.length}</div>
            <div className="text-xs text-muted-foreground">
              {completedSales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()} ر.س
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المبيعات المعلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingSales.length}</div>
            <div className="text-xs text-muted-foreground">
              {pendingSales.reduce((sum, sale) => sum + (sale.totalAmount - sale.paidAmount), 0).toLocaleString()} ر.س
              متبقي
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>البحث والفلترة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث برقم البيع، العميل، أو السيارة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="completed">مكتملة</SelectItem>
                <SelectItem value="pending">معلقة</SelectItem>
                <SelectItem value="cancelled">ملغية</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطرق</SelectItem>
                <SelectItem value="cash">نقدي</SelectItem>
                <SelectItem value="card">بطاقة</SelectItem>
                <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                <SelectItem value="financing">تمويل</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفترات</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
                <SelectItem value="year">هذا العام</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المبيعات ({filteredSales.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم البيع</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>تاريخ البيع</TableHead>
                <TableHead>المبلغ الإجمالي</TableHead>
                <TableHead>المبلغ المدفوع</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div className="font-medium">{sale.saleNumber}</div>
                    <div className="text-sm text-muted-foreground">بواسطة: {sale.salesperson}</div>
                  </TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.car}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {sale.saleDate}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{sale.totalAmount.toLocaleString()} ر.س</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-green-600">{sale.paidAmount.toLocaleString()} ر.س</div>
                      {sale.totalAmount > sale.paidAmount && (
                        <div className="text-sm text-red-600">
                          متبقي: {(sale.totalAmount - sale.paidAmount).toLocaleString()} ر.س
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getPaymentMethodBadge(sale.paymentMethod)}</TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/${sale.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            عرض التفاصيل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/${sale.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/sales/${sale.id}/invoice`}>
                            <FileText className="mr-2 h-4 w-4" />
                            طباعة الفاتورة
                          </Link>
                        </DropdownMenuItem>
                        {sale.status === "pending" && (
                          <DropdownMenuItem asChild>
                            <Link href={`/sales/${sale.id}/payment`}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              إضافة دفعة
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
