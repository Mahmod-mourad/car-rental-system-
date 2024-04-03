"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  Unlock,
} from "lucide-react"
import Link from "next/link"

// Mock data for users
const users = [
  {
    id: 1,
    name: "أحمد محمد العلي",
    email: "ahmed@carshowroom.sa",
    phone: "+966501234567",
    role: "admin",
    permissions: ["users", "cars", "customers", "sales", "rentals", "services", "reports"],
    status: "active",
    lastLogin: "2024-01-15 10:30",
    createdAt: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40&text=أم",
  },
  {
    id: 2,
    name: "سارة أحمد الخالد",
    email: "sara@carshowroom.sa",
    phone: "+966509876543",
    role: "sales_manager",
    permissions: ["cars", "customers", "sales"],
    status: "active",
    lastLogin: "2024-01-14 16:45",
    createdAt: "2023-08-20",
    avatar: "/placeholder.svg?height=40&width=40&text=س",
  },
  {
    id: 3,
    name: "محمد عبدالله السعد",
    email: "mohammed@carshowroom.sa",
    phone: "+966512345678",
    role: "rental_manager",
    permissions: ["cars", "customers", "rentals"],
    status: "active",
    lastLogin: "2024-01-13 09:15",
    createdAt: "2023-09-10",
    avatar: "/placeholder.svg?height=40&width=40&text=م",
  },
  {
    id: 4,
    name: "فاطمة علي الزهراني",
    email: "fatima@carshowroom.sa",
    phone: "+966587654321",
    role: "service_manager",
    permissions: ["services", "customers"],
    status: "inactive",
    lastLogin: "2024-01-10 14:20",
    createdAt: "2023-11-05",
    avatar: "/placeholder.svg?height=40&width=40&text=ف",
  },
]

const roles = [
  { value: "admin", label: "مدير النظام", color: "bg-red-500" },
  { value: "sales_manager", label: "مدير المبيعات", color: "bg-blue-500" },
  { value: "rental_manager", label: "مدير التأجير", color: "bg-green-500" },
  { value: "service_manager", label: "مدير الخدمات", color: "bg-purple-500" },
  { value: "employee", label: "موظف", color: "bg-gray-500" },
  { value: "accountant", label: "محاسب", color: "bg-yellow-500" },
]

const permissions = [
  { id: "users", label: "إدارة المستخدمين" },
  { id: "cars", label: "إدارة السيارات" },
  { id: "customers", label: "إدارة العملاء" },
  { id: "sales", label: "المبيعات" },
  { id: "rentals", label: "التأجير" },
  { id: "services", label: "الخدمات" },
  { id: "reports", label: "التقارير" },
  { id: "settings", label: "الإعدادات" },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    permissions: [] as string[],
    password: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.includes(searchTerm) || user.email.includes(searchTerm) || user.phone.includes(searchTerm)
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    const roleInfo = roles.find((r) => r.value === role)
    if (!roleInfo) return <Badge>{role}</Badge>

    return <Badge className={`${roleInfo.color} text-white`}>{roleInfo.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500 text-white">نشط</Badge>
    ) : (
      <Badge variant="secondary">غير نشط</Badge>
    )
  }

  const handleAddUser = () => {
    console.log("Adding user:", newUser)
    setIsAddDialogOpen(false)
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "",
      permissions: [],
      password: "",
    })
  }

  const togglePermission = (permissionId: string) => {
    setNewUser((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const toggleUserStatus = (userId: number) => {
    console.log("Toggling status for user:", userId)
  }

  const deleteUser = (userId: number) => {
    console.log("Deleting user:", userId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">إدارة مستخدمي النظام والصلاحيات</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="example@carshowroom.sa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={newUser.phone}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">الدور الوظيفي</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدور" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="أدخل كلمة مرور قوية"
                />
              </div>

              <div className="space-y-3">
                <Label>الصلاحيات</Label>
                <div className="grid grid-cols-2 gap-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission.id}
                        checked={newUser.permissions.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <Label htmlFor={permission.id} className="text-sm">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddUser} className="flex-1">
                  إضافة المستخدم
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter((user) => user.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المديرون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {users.filter((user) => user.role.includes("manager") || user.role === "admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">آخر تسجيل دخول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">اليوم</div>
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
                  placeholder="البحث بالاسم، البريد، أو الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="الدور الوظيفي" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>الدور</TableHead>
                <TableHead>الصلاحيات</TableHead>
                <TableHead>آخر تسجيل دخول</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permissions.find((p) => p.id === permission)?.label}
                        </Badge>
                      ))}
                      {user.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {user.lastLogin}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${user.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            تعديل
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === "active" ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              إلغاء التفعيل
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4" />
                              تفعيل
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${user.id}/permissions`}>
                            <Shield className="mr-2 h-4 w-4" />
                            إدارة الصلاحيات
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
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
