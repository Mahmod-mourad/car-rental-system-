"use client"

import { useAuth } from "@/hooks/use-auth"
import { hasPermission } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

interface PermissionGuardProps {
  children: ReactNode
  permission?: string
  fallback?: ReactNode
}

export function PermissionGuard({ children, permission, fallback }: PermissionGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (!loading && user && permission && !hasPermission(user, permission)) {
      router.push("/unauthorized")
    }
  }, [user, loading, permission, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (permission && !hasPermission(user, permission)) {
    return fallback || null
  }

  return <>{children}</>
}
