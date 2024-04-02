"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Phone, Mail, Star } from "lucide-react"
import Link from "next/link"

// Mock data for customers
const customers = [
  {
    id: 1,
    name: "أحمد محمد العلي",
    phone: "+966501234567",
    email: "ahmed@example.com",
    city: "الرياض",
    licenseNumber: "L123456789",
    licenseExpiry: "2025-12-31",
    rating: 5,
    totalRentals: 8,
    totalPurchases: 1,
    lastActivity: "2024-01-15",
    status: "نشط",
  },
  {
    id: 2,
    name: "سارة أحمد الخالد",
    phone: "+966509876543",
    email: "sara@example.com",
    city: "جدة",
    licenseNumber: "L987654321",
    licenseExpiry: "2024-08-15",
    rating: 4,
    totalRentals: 3,
    totalPurchases: 0,
    lastActivity: "2024-01-10",
    status: "نشط",
  },
  {
    id: 3,
    name: "محمد عبدالله السعد",
    phone: "+966512345678",
    email: "mohammed@example.com",
    city: "الدمام",
    licenseNumber: "L456789123",
    licenseExpiry: "2026-03-20",
    rating: 3,
    totalRentals: 1,
    totalPurchases: 2,
    lastActivity: "2023-12-28",
    status: "غير نشط",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cityFilter, setCityFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchTerm) || customer.phone.includes(searchTerm) || customer.email.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    const matchesCity = cityFilter === "all" || customer.city === cityFilter

    return matchesSearch && matchesStatus && matchesCity
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return (
          <Badge variant="default" className="bg-green-500">
            نشط
          </Badge>
        )
      case "غير نشط":
        return <Badge variant="secondary">غير نشط</Badge>
      case "محظور":
        return <Badge variant="destructive">محظور</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة العملاء</h1>
          <p className="text-muted-foreground">إدارة جميع عملاء المعرض</p>
        </div>
        <Button asChild>
          <Link href="/customers/add">
            <Plus className="mr-2 h-4 w-4" />
            إضافة عميل جديد
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">العملاء النشطون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {customers.filter((customer) => customer.status === "نشط").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التأجيرات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {customers.reduce((sum, customer) => sum + customer.totalRentals, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {customers.reduce((sum, customer) => sum + customer.totalPurchases, 0)}
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
                  placeholder="البحث بالاسم، الهاتف، أو البريد الإلكتروني..."
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
                <SelectItem value="غير نشط">غير نشط</SelectItem>
                <SelectItem value="محظور">محظور</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="المدينة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المدن</SelectItem>
                <SelectItem value="الرياض">الرياض</SelectItem>
                <SelectItem value="جدة">جدة</SelectItem>
                <SelectItem value="الدمام">الدمام</SelectItem>
                <SelectItem value="مكة">مكة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة العملاء ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>المدينة</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>التأجيرات</TableHead>
                <TableHead>المشتريات</TableHead>
                <TableHead>آخر نشاط</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">رخصة: {customer.licenseNumber}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getRatingStars(customer.rating)}
                      <span className="text-sm text-muted-foreground mr-1">({customer.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.totalRentals}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.totalPurchases}</Badge>
                  </TableCell>
                  <TableCell>{customer.lastActivity}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/customers/${customer.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            عرض التفاصيل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/customers/${customer.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/rentals/new?customer=${customer.id}`}>
                            <Plus className="mr-2 h-4 w-4" />
                            عقد تأجير جديد
                          </Link>
                        </DropdownMenuItem>
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
