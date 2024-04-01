"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPin, CreditCard, Shield, Users, Navigation, Baby, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

// Mock car data
const car = {
  id: 1,
  brand: "BMW",
  model: "X5",
  year: 2024,
  image: "/placeholder.svg?height=200&width=300&text=BMW+X5",
  dailyRental: 500,
  weeklyRental: 3000,
  monthlyRental: 10000,
  deposit: 2000,
}

// Additional services
const additionalServices = [
  {
    id: "gps",
    name: "نظام GPS",
    description: "نظام ملاحة متقدم",
    price: 50,
    icon: Navigation,
  },
  {
    id: "child-seat",
    name: "مقعد أطفال",
    description: "مقعد أمان للأطفال",
    price: 30,
    icon: Baby,
  },
  {
    id: "driver",
    name: "سائق خاص",
    description: "سائق محترف متاح 24/7",
    price: 200,
    icon: Users,
  },
  {
    id: "insurance",
    name: "تأمين شامل",
    description: "تغطية شاملة ضد جميع المخاطر",
    price: 100,
    icon: Shield,
  },
]

export default function BookCarPage() {
  const [pickupDate, setPickupDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [pickupTime, setPickupTime] = useState("")
  const [returnTime, setReturnTime] = useState("")
  const [rentalType, setRentalType] = useState("daily")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [pickupLocation, setPickupLocation] = useState("")
  const [returnLocation, setReturnLocation] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    address: "",
  })

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0
    const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    const days = calculateDays()
    let basePrice = 0

    switch (rentalType) {
      case "daily":
        basePrice = days * car.dailyRental
        break
      case "weekly":
        const weeks = Math.ceil(days / 7)
        basePrice = weeks * car.weeklyRental
        break
      case "monthly":
        const months = Math.ceil(days / 30)
        basePrice = months * car.monthlyRental
        break
    }

    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId)
      return total + (service ? service.price * days : 0)
    }, 0)

    return {
      basePrice,
      servicesTotal,
      deposit: car.deposit,
      total: basePrice + servicesTotal + car.deposit,
    }
  }

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking submission
    console.log("Booking submitted:", {
      car,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      rentalType,
      selectedServices,
      pickupLocation,
      returnLocation,
      customerInfo,
      total: calculateTotal(),
    })
  }

  const pricing = calculateTotal()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href={`/cars/${car.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                العودة للسيارة
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">حجز السيارة</h1>
              <p className="text-muted-foreground">
                {car.brand} {car.model} {car.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rental Period */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    فترة التأجير
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>نوع التأجير</Label>
                      <Select value={rentalType} onValueChange={setRentalType}>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>تاريخ الاستلام</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {pickupDate ? format(pickupDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>تاريخ الإرجاع</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {returnDate ? format(returnDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            disabled={(date) => date < (pickupDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>وقت الاستلام</Label>
                      <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 صباحاً</SelectItem>
                          <SelectItem value="10:00">10:00 صباحاً</SelectItem>
                          <SelectItem value="11:00">11:00 صباحاً</SelectItem>
                          <SelectItem value="12:00">12:00 ظهراً</SelectItem>
                          <SelectItem value="13:00">01:00 مساءً</SelectItem>
                          <SelectItem value="14:00">02:00 مساءً</SelectItem>
                          <SelectItem value="15:00">03:00 مساءً</SelectItem>
                          <SelectItem value="16:00">04:00 مساءً</SelectItem>
                          <SelectItem value="17:00">05:00 مساءً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>وقت الإرجاع</Label>
                      <Select value={returnTime} onValueChange={setReturnTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 صباحاً</SelectItem>
                          <SelectItem value="10:00">10:00 صباحاً</SelectItem>
                          <SelectItem value="11:00">11:00 صباحاً</SelectItem>
                          <SelectItem value="12:00">12:00 ظهراً</SelectItem>
                          <SelectItem value="13:00">01:00 مساءً</SelectItem>
                          <SelectItem value="14:00">02:00 مساءً</SelectItem>
                          <SelectItem value="15:00">03:00 مساءً</SelectItem>
                          <SelectItem value="16:00">04:00 مساءً</SelectItem>
                          <SelectItem value="17:00">05:00 مساءً</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {pickupDate && returnDate && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        مدة التأجير: <strong>{calculateDays()} يوم</strong>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pickup & Return Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    مواقع الاستلام والإرجاع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>موقع الاستلام</Label>
                      <Select value={pickupLocation} onValueChange={setPickupLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر موقع الاستلام" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="showroom">المعرض الرئيسي</SelectItem>
                          <SelectItem value="airport">مطار الملك خالد</SelectItem>
                          <SelectItem value="hotel">الفندق</SelectItem>
                          <SelectItem value="home">التوصيل للمنزل (+50 ر.س)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>موقع الإرجاع</Label>
                      <Select value={returnLocation} onValueChange={setReturnLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر موقع الإرجاع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="showroom">المعرض الرئيسي</SelectItem>
                          <SelectItem value="airport">مطار الملك خالد</SelectItem>
                          <SelectItem value="hotel">الفندق</SelectItem>
                          <SelectItem value="home">الاستلام من المنزل (+50 ر.س)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Services */}
              <Card>
                <CardHeader>
                  <CardTitle>الخدمات الإضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {additionalServices.map((service) => (
                      <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <service.icon className="h-4 w-4 text-primary" />
                            <label htmlFor={service.id} className="font-medium cursor-pointer">
                              {service.name}
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <Badge variant="outline">{service.price} ر.س/يوم</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المستأجر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="أدخل الاسم الكامل"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+966 5X XXX XXXX"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="license">رقم رخصة القيادة *</Label>
                      <Input
                        id="license"
                        value={customerInfo.licenseNumber}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                        placeholder="رقم الرخصة"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licenseExpiry">تاريخ انتهاء الرخصة *</Label>
                      <Input
                        id="licenseExpiry"
                        type="date"
                        value={customerInfo.licenseExpiry}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, licenseExpiry: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">العنوان</Label>
                      <Input
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="العنوان الكامل"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        أوافق على{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          الشروط والأحكام
                        </Link>{" "}
                        و
                        <Link href="/privacy" className="text-primary hover:underline">
                          سياسة الخصوصية
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="age" required />
                      <label htmlFor="age" className="text-sm cursor-pointer">
                        أؤكد أن عمري 25 سنة أو أكثر وأحمل رخصة قيادة سارية
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            {/* Car Summary */}
            <Card>
              <CardHeader>
                <CardTitle>ملخص الحجز</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">
                      {car.brand} {car.model} {car.year}
                    </h4>
                    <p className="text-sm text-muted-foreground">سيارة فاخرة</p>
                  </div>
                </div>

                {pickupDate && returnDate && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>من:</span>
                      <span>{format(pickupDate, "PPP", { locale: ar })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>إلى:</span>
                      <span>{format(returnDate, "PPP", { locale: ar })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المدة:</span>
                      <span>{calculateDays()} يوم</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل التكلفة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>تكلفة التأجير ({rentalType}):</span>
                    <span>{pricing.basePrice.toLocaleString()} ر.س</span>
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">الخدمات الإضافية:</div>
                      {selectedServices.map((serviceId) => {
                        const service = additionalServices.find((s) => s.id === serviceId)
                        if (!service) return null
                        return (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span>• {service.name}</span>
                            <span>{(service.price * calculateDays()).toLocaleString()} ر.س</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>التأمين المالي:</span>
                    <span>{pricing.deposit.toLocaleString()} ر.س</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع:</span>
                  <span>{pricing.total.toLocaleString()} ر.س</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  * التأمين المالي قابل للاسترداد عند إرجاع السيارة بحالة جيدة
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  طرق الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox id="credit-card" defaultChecked />
                  <label htmlFor="credit-card" className="text-sm">
                    بطاقة ائتمان
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="bank-transfer" />
                  <label htmlFor="bank-transfer" className="text-sm">
                    تحويل بنكي
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="cash" />
                  <label htmlFor="cash" className="text-sm">
                    نقداً عند الاستلام
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!pickupDate || !returnDate || !customerInfo.name || !customerInfo.phone}
              onClick={handleSubmit}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              تأكيد الحجز
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
