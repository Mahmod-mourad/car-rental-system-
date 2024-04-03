"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Car,
  Calendar,
  Wrench,
  DollarSign,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Settings,
} from "lucide-react"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "rental_reminder",
    title: "تذكير إرجاع السيارة",
    message: "عقد التأجير RC-2024-001 ينتهي غداً - BMW X5",
    timestamp: "منذ ساعتين",
    isRead: false,
    priority: "high",
    icon: Calendar,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "service_completed",
    title: "اكتمال الخدمة",
    message: "تم إنهاء صيانة دورية لسيارة مرسيدس C200",
    timestamp: "منذ 4 ساعات",
    isRead: false,
    priority: "medium",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "payment_received",
    title: "تم استلام دفعة",
    message: "تم استلام دفعة 15,000 ر.س من العميل أحمد محمد",
    timestamp: "منذ 6 ساعات",
    isRead: true,
    priority: "medium",
    icon: DollarSign,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "maintenance_due",
    title: "صيانة مستحقة",
    message: "5 سيارات تحتاج صيانة دورية هذا الأسبوع",
    timestamp: "منذ يوم",
    isRead: true,
    priority: "low",
    icon: Wrench,
    color: "text-orange-500",
  },
  {
    id: 5,
    type: "new_inquiry",
    title: "استفسار جديد",
    message: "عميل مهتم بتويوتا كامري 2024 - يطلب معاينة",
    timestamp: "منذ يومين",
    isRead: true,
    priority: "medium",
    icon: Car,
    color: "text-purple-500",
  },
]

const notificationSettings = [
  {
    id: "rental_reminders",
    title: "تذكيرات التأجير",
    description: "تنبيهات انتهاء عقود التأجير والإرجاع",
    email: true,
    sms: true,
    push: true,
  },
  {
    id: "service_updates",
    title: "تحديثات الخدمات",
    description: "إشعارات حالة الصيانة والخدمات",
    email: true,
    sms: false,
    push: true,
  },
  {
    id: "payment_notifications",
    title: "إشعارات المدفوعات",
    description: "تنبيهات الدفع والفواتير المستحقة",
    email: true,
    sms: true,
    push: false,
  },
  {
    id: "system_alerts",
    title: "تنبيهات النظام",
    description: "إشعارات النظام والأخطاء",
    email: true,
    sms: false,
    push: true,
  },
  {
    id: "marketing_updates",
    title: "التحديثات التسويقية",
    description: "العروض والأخبار الجديدة",
    email: false,
    sms: false,
    push: false,
  },
]

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [settings, setSettings] = useState(notificationSettings)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedTab === "all") return true
    if (selectedTab === "unread") return !notification.isRead
    if (selectedTab === "high") return notification.priority === "high"
    return notification.type === selectedTab
  })

  const markAsRead = (id: number) => {
    console.log("Marking notification as read:", id)
  }

  const markAllAsRead = () => {
    console.log("Marking all notifications as read")
  }

  const updateSetting = (settingId: string, type: "email" | "sms" | "push", value: boolean) => {
    setSettings((prev) => prev.map((setting) => (setting.id === settingId ? { ...setting, [type]: value } : setting)))
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">عالية</Badge>
      case "medium":
        return <Badge variant="default">متوسطة</Badge>
      case "low":
        return <Badge variant="secondary">منخفضة</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">الإشعارات</h1>
            <p className="text-muted-foreground">إدارة جميع الإشعارات والتنبيهات</p>
          </div>
          {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} غير مقروء</Badge>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            تحديد الكل كمقروء
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="unread">غير مقروء</TabsTrigger>
          <TabsTrigger value="high">عالية الأولوية</TabsTrigger>
          <TabsTrigger value="rental_reminder">التأجير</TabsTrigger>
          <TabsTrigger value="service_completed">الخدمات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Notifications List */}
        <TabsContent value="all" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            getPriorityBadge={getPriorityBadge}
          />
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            getPriorityBadge={getPriorityBadge}
          />
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            getPriorityBadge={getPriorityBadge}
          />
        </TabsContent>

        <TabsContent value="rental_reminder" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            getPriorityBadge={getPriorityBadge}
          />
        </TabsContent>

        <TabsContent value="service_completed" className="space-y-4">
          <NotificationsList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            getPriorityBadge={getPriorityBadge}
          />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings.map((setting) => (
                <div key={setting.id} className="space-y-4 p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">البريد الإلكتروني</span>
                      </div>
                      <Switch
                        checked={setting.email}
                        onCheckedChange={(checked) => updateSetting(setting.id, "email", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">رسائل نصية</span>
                      </div>
                      <Switch
                        checked={setting.sms}
                        onCheckedChange={(checked) => updateSetting(setting.id, "sms", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">إشعارات فورية</span>
                      </div>
                      <Switch
                        checked={setting.push}
                        onCheckedChange={(checked) => updateSetting(setting.id, "push", checked)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Notifications List Component
function NotificationsList({
  notifications,
  onMarkAsRead,
  getPriorityBadge,
}: {
  notifications: typeof notifications
  onMarkAsRead: (id: number) => void
  getPriorityBadge: (priority: string) => React.ReactNode
}) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`cursor-pointer transition-colors hover:bg-muted/50 ${
            !notification.isRead ? "border-l-4 border-l-primary bg-muted/20" : ""
          }`}
          onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                <notification.icon className="h-5 w-5" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>{notification.title}</h3>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(notification.priority)}
                    {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{notification.message}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {notification.timestamp}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">لا توجد إشعارات</h3>
            <p className="text-sm text-muted-foreground">لم يتم العثور على إشعارات في هذا القسم</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
