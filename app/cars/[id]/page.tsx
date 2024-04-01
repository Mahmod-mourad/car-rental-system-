"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  MapPin,
  CalendarIcon,
  Fuel,
  Users,
  Gauge,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock car data
const car = {
  id: 1,
  brand: "BMW",
  model: "X5",
  year: 2024,
  color: "أسود",
  images: [
    "/placeholder.svg?height=400&width=600&text=BMW+X5+Front",
    "/placeholder.svg?height=400&width=600&text=BMW+X5+Side",
    "/placeholder.svg?height=400&width=600&text=BMW+X5+Interior",
    "/placeholder.svg?height=400&width=600&text=BMW+X5+Engine",
    "/placeholder.svg?height=400&width=600&text=BMW+X5+Back",
  ],
  salePrice: 280000,
  dailyRental: 500,
  weeklyRental: 3000,
  monthlyRental: 10000,
  availability: "both",
  status: "available",
  rating: 4.8,
  reviewCount: 24,
  features: ["فل أوبشن", "جلد", "بانوراما", "نافيجيشن", "كاميرات 360", "مقاعد مدفأة"],
  specs: {
    engine: "3.0L تيربو V6",
    transmission: "أوتوماتيك 8 سرعات",
    fuel: "بنزين",
    fuelConsumption: "10.5 لتر/100كم",
    seats: 7,
    mileage: "12,000 كم",
    topSpeed: "250 كم/س",
    acceleration: "5.5 ثانية (0-100)",
    drivetrain: "دفع رباعي",
  },
  location: "الرياض",
  dealer: {
    name: "معرض الفخامة",
    phone: "+966 11 123 4567",
    email: "info@luxury-cars.sa",
    address: "طريق الملك فهد، الرياض",
  },
  description:
    "BMW X5 2024 بحالة ممتازة، تم الحصول عليها من الوكيل الرسمي. السيارة مجهزة بجميع الخيارات المتاحة وتتميز بالأداء العالي والراحة الفائقة. مناسبة للعائلات الكبيرة والرحلات الطويلة.",
  rentalTerms: {
    minAge: 25,
    licenseRequired: "رخصة قيادة سارية",
    deposit: 2000,
    insurance: "تأمين شامل متاح",
    mileageLimit: "300 كم/يوم",
    fuelPolicy: "إرجاع بنفس مستوى الوقود",
  },
}

// Mock similar cars
const similarCars = [
  {
    id: 2,
    brand: "BMW",
    model: "X3",
    year: 2024,
    image: "/placeholder.svg?height=200&width=300&text=BMW+X3",
    salePrice: 220000,
    dailyRental: 400,
  },
  {
    id: 3,
    brand: "مرسيدس",
    model: "GLE",
    year: 2023,
    image: "/placeholder.svg?height=200&width=300&text=Mercedes+GLE",
    salePrice: 300000,
    dailyRental: 550,
  },
  {
    id: 4,
    brand: "أودي",
    model: "Q7",
    year: 2024,
    image: "/placeholder.svg?height=200&width=300&text=Audi+Q7",
    salePrice: 290000,
    dailyRental: 520,
  },
]

// Mock availability calendar
const availableDates = new Set([
  "2024-01-20",
  "2024-01-21",
  "2024-01-22",
  "2024-01-25",
  "2024-01-26",
  "2024-01-27",
  "2024-01-28",
  "2024-01-29",
  "2024-02-01",
  "2024-02-02",
])

