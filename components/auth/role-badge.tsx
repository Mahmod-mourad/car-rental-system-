"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoleBadgeProps {
  role: string
  className?: string
}

const roleConfig = {
  super_admin: { label: "مدير النظام الأعلى", color: "bg-red-500 text-white" },
  admin: { label: "مدير النظام", color: "bg-orange-500 text-white" },
  sales_manager: { label: "مدير المبيعات", color: "bg-blue-500 text-white" },
  rental_manager: { label: "مدير التأجير", color: "bg-green-500 text-white" },
  service_manager: { label: "مدير الخدمات", color: "bg-purple-500 text-white" },
  accountant: { label: "محاسب", color: "bg-yellow-500 text-black" },
  sales_employee: { label: "موظف مبيعات", color: "bg-cyan-500 text-white" },
  rental_employee: { label: "موظف تأجير", color: "bg-teal-500 text-white" },
  service_employee: { label: "موظف خدمات", color: "bg-indigo-500 text-white" },
  technician: { label: "فني", color: "bg-gray-500 text-white" },
  receptionist: { label: "موظف استقبال", color: "bg-pink-500 text-white" },
  viewer: { label: "مشاهد", color: "bg-gray-300 text-black" },
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const config = roleConfig[role as keyof typeof roleConfig] || {
    label: role,
    color: "bg-gray-500 text-white",
  }

  return <Badge className={cn(config.color, className)}>{config.label}</Badge>
}
