"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Car,
  Users,
  Calendar,
  Wrench,
  DollarSign,
  BarChart3,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from "lucide-react"

const menuItems = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "إدارة السيارات",
    icon: Car,
    items: [
      { title: "جميع السيارات", href: "/cars" },
      { title: "إضافة سيارة", href: "/cars/add" },
      { title: "السيارات المتاحة", href: "/cars/available" },
      { title: "السيارات المؤجرة", href: "/cars/rented" },
      { title: "السيارات المباعة", href: "/cars/sold" },
    ],
  },
  {
    title: "إدارة العملاء",
    icon: Users,
    items: [
      { title: "جميع العملاء", href: "/customers" },
      { title: "إضافة عميل", href: "/customers/add" },
      { title: "العملاء النشطون", href: "/customers/active" },
      { title: "قائمة الانتظار", href: "/customers/wishlist" },
    ],
  },
  {
    title: "نظام التأجير",
    icon: Calendar,
    items: [
      { title: "عقود التأجير", href: "/rentals" },
      { title: "عقد جديد", href: "/rentals/new" },
      { title: "العقود النشطة", href: "/rentals/active" },
      { title: "العقود المنتهية", href: "/rentals/expired" },
      { title: "جدولة الإرجاع", href: "/rentals/returns" },
    ],
  },
  {
    title: "الخدمات والصيانة",
    icon: Wrench,
    items: [
      { title: "جميع الخدمات", href: "/services" },
      { title: "حجز موعد", href: "/services/book" },
      { title: "الخدمات الجارية", href: "/services/ongoing" },
      { title: "تاريخ الصيانة", href: "/services/history" },
    ],
  },
  {
    title: "المبيعات والمالية",
    icon: DollarSign,
    items: [
      { title: "المبيعات", href: "/sales" },
      { title: "الفواتير", href: "/invoices" },
      { title: "المدفوعات", href: "/payments" },
      { title: "التقارير المالية", href: "/financial-reports" },
    ],
  },
  {
    title: "التقارير والإحصائيات",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "إدارة المستخدمين",
    href: "/users",
    icon: UserCheck,
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <div className={cn("bg-card border-r transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold">معرض السيارات</h2>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.items ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", collapsed && "justify-center")}
                    onClick={() => !collapsed && toggleExpanded(item.title)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && (
                      <>
                        <span className="mr-2">{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 mr-auto transition-transform",
                            expandedItems.includes(item.title) && "rotate-90",
                          )}
                        />
                      </>
                    )}
                  </Button>
                  {!collapsed && expandedItems.includes(item.title) && (
                    <div className="mr-4 mt-2 space-y-1">
                      {item.items.map((subItem) => (
                        <Button
                          key={subItem.href}
                          variant="ghost"
                          size="sm"
                          className={cn("w-full justify-start", pathname === subItem.href && "bg-accent")}
                          asChild
                        >
                          <Link href={subItem.href}>{subItem.title}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center",
                    pathname === item.href && "bg-accent",
                  )}
                  asChild
                >
                  <Link href={item.href!}>
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="mr-2">{item.title}</span>}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