export default function CarDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  const isDateAvailable = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return availableDates.has(dateString)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-primary">
              السيارات
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {car.brand} {car.model}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={car.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {car.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 gap-2">
                    {car.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden ${
                          index === currentImageIndex ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`صورة ${index + 1}`}
                          width={100}
                          height={60}
                          className="w-full h-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Car Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">
                      {car.brand} {car.model} {car.year}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{car.rating}</span>
                        <span className="text-muted-foreground">({car.reviewCount} تقييم)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{car.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                    <TabsTrigger value="specs">المواصفات</TabsTrigger>
                    <TabsTrigger value="features">المميزات</TabsTrigger>
                    <TabsTrigger value="rental-terms">شروط التأجير</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-semibold">{car.year}</div>
                          <div className="text-sm text-muted-foreground">سنة الصنع</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-semibold">{car.specs.mileage}</div>
                          <div className="text-sm text-muted-foreground">المسافة المقطوعة</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-semibold">{car.specs.fuel}</div>
                          <div className="text-sm text-muted-foreground">نوع الوقود</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-semibold">{car.specs.seats} مقاعد</div>
                          <div className="text-sm text-muted-foreground">عدد المقاعد</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">المحرك والأداء</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المحرك:</span>
                            <span className="font-medium">{car.specs.engine}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ناقل الحركة:</span>
                            <span className="font-medium">{car.specs.transmission}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">نظام الدفع:</span>
                            <span className="font-medium">{car.specs.drivetrain}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">السرعة القصوى:</span>
                            <span className="font-medium">{car.specs.topSpeed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">التسارع (0-100):</span>
                            <span className="font-medium">{car.specs.acceleration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">الاستهلاك والراحة</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">استهلاك الوقود:</span>
                            <span className="font-medium">{car.specs.fuelConsumption}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">عدد المقاعد:</span>
                            <span className="font-medium">{car.specs.seats}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">المسافة المقطوعة:</span>
                            <span className="font-medium">{car.specs.mileage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">اللون:</span>
                            <span className="font-medium">{car.color}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="rental-terms" className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الحد الأدنى للعمر:</span>
                            <span className="font-medium">{car.rentalTerms.minAge} سنة</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">الرخصة المطلوبة:</span>
                            <span className="font-medium">{car.rentalTerms.licenseRequired}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">التأمين المالي:</span>
                            <span className="font-medium">{car.rentalTerms.deposit} ر.س</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">حد الكيلومترات:</span>
                            <span className="font-medium">{car.rentalTerms.mileageLimit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">سياسة الوقود:</span>
                            <span className="font-medium">{car.rentalTerms.fuelPolicy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">التأمين:</span>
                            <span className="font-medium">{car.rentalTerms.insurance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Similar Cars */}
            <Card>
              <CardHeader>
                <CardTitle>سيارات مشابهة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarCars.map((similarCar) => (
                    <Card key={similarCar.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <Image
                        src={similarCar.image || "/placeholder.svg"}
                        alt={`${similarCar.brand} ${similarCar.model}`}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover"
                      />
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">
                          {similarCar.brand} {similarCar.model} {similarCar.year}
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>سعر البيع:</span>
                            <span className="font-medium">{similarCar.salePrice.toLocaleString()} ر.س</span>
                          </div>
                          <div className="flex justify-between">
                            <span>تأجير يومي:</span>
                            <span className="font-medium">{similarCar.dailyRental} ر.س</span>
                          </div>
                        </div>
                        <Button asChild size="sm" className="w-full mt-3">
                          <Link href={`/cars/${similarCar.id}`}>عرض التفاصيل</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle>الأسعار والحجز</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(car.availability === "both" || car.availability === "sale") && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 mb-1">سعر البيع</div>
                    <div className="text-2xl font-bold text-green-800">{car.salePrice.toLocaleString()} ر.س</div>
                  </div>
                )}

                {(car.availability === "both" || car.availability === "rental") && (
                  <div className="space-y-3">
                    <div className="text-sm font-medium">أسعار التأجير</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm">يومي</span>
                        <span className="font-bold text-blue-800">{car.dailyRental} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm">أسبوعي</span>
                        <span className="font-bold text-blue-800">{car.weeklyRental} ر.س</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm">شهري</span>
                        <span className="font-bold text-blue-800">{car.monthlyRental} ر.س</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {car.availability === "both" && (
                    <>
                      <Button asChild className="w-full">
                        <Link href={`/cars/${car.id}/buy`}>شراء السيارة</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/cars/${car.id}/book`}>استئجار السيارة</Link>
                      </Button>
                    </>
                  )}
                  {car.availability === "sale" && (
                    <Button asChild className="w-full">
                      <Link href={`/cars/${car.id}/buy`}>شراء السيارة</Link>
                    </Button>
                  )}
                  {car.availability === "rental" && (
                    <Button asChild className="w-full">
                      <Link href={`/cars/${car.id}/book`}>استئجار السيارة</Link>
                    </Button>
                  )}
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    اتصل للاستفسار
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability Calendar */}
            {(car.availability === "both" || car.availability === "rental") && (
              <Card>
                <CardHeader>
                  <CardTitle>تقويم التوفر</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => !isDateAvailable(date) || date < new Date()}
                    className="rounded-md border"
                  />
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>متاح</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>محجوز</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span>غير متاح</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dealer Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات المعرض</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">{car.dealer.name}</h4>
                  <p className="text-sm text-muted-foreground">{car.dealer.address}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.dealer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.dealer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{car.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    اتصال
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    رسالة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
