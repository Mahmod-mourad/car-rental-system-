"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  Users,
  ShoppingCart,
  Calendar,
  Wrench,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  UserCheck,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "السيارات",
    href: "/cars",
    icon: Car,
    permission: "cars.view",
    children: [
      {
        title: "عرض السيارات",
        href: "/cars",
        icon: Car,
        permission: "cars.view",
      },
      {
        title: "إضافة سيارة",
        href: "/cars/add",
        icon: Car,
        permission: "cars.create",
      },
    ],
  },
  {
    title: "العملاء",
    href: "/customers",
    icon: Users,
    permission: "customers.view",
  },
  {
    title: "المبيعات",
    href: "/sales",
    icon: ShoppingCart,
    permission: "sales.view",
  },
  {
    title: "التأجير",
    href: "/rentals",
    icon: Calendar,
    permission: "rentals.view",
  },
  {
    title: "الخدمات",
    href: "/services",
    icon: Wrench,
    permission: "services.view",
  },
  {
    title: "التقارير",
    href: "/reports",
    icon: BarChart3,
    permission: "reports.sales",
  },
  {
    title: "المستخدمين",
    href: "/users",
    icon: UserCheck,
    permission: "system.users",
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings,
    permission: "system.settings",
  },
  {
    title: "الإشعارات",
    href: "/notifications",
    icon: Bell,
  },
]

export function SidebarWithPermissions() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const filteredNavigation = navigation.filter((item) => {
    if (!item.permission) return true
    return hasPermission(user, item.permission as any)
  })

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && <h2 className="text-lg font-semibold">نظام إدارة السيارات</h2>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <div key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start gap-3 h-10", isCollapsed && "justify-center px-2")}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Button>
                </Link>

                {/* Sub-navigation */}
                {!isCollapsed && item.children && isActive && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children
                      .filter((child) => !child.permission || hasPermission(user, child.permission as any))
                      .map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-8 text-sm">
                            <child.icon className="h-3 w-3" />
                            <span>{child.title}</span>
                          </Button>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Info */}
      {!isCollapsed && user && (
        <>
          <Separator />
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
