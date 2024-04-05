import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

export interface User {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
  status: "active" | "inactive"
  avatar: string
}

// تعريف الأدوار والصلاحيات
export const ROLE_PERMISSIONS = {
  super_admin: [
    "system.all",
    "users.all",
    "cars.all",
    "customers.all",
    "sales.all",
    "rentals.all",
    "services.all",
    "reports.all",
    "settings.all",
  ],
  admin: [
    "users.view",
    "users.create",
    "users.edit",
    "cars.all",
    "customers.all",
    "sales.all",
    "rentals.all",
    "services.all",
    "reports.all",
    "settings.view",
  ],
  sales_manager: ["cars.view", "cars.edit", "customers.all", "sales.all", "reports.sales", "reports.customers"],
  rental_manager: ["cars.view", "customers.all", "rentals.all", "reports.rentals"],
  service_manager: ["cars.view", "customers.view", "services.all", "reports.services"],
  accountant: ["sales.view", "rentals.view", "services.view", "reports.financial", "reports.sales", "reports.rentals"],
  sales_employee: ["cars.view", "customers.view", "customers.create", "customers.edit", "sales.view", "sales.create"],
  rental_employee: ["cars.view", "customers.view", "customers.create", "rentals.view", "rentals.create"],
  service_employee: ["cars.view", "customers.view", "services.view", "services.create"],
  receptionist: ["customers.view", "customers.create", "appointments.all"],
  viewer: ["cars.view", "customers.view", "reports.view"],
}

// المستخدمين التجريبيين
const DEMO_USERS: Record<string, Omit<User, "permissions">> = {
  "admin@cardealer.com": {
    id: 1,
    name: "أحمد محمد",
    email: "admin@cardealer.com",
    role: "super_admin",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "sales@cardealer.com": {
    id: 2,
    name: "سارة أحمد",
    email: "sales@cardealer.com",
    role: "sales_manager",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "rental@cardealer.com": {
    id: 3,
    name: "محمد علي",
    email: "rental@cardealer.com",
    role: "rental_manager",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "accountant@cardealer.com": {
    id: 4,
    name: "فاطمة حسن",
    email: "accountant@cardealer.com",
    role: "accountant",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  "employee@cardealer.com": {
    id: 5,
    name: "خالد عبدالله",
    email: "employee@cardealer.com",
    role: "sales_employee",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
}

const JWT_SECRET = new TextEncoder().encode("car-dealership-secret-key-2024-very-secure")

export async function createToken(user: Omit<User, "permissions">): Promise<string> {
  const permissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || []

  return await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    status: user.status,
    avatar: user.avatar,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    const permissions = ROLE_PERMISSIONS[payload.role as keyof typeof ROLE_PERMISSIONS] || []

    return {
      id: payload.id as number,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as string,
      status: payload.status as "active" | "inactive",
      avatar: payload.avatar as string,
      permissions,
    }
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    return await verifyToken(token)
  } catch (error) {
    console.error("Get current user failed:", error)
    return null
  }
}

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false
  return user.permissions.includes(permission) || user.permissions.includes("system.all")
}

export function canAccessRoute(user: User | null, route: string): boolean {
  if (!user) return false

  const routePermissions: Record<string, string[]> = {
    "/dashboard": [],
    "/cars": ["cars.view"],
    "/cars/add": ["cars.create", "cars.all"],
    "/customers": ["customers.view"],
    "/sales": ["sales.view"],
    "/rentals": ["rentals.view"],
    "/services": ["services.view"],
    "/reports": ["reports.view", "reports.sales", "reports.rentals", "reports.financial"],
    "/users": ["users.view", "system.all"],
    "/settings": ["settings.view", "system.all"],
  }

  const requiredPermissions = routePermissions[route]
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true
  }

  return requiredPermissions.some((permission) => hasPermission(user, permission))
}

export function getDemoUser(email: string): Omit<User, "permissions"> | null {
  return DEMO_USERS[email] || null
}
