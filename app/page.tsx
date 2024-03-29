"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Star,
  Fuel,
  Users,
  Settings,
  Phone,
  Mail,
  MapPin,
  Heart,
  Eye,
  Play,
  Shield,
  Clock,
  Award,
  Wrench,
  CreditCard,
  Headphones,
  CheckCircle,
  User,
} from "lucide-react"

// بيانات السيارات المميزة - شركات حقيقية معروفة
const featuredCars = [
  {
    id: 1,
    brand: "BMW",
    model: "X7 M Sport",
    year: 2024,
    image: "/placeholder.svg?height=300&width=500&text=BMW+X7+2024",
    salePrice: 520000,
    dailyRental: 650,
    availability: "both",
    status: "available",
    rating: 4.9,
    features: ["فل أوبشن AMG", "جلد طبيعي فاخر", "بانوراما ذكية", "نظام صوت Harman Kardon"],
    fuelType: "بنزين هجين",
    transmission: "أوتوماتيك 8 سرعات",
    seats: 7,
    badge: "SUV فاخر 2024",
  },
  {
    id: 2,
    brand: "Mercedes-Benz",
    model: "S-Class AMG",
    year: 2024,
    image: "/placeholder.svg?height=300&width=500&text=Mercedes+S-Class+2024",
    salePrice: 680000,
    availability: "sale",
    status: "available",
    rating: 4.95,
    features: ["محرك V8 بيوريتيرقو", "جلد نابا فاخر", "نظام AIRMATIC معلق ذكي", "تقنية ENERGIZING"],
    fuelType: "بنزين فائق الأداء",
    transmission: "أوتوماتيك 9 سرعات",
    seats: 5,
    badge: "سيدان فاخرة الطراز",
  },
  {
    id: 3,
    brand: "Porsche",
    model: "Cayenne Turbo",
    year: 2023,
    image: "/placeholder.svg?height=300&width=500&text=Porsche+Cayenne+2023",
    dailyRental: 1200,
    availability: "rental",
    status: "available",
    rating: 4.88,
    features: ["محرك تيربو", "نظام دفع رباعي", "فرامل سيراميك", "تعليق كهرومغناطيسي"],
    fuelType: "بنزين عالي الأداء",
    transmission: "أوتوماتيك 8 سرعات",
    seats: 5,
    badge: "رياضية فاخرة",
  },
]

