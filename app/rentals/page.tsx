"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data for rental contracts
const rentals = [
  {
    id: 1,
    contractNumber: "RC-2024-001",
    customer: "أحمد محمد العلي",
    car: "BMW X5 2023",
    startDate: "2024-01-10",
    endDate: "2024-01-17",
    actualReturnDate: null,
    totalAmount: 3500,
    paidAmount: 3500,
    remainingAmount: 0,
    status: "نشط",
    rentalType: "أسبوعي",
    securityDeposit: 1000,
  },
  {
    id: 2,
    contractNumber: "RC-2024-002",
    customer: "سارة أحمد الخالد",
    car: "تويوتا كامري 2024",
    startDate: "2024-01-05",
    endDate: "2024-01-08",
    actualReturnDate: "2024-01-08",
    totalAmount: 600,
    paidAmount: 600,
    remainingAmount: 0,
    status: "مكتمل",
    rentalType: "يومي",
    securityDeposit: 500,
  },
  {
    id: 3,
    contractNumber: "RC-2024-003",
    customer: "محمد عبدالله السعد",
    car: "مرسيدس C200 2023",
    startDate: "2024-01-12",
    endDate: "2024-01-15",
    actualReturnDate: null,
    totalAmount: 1050,
    paidAmount: 750,
    remainingAmount: 300,
    status: "متأخر",
    rentalType: "يومي",
    securityDeposit: 700,
  },
]

export default function RentalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.contractNumber.includes(searchTerm) ||
      rental.customer.includes(searchTerm) ||
      rental.car.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter
    const matchesType = typeFilter === "all" || rental.rentalType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return (
          <Badge variant="default" className="bg-blue-500">
            نشط
          </Badge>
        )
      case "مكتمل":
        return (
          <Badge variant="default" className="bg-green-500">
            مكتمل
          </Badge>
        )
      case "متأخر":
        return <Badge variant="destructive">متأخر</Badge>
      case "ملغي":
        return <Badge variant="secondary">ملغي</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "نشط":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "مكتمل":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "متأخر":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">عقود التأجير</h1>
          <p className="text-muted-foreground">إدارة جميع عقود التأجير</p>
        </div>
        <Button asChild>
          <Link href="/rentals/new">
            <Plus className="mr-2 h-4 w-4" />
            عقد تأجير جديد
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العقود</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">العقود النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {rentals.filter((rental) => rental.status === "نشط").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">العقود المتأخرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {rentals.filter((rental) => rental.status === "متأخر").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {rentals.reduce((sum, rental) => sum + rental.paidAmount, 0).toLocaleString()} ر.س
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
                  placeholder="البحث برقم العقد، العميل، أو السيارة..."
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
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
                <SelectItem value="متأخر">متأخر</SelectItem>
                <SelectItem value="ملغي">ملغي</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="نوع التأجير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="يومي">يومي</SelectItem>
                <SelectItem value="أسبوعي">أسبوعي</SelectItem>
                <SelectItem value="شهري">شهري</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rentals Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة العقود ({filteredRentals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم العقد</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>السيارة</TableHead>
                <TableHead>تاريخ البداية</TableHead>
                <TableHead>تاريخ النهاية</TableHead>
                <TableHead>المبلغ الإجمالي</TableHead>
                <TableHead>المبلغ المدفوع</TableHead>
                <TableHead>المبلغ المتبقي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rental.status)}
                      <div>
                        <div className="font-medium">{rental.contractNumber}</div>
                        <div className="text-sm text-muted-foreground">{rental.rentalType}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{rental.customer}</TableCell>
                  <TableCell>{rental.car}</TableCell>
                  <TableCell>{rental.startDate}</TableCell>
                  <TableCell>
                    <div>
                      <div>{rental.endDate}</div>
                      {rental.actualReturnDate && (
                        <div className="text-sm text-muted-foreground">تم الإرجاع: {rental.actualReturnDate}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{rental.totalAmount.toLocaleString()} ر.س</TableCell>
                  <TableCell className="text-green-600">{rental.paidAmount.toLocaleString()} ر.س</TableCell>
                  <TableCell>
                    {rental.remainingAmount > 0 ? (
                      <span className="text-red-600">{rental.remainingAmount.toLocaleString()} ر.س</span>
                    ) : (
                      <span className="text-green-600">مدفوع بالكامل</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(rental.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/rentals/${rental.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            عرض التفاصيل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/rentals/${rental.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل العقد
                          </Link>
                        </DropdownMenuItem>
                        {rental.status === "نشط" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            إنهاء العقد
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
