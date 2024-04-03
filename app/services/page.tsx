"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Wrench,
  Car,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  CalendarIcon,
  Phone,
  Star,
} from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

// بيانات الخدمات المتاحة
const services = [
  {
    id: 1,
    name: "صيانة دورية شاملة",
    category: "صيانة",
    description: "تغيير زيت المحرك، فحص الفرامل، فحص الإطارات، فحص السوائل والمرشحات",
    price: 300,
    duration: "2-3 ساعات",
    icon: Wrench,
    color: "bg-blue-500",
    features: ["تغيير الزيت", "فحص الفرامل", "فحص الإطارات", "فحص البطارية"],
    rating: 4.8,
    bookings: 156,
  },
  {
    id: 2,
    name: "غسيل وتلميع متكامل",
    category: "تجميل",
    description: "تنظيف داخلي وخارجي، تلميع الطلاء، تنظيف المحرك، حماية الطلاء",
    price: 120,
    duration: "2-3 ساعات",
    icon: Car,
    color: "bg-green-500",
    features: ["غسيل خارجي", "تنظيف داخلي", "تلميع", "حماية الطلاء"],
    rating: 4.6,
    bookings: 89,
  },
  {
    id: 3,
    name: "فحص ما قبل البيع",
    category: "فحص",
    description: "فحص شامل للسيارة، تقرير مفصل عن الحالة، ضمان الفحص",
    price: 250,
    duration: "3-4 ساعات",
    icon: CheckCircle,
    color: "bg-purple-500",
    features: ["فحص المحرك", "فحص الهيكل", "فحص الكهرباء", "تقرير مفصل"],
    rating: 4.9,
    bookings: 67,
  },
  {
    id: 4,
    name: "تأمين السيارات",
    category: "تأمين",
    description: "تأمين شامل وضد الغير، تغطية واسعة، إجراءات سريعة",
    price: 800,
    duration: "30 دقيقة",
    icon: Shield,
    color: "bg-red-500",
    features: ["تأمين شامل", "تأمين ضد الغير", "تغطية الحوادث", "خدمة طوارئ"],
    rating: 4.7,
    bookings: 234,
  },
  {
    id: 5,
    name: "تمويل السيارات",
    category: "تمويل",
    description: "حلول تمويل مرنة، أقساط مريحة، معدلات تنافسية، موافقة سريعة",
    price: 0,
    duration: "1-2 ساعة",
    icon: CreditCard,
    color: "bg-orange-500",
    features: ["أقساط مرنة", "معدلات منخفضة", "موافقة سريعة", "بدون دفعة أولى"],
    rating: 4.5,
    bookings: 123,
  },
  {
    id: 6,
    name: "خدمة الطوارئ",
    category: "طوارئ",
    description: "خدمة 24/7، سحب السيارات، إصلاح طارئ، بطارية طوارئ",
    price: 150,
    duration: "30-60 دقيقة",
    icon: Phone,
    color: "bg-yellow-500",
    features: ["خدمة 24/7", "سحب السيارات", "إصلاح طارئ", "تغيير الإطارات"],
    rating: 4.4,
    bookings: 78,
  },
]

// بيانات المواعيد المحجوزة
const appointments = [
  {
    id: 1,
    customerName: "أحمد محمد",
    phone: "+966 50 123 4567",
    service: "صيانة دورية شاملة",
    date: "2024-01-20",
    time: "10:00",
    status: "مؤكد",
    car: "BMW X5 2023",
    notes: "تغيير زيت المحرك وفحص الفرامل",
  },
  {
    id: 2,
    customerName: "سارة أحمد",
    phone: "+966 55 987 6543",
    service: "غسيل وتلميع متكامل",
    date: "2024-01-20",
    time: "14:00",
    status: "قيد التنفيذ",
    car: "تويوتا كامري 2024",
    notes: "تنظيف شامل مع تلميع",
  },
  {
    id: 3,
    customerName: "محمد علي",
    phone: "+966 56 456 7890",
    service: "فحص ما قبل البيع",
    date: "2024-01-21",
    time: "09:00",
    status: "مجدول",
    car: "مرسيدس C200 2022",
    notes: "فحص شامل قبل البيع",
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [carInfo, setCarInfo] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const categories = ["all", "صيانة", "تجميل", "فحص", "تأمين", "تمويل", "طوارئ"]
  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.includes(searchTerm) || service.description.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBookService = (serviceId: number) => {
    setSelectedService(serviceId)
  }

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يتم إرسال البيانات للباك إند
    console.log("Booking submitted:", {
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      customerName,
      customerPhone,
      carInfo,
      notes,
    })
    // إعادة تعيين النموذج
    setSelectedService(null)
    setSelectedDate(undefined)
    setSelectedTime("")
    setCustomerName("")
    setCustomerPhone("")
    setCarInfo("")
    setNotes("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مؤكد":
        return <Badge className="bg-green-500">مؤكد</Badge>
      case "قيد التنفيذ":
        return <Badge className="bg-blue-500">قيد التنفيذ</Badge>
      case "مجدول":
        return <Badge variant="outline">مجدول</Badge>
      case "مكتمل":
        return <Badge className="bg-gray-500">مكتمل</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">الخدمات</h1>
              <p className="text-muted-foreground">احجز خدمة لسيارتك من خدماتنا المتميزة</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">خدمة مكتملة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.7</div>
                <div className="text-sm text-gray-600">تقييم الخدمة</div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="ابحث عن الخدمة المناسبة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فئة الخدمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الخدمات</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">الخدمات المتاحة</TabsTrigger>
            <TabsTrigger value="appointments">المواعيد المحجوزة</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary">{service.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{service.bookings} حجز</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        {service.price > 0 ? (
                          <div className="text-2xl font-bold text-green-600">{service.price} ر.س</div>
                        ) : (
                          <div className="text-lg font-semibold text-blue-600">استشارة مجانية</div>
                        )}
                      </div>
                      <Button onClick={() => handleBookService(service.id)} className="group-hover:bg-primary/90">
                        <Plus className="w-4 h-4 ml-1" />
                        احجز الآن
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد خدمات مطابقة</h3>
                <p className="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
              </div>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <CalendarIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.customerName}</h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {appointment.phone}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-gray-600">الخدمة</Label>
                        <p className="font-medium">{appointment.service}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">التاريخ والوقت</Label>
                        <p className="font-medium">
                          {appointment.date} - {appointment.time}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">السيارة</Label>
                        <p className="font-medium">{appointment.car}</p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <Label className="text-sm text-gray-600">ملاحظات</Label>
                        <p className="text-sm mt-1">{appointment.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>حجز خدمة: {services.find((s) => s.id === selectedService)?.name}</CardTitle>
              <CardDescription>املأ البيانات التالية لحجز موعد الخدمة</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">اسم العميل *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="أدخل اسم العميل"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">رقم الهاتف *</Label>
                    <Input
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+966 50 123 4567"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carInfo">معلومات السيارة *</Label>
                  <Input
                    id="carInfo"
                    value={carInfo}
                    onChange={(e) => setCarInfo(e.target.value)}
                    placeholder="مثال: تويوتا كامري 2023"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>تاريخ الموعد *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-right font-normal bg-transparent"
                        >
                          <CalendarIcon className="ml-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>وقت الموعد *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوقت" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي ملاحظات أو طلبات خاصة..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    تأكيد الحجز
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedService(null)} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