// بيانات الخدمات
const services = [
  {
    id: 1,
    title: "بيع السيارات",
    description: "مجموعة واسعة من السيارات الجديدة والمستعملة بأفضل الأسعار",
    features: ["ضمان شامل", "فحص تقني", "أوراق كاملة", "تمويل ميسر"],
    icon: Car,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "تأجير السيارات",
    description: "خدمة تأجير متميزة بأسعار تنافسية وخيارات مرنة",
    features: ["تأجير يومي", "تأجير شهري", "مع أو بدون سائق", "تأمين شامل"],
    icon: Car,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "خدمات الصيانة",
    description: "مركز صيانة متكامل بأحدث التقنيات وأمهر الفنيين",
    features: ["صيانة دورية", "إصلاحات طارئة", "قطع غيار أصلية", "ضمان العمل"],
    icon: Wrench,
    color: "bg-orange-500",
  },
  {
    id: 4,
    title: "التأمين",
    description: "خدمات تأمين شاملة لحماية استثمارك في السيارة",
    features: ["تأمين شامل", "تأمين ضد الغير", "تغطية واسعة", "إجراءات سريعة"],
    icon: Shield,
    color: "bg-purple-500",
  },
  {
    id: 5,
    title: "التمويل",
    description: "حلول تمويل مرنة لتناسب جميع الاحتياجات والميزانيات",
    features: ["أقساط مريحة", "فترات سداد طويلة", "معدلات تنافسية", "موافقة سريعة"],
    icon: CreditCard,
    color: "bg-indigo-500",
  },
  {
    id: 6,
    title: "الدعم الفني",
    description: "فريق دعم متخصص متاح على مدار الساعة لخدمتكم",
    features: ["دعم 24/7", "استشارات مجانية", "خدمة طوارئ", "متابعة شخصية"],
    icon: Headphones,
    color: "bg-red-500",
  },
]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("الكل")
  const [searchTerm, setSearchTerm] = useState("")

  const filters = ["الكل", "اقتصادية", "فاخرة", "رياضية", "عائلية"]

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <div className="bg-[#1e3a8a] text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+966 11 4445566</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@alnahda-motors.com.sa</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>طريق الملك فهد، الرياض 12511</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1e3a8a]">النهضة موتورز</h1>
                <p className="text-sm text-orange-500 font-medium">لتجارة السيارات الفاخرة المتميزة</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-[#1e3a8a] font-medium hover:text-orange-500 transition-colors">
                الرئيسية
              </Link>
              <Link href="/cars" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
                السيارات
              </Link>
              <Link href="/rental" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
                التأجير
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
                الخدمات
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#1e3a8a] transition-colors">
                اتصل بنا
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-700">
                <User className="w-4 h-4 ml-1" />
                تسجيل الدخول
              </Button>
              <Link href="/login">
                <Button size="sm" className="bg-[#1e3a8a] hover:bg-[#1e40af]">
                  <Settings className="w-4 h-4 ml-1" />
                  لوحة الإدارة
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('/placeholder.svg?height=800&width=1400&text=Luxury+Car+Showroom')`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            مركز معتمد من الشركات العالمية الرائدة
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">النهضة موتورز</span>
            <br />
            <span className="text-orange-400">تجارة السيارات الفاخرة</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            مع خبرة تتجاوز 18 سنة في مجال تجارة السيارات الفاخرة، نقدم أفضل تشكيلة من BMW وMercedes وPorsche والعلامات
            العالمية المتميزة مع خدمات ما بعد البيع والتأجير المتطورة.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-orange-400" />
              <span className="text-lg">+500 سيارة فاخرة معتمدة</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-lg">دعم متخصص 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-400" />
              <span className="text-lg">ضمان شامل معتمد</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-8 py-4 text-lg">
              <Car className="w-5 h-5 ml-2" />
              استكشف السيارات
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              <Play className="w-5 h-5 ml-2" />
              شاهد الفيديو التعريفي
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">500+</div>
              <div className="text-sm md:text-base text-gray-300">سيارة معتمدة</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">3200+</div>
              <div className="text-sm md:text-base text-gray-300">عميل رضيع سنوياً</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">18</div>
              <div className="text-sm md:text-base text-gray-300">سنة خبرة</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-400">12</div>
              <div className="text-sm md:text-base text-gray-300">علامة تجارية فاخرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">أحدث السيارات</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعتنا الحصرية من السيارات الفاخرة والاقتصادية للبيع والتأجير
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full ${
                  activeFilter === filter
                    ? "bg-[#1e3a8a] text-white"
                    : "border-gray-300 text-gray-700 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white"
              >
                <div className="relative">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={`${
                        car.availability === "both"
                          ? "bg-green-500"
                          : car.availability === "sale"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      } text-white px-3 py-1`}
                    >
                      {car.badge}
                    </Badge>
                  </div>

                  {/* Favorite Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-4 left-4 bg-white/90 hover:bg-white w-10 h-10 p-0"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>

                  {/* View Details Button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      <Eye className="w-4 h-4 ml-1" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Car Title */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-gray-600">موديل {car.year}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{car.rating}</span>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="w-4 h-4" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{car.seats} مقاعد</span>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{car.year}</span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 mb-6">
                    {car.salePrice && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">سعر البيع</span>
                        <span className="text-2xl font-bold text-[#1e3a8a]">{car.salePrice.toLocaleString()} ريال</span>
                      </div>
                    )}
                    {car.dailyRental && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">سعر التأجير اليومي</span>
                        <span className="text-lg font-semibold text-orange-500">{car.dailyRental} ريال/يوم</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {car.salePrice && <Button className="flex-1 bg-[#1e3a8a] hover:bg-[#1e40af]">اشتري الآن</Button>}
                    {car.dailyRental && (
                      <Button
                        variant="outline"
                        className={`${car.salePrice ? "flex-1" : "w-full"} border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white`}
                      >
                        احجز للتأجير
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white bg-transparent"
            >
              عرض المزيد من السيارات
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">خدماتنا المتميزة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات عالية الجودة لضمان راحتكم ورضاكم التام
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] group-hover:bg-orange-500 transition-colors duration-300">
                    اطلب الخدمة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#1e3a8a] text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">1000+</div>
              <div className="text-lg text-gray-300">سيارة متاحة</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">500+</div>
              <div className="text-lg text-gray-300">عميل راضي</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-lg text-gray-300">علامة تجارية</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">5</div>
              <div className="text-lg text-gray-300">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">هل تحتاج المساعدة؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            فريقنا المتخصص جاهز لمساعدتك في اختيار الخدمة المناسبة
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg bg-transparent"
            >
              <Mail className="w-5 h-5 ml-2" />
              طلب استشارة مجانية
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">معرض النخبة</h3>
                  <p className="text-orange-400 text-sm">للسيارات الفاخرة</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                نحن معرض رائد في مجال بيع وتأجير السيارات الفاخرة، نقدم أفضل الخدمات بأعلى معايير الجودة والمهنية.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">ضمان شامل</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/cars" className="text-gray-400 hover:text-white transition-colors">
                    السيارات للبيع
                  </Link>
                </li>
                <li>
                  <Link href="/rental" className="text-gray-400 hover:text-white transition-colors">
                    السيارات للتأجير
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                    الخدمات
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">خدماتنا</h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-400">بيع السيارات الجديدة</span>
                </li>
                <li>
                  <span className="text-gray-400">بيع السيارات المستعملة</span>
                </li>
                <li>
                  <span className="text-gray-400">تأجير قصير المدى</span>
                </li>
                <li>
                  <span className="text-gray-400">تأجير طويل المدى</span>
                </li>
                <li>
                  <span className="text-gray-400">خدمات الصيانة</span>
                </li>
                <li>
                  <span className="text-gray-400">التأمين والتمويل</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">العنوان</h5>
                  <p className="text-gray-400 text-sm">
                    شارع الملك فهد، الرياض
                    <br />
                    المملكة العربية السعودية
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">الهاتف</h5>
                  <p className="text-gray-400 text-sm">+966 50 123 4567</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">البريد الإلكتروني</h5>
                  <p className="text-gray-400 text-sm">info@carshowroom.com</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">ساعات العمل</h5>
                  <p className="text-gray-400 text-sm">
                    السبت - الخميس: 9:00 - 22:00
                    <br />
                    الجمعة: 14:00 - 22:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>ضمان شامل</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span>جميع سياراتنا مضمونة بأعلى معايير الجودة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>خدمة متميزة</span>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm">
                <p>&copy; 2024 معرض النخبة للسيارات الفاخرة. جميع الحقوق محفوظة.</p>
                <div className="flex items-center gap-4 mt-2">
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    سياسة الخصوصية
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    الشروط والأحكام
                  </Link>
                  <Link href="/return-policy" className="hover:text-white transition-colors">
                    سياسة الاستبدال
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
