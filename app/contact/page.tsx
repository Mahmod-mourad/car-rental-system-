"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Headphones } from "lucide-react"

// معلومات التواصل - بيانات حقيقية
const contactInfo = [
  {
    id: 1,
    title: "الهاتف",
    value: "+966 11 4445566 (المركز الرئيسي)",
    secondaryValue: "+966 55 0444777 (المبيعات)",
    icon: Phone,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "البريد الإلكتروني",
    value: "info@alnahda-motors.com.sa",
    secondaryValue: "sales@alnahda-motors.com.sa",
    icon: Mail,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "العنوان",
    value: "طريق الملك فهد، بناء 5522، الرياض 12511",
    secondaryValue: "مقابل مدينة الملك فهد الطبية - قرب الخليج الدولي",
    icon: MapPin,
    color: "bg-red-500",
  },
  {
    id: 4,
    title: "ساعات العمل",
    value: "السبت - الخميس: 9:00 صباحاً - 22:00 مساءً",
    secondaryValue: "الجمعة: 16:00 - 23:00 مساءً",
    icon: Clock,
    color: "bg-purple-500",
  },
]

// أقسام الاستفسارات
const inquiryTypes = [
  { value: "sales", label: "استفسار عن البيع" },
  { value: "rental", label: "استفسار عن التأجير" },
  { value: "service", label: "استفسار عن الخدمات" },
  { value: "complaint", label: "شكوى أو اقتراح" },
  { value: "other", label: "أخرى" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // محاكاة إرسال النموذج
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // إعادة تعيين النموذج بعد 3 ثوان
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">اتصل بنا</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا في أي وقت وسنكون سعداء للإجابة على جميع استفساراتك
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6" />
              <span>خدمة 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <span>رد سريع</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span>فريق متخصص</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <Card key={info.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center`}>
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                          <p className="text-gray-700 mb-1">{info.value}</p>
                          <p className="text-gray-600 text-sm">{info.secondaryValue}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  اتصال سريع
                </CardTitle>
                <CardDescription>للحصول على مساعدة فورية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Phone className="w-5 h-5 ml-2" />
                  اتصل الآن
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <MessageSquare className="w-5 h-5 ml-2" />
                  دردشة مباشرة
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
                <CardDescription>املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</CardDescription>
              </CardHeader>

              <CardContent>
                {isSubmitted ? (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+966 50 123 4567"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>نوع الاستفسار *</Label>
                        <Select
                          value={formData.inquiryType}
                          onValueChange={(value) => handleInputChange("inquiryType", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الاستفسار" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">الموضوع *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="موضوع الرسالة"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">الرسالة *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 ml-2" />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                موقعنا
              </CardTitle>
              <CardDescription>زورنا في معرضنا الرئيسي في الرياض</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">خريطة الموقع</p>
                  <p className="text-sm">شارع الملك فهد، الرياض</p>
                  <p className="text-sm">المملكة العربية السعودية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ما هي ساعات العمل؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  نعمل من السبت إلى الخميس من 9:00 صباحاً حتى 10:00 مساءً، ويوم الجمعة من 2:00 ظهراً حتى 10:00 مساءً.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل تقدمون خدمة التوصيل؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  نعم، نقدم خدمة توصيل السيارات إلى موقعك في جميع أنحاء المملكة مقابل رسوم رمزية.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل يمكنني تجربة السيارة قبل الشراء؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  بالطبع! نشجع جميع عملائنا على تجربة السيارة قبل اتخاذ قرار الشراء أو التأجير.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ما هي طرق الدفع المتاحة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  نقبل الدفع النقدي، التحويل البنكي، البطاقات الائتمانية، والتقسيط عبر البنوك المعتمدة.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
