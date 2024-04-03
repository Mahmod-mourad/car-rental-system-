"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Building, Mail, Phone, MapPin, DollarSign, Bell, Shield, Database, Save, Upload, Download } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Company Information
    companyName: "معرض السيارات المتميز",
    companyPhone: "+966 11 123 4567",
    companyEmail: "info@carshowroom.sa",
    companyAddress: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    companyWebsite: "www.carshowroom.sa",
    companyLogo: "",

    // Financial Settings
    defaultCurrency: "SAR",
    taxRate: 15,
    rentalDepositPercentage: 20,
    lateFeePerDay: 50,

    // Rental Settings
    maxRentalDays: 90,
    minCustomerAge: 25,
    mileageLimitDaily: 300,
    excessMileageRate: 0.5,

    // Working Hours
    workingHoursStart: "08:00",
    workingHoursEnd: "22:00",
    weekendDays: ["friday"],

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    notificationEmail: "notifications@carshowroom.sa",

    // System Settings
    language: "ar",
    timezone: "Asia/Riyadh",
    dateFormat: "DD/MM/YYYY",
    autoBackup: true,
    backupFrequency: "daily",

    // Security Settings
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireTwoFactor: false,
    allowMultipleSessions: true,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Implementation for saving settings
  }

  const handleExportSettings = () => {
    console.log("Exporting settings")
    // Implementation for exporting settings
  }

  const handleImportSettings = () => {
    console.log("Importing settings")
    // Implementation for importing settings
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إعدادات النظام</h1>
          <p className="text-muted-foreground">إدارة إعدادات المعرض والنظام</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportSettings}>
            <Download className="mr-2 h-4 w-4" />
            تصدير الإعدادات
          </Button>
          <Button variant="outline" onClick={handleImportSettings}>
            <Upload className="mr-2 h-4 w-4" />
            استيراد الإعدادات
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">معلومات الشركة</TabsTrigger>
          <TabsTrigger value="financial">الإعدادات المالية</TabsTrigger>
          <TabsTrigger value="rental">إعدادات التأجير</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="system">إعدادات النظام</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
        </TabsList>

        {/* Company Information */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                معلومات الشركة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">اسم الشركة</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">الموقع الإلكتروني</Label>
                  <Input
                    id="companyWebsite"
                    value={settings.companyWebsite}
                    onChange={(e) => setSettings((prev) => ({ ...prev, companyWebsite: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, companyPhone: e.target.value }))}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => setSettings((prev) => ({ ...prev, companyEmail: e.target.value }))}
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">العنوان</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="companyAddress"
                    value={settings.companyAddress}
                    onChange={(e) => setSettings((prev) => ({ ...prev, companyAddress: e.target.value }))}
                    className="pr-10"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyLogo">شعار الشركة</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSettings((prev) => ({ ...prev, companyLogo: URL.createObjectURL(file) }))
                      }
                    }}
                  />
                  {settings.companyLogo && (
                    <img
                      src={settings.companyLogo || "/placeholder.svg"}
                      alt="Company Logo"
                      className="w-16 h-16 object-contain border rounded"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                الإعدادات المالية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">العملة الافتراضية</Label>
                  <Select
                    value={settings.defaultCurrency}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, defaultCurrency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                      <SelectItem value="EUR">يورو (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">معدل الضريبة المضافة (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings((prev) => ({ ...prev, taxRate: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rentalDepositPercentage">نسبة التأمين من قيمة التأجير (%)</Label>
                  <Input
                    id="rentalDepositPercentage"
                    type="number"
                    value={settings.rentalDepositPercentage}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, rentalDepositPercentage: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lateFeePerDay">غرامة التأخير اليومية (ر.س)</Label>
                  <Input
                    id="lateFeePerDay"
                    type="number"
                    value={settings.lateFeePerDay}
                    onChange={(e) => setSettings((prev) => ({ ...prev, lateFeePerDay: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rental Settings */}
        <TabsContent value="rental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التأجير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxRentalDays">أقصى عدد أيام للتأجير</Label>
                  <Input
                    id="maxRentalDays"
                    type="number"
                    value={settings.maxRentalDays}
                    onChange={(e) => setSettings((prev) => ({ ...prev, maxRentalDays: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minCustomerAge">الحد الأدنى لعمر المستأجر</Label>
                  <Input
                    id="minCustomerAge"
                    type="number"
                    value={settings.minCustomerAge}
                    onChange={(e) => setSettings((prev) => ({ ...prev, minCustomerAge: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileageLimitDaily">حد الكيلومترات اليومي</Label>
                  <Input
                    id="mileageLimitDaily"
                    type="number"
                    value={settings.mileageLimitDaily}
                    onChange={(e) => setSettings((prev) => ({ ...prev, mileageLimitDaily: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excessMileageRate">رسوم الكيلومترات الإضافية (ر.س/كم)</Label>
                  <Input
                    id="excessMileageRate"
                    type="number"
                    step="0.1"
                    value={settings.excessMileageRate}
                    onChange={(e) => setSettings((prev) => ({ ...prev, excessMileageRate: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>ساعات العمل</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workingHoursStart">بداية العمل</Label>
                    <Input
                      id="workingHoursStart"
                      type="time"
                      value={settings.workingHoursStart}
                      onChange={(e) => setSettings((prev) => ({ ...prev, workingHoursStart: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workingHoursEnd">نهاية العمل</Label>
                    <Input
                      id="workingHoursEnd"
                      type="time"
                      value={settings.workingHoursEnd}
                      onChange={(e) => setSettings((prev) => ({ ...prev, workingHoursEnd: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>الرسائل النصية</Label>
                    <p className="text-sm text-muted-foreground">إرسال إشعارات عبر الرسائل النصية</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">بريد الإشعارات</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => setSettings((prev) => ({ ...prev, notificationEmail: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                إعدادات النظام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">اللغة</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">تنسيق التاريخ</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, dateFormat: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">تكرار النسخ الاحتياطي</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">يومي</SelectItem>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>النسخ الاحتياطي التلقائي</Label>
                  <p className="text-sm text-muted-foreground">إنشاء نسخ احتياطية تلقائية للبيانات</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoBackup: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">انتهاء الجلسة (دقيقة)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings((prev) => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">الحد الأدنى لطول كلمة المرور</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => setSettings((prev) => ({ ...prev, passwordMinLength: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">طلب رمز تحقق إضافي عند تسجيل الدخول</p>
                  </div>
                  <Switch
                    checked={settings.requireTwoFactor}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, requireTwoFactor: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>السماح بجلسات متعددة</Label>
                    <p className="text-sm text-muted-foreground">السماح للمستخدم بتسجيل الدخول من أجهزة متعددة</p>
                  </div>
                  <Switch
                    checked={settings.allowMultipleSessions}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, allowMultipleSessions: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
