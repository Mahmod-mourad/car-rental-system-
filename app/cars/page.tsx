"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Grid3X3, List, Star, Heart, Calendar, Fuel, Settings, Users, Plus, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for cars
const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "X5",
    year: 2024,
    color: "أسود",
    images: [
      "/placeholder.svg?height=300&width=400&text=BMW+X5+Front",
      "/placeholder.svg?height=300&width=400&text=BMW+X5+Side",
      "/placeholder.svg?height=300&width=400&text=BMW+X5+Interior",
    ],
    salePrice: 280000,
    dailyRental: 500,
    weeklyRental: 3000,
    monthlyRental: 10000,
    availability: "both",
    status: "available",
    rating: 4.8,
    reviewCount: 24,
    features: ["فل أوبشن", "جلد", "بانوراما", "نافيجيشن"],
    specs: {
      engine: "3.0L تيربو",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 7,
      mileage: "12,000 كم",
    },
    location: "الرياض",
    dealer: "معرض الفخامة",
  },
  {
    id: 2,
    brand: "تويوتا",
    model: "كامري",
    year: 2024,
    color: "أبيض",
    images: [
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Front",
      "/placeholder.svg?height=300&width=400&text=Toyota+Camry+Side",
    ],
    salePrice: 95000,
    dailyRental: 200,
    weeklyRental: 1200,
    monthlyRental: 4500,
    availability: "both",
    status: "available",
    rating: 4.6,
    reviewCount: 18,
    features: ["هايبرد", "اقتصادية", "موثوقة", "كاميرا خلفية"],
    specs: {
      engine: "2.5L هايبرد",
      transmission: "CVT",
      fuel: "هايبرد",
      seats: 5,
      mileage: "8,500 كم",
    },
    location: "جدة",
    dealer: "تويوتا الرسمي",
  },
  {
    id: 3,
    brand: "مرسيدس",
    model: "C200",
    year: 2023,
    color: "فضي",
    images: [
      "/placeholder.svg?height=300&width=400&text=Mercedes+C200+Front",
      "/placeholder.svg?height=300&width=400&text=Mercedes+C200+Interior",
    ],
    salePrice: 180000,
    dailyRental: 350,
    weeklyRental: 2100,
    monthlyRental: 8000,
    availability: "rental",
    status: "rented",
    rating: 4.9,
    reviewCount: 31,
    features: ["AMG", "رياضية", "فاخرة", "مقاعد جلد"],
    specs: {
      engine: "2.0L تيربو",
      transmission: "أوتوماتيك 9 سرعات",
      fuel: "بنزين",
      seats: 5,
      mileage: "15,000 كم",
    },
    location: "الدمام",
    dealer: "مرسيدس الشرق",
  },
  {
    id: 4,
    brand: "هوندا",
    model: "أكورد",
    year: 2024,
    color: "أزرق",
    images: ["/placeholder.svg?height=300&width=400&text=Honda+Accord+Front"],
    salePrice: 120000,
    dailyRental: 250,
    weeklyRental: 1500,
    monthlyRental: 5500,
    availability: "both",
    status: "available",
    rating: 4.5,
    reviewCount: 15,
    features: ["موثوقة", "اقتصادية", "مريحة", "تقنيات حديثة"],
    specs: {
      engine: "2.0L",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      mileage: "جديدة",
    },
    location: "الرياض",
    dealer: "هوندا الرياض",
  },
]

export default function CarsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("both")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const brands = ["BMW", "تويوتا", "مرسيدس", "هوندا", "نيسان", "هيونداي"]
  const colors = ["أبيض", "أسود", "فضي", "رمادي", "أزرق", "أحمر"]

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.brand.includes(searchTerm) || car.model.includes(searchTerm)
    const matchesTab =
      selectedTab === "both" ||
      (selectedTab === "sale" && (car.availability === "sale" || car.availability === "both")) ||
      (selectedTab === "rental" && (car.availability === "rental" || car.availability === "both"))
    const matchesPrice = car.salePrice >= priceRange[0] && car.salePrice <= priceRange[1]
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand)
    const matchesColor = selectedColors.length === 0 || selectedColors.includes(car.color)

    return matchesSearch && matchesTab && matchesPrice && matchesBrand && matchesColor
  })

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.salePrice - b.salePrice
      case "price-high":
        return b.salePrice - a.salePrice
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.year - a.year
      default:
        return 0
    }
  })

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">السيارات</h1>
              <p className="text-muted-foreground">اختر من مجموعتنا الواسعة من السيارات</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/cars/add">
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة سيارة
                </Button>
              </Link>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="ابحث عن السيارة المناسبة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                  <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="year">سنة الصنع</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                فلاتر
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">نوع الخدمة</h3>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="both">الكل</TabsTrigger>
                    <TabsTrigger value="sale">للبيع</TabsTrigger>
                    <TabsTrigger value="rental">للتأجير</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">نطاق السعر</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()} ر.س</span>
                    <span>{priceRange[1].toLocaleString()} ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">العلامة التجارية</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label htmlFor={brand} className="text-sm font-medium">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">اللون</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <label htmlFor={color} className="text-sm font-medium">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cars Grid/List */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                عرض {sortedCars.length} من أصل {cars.length} سيارة
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={car.images[0] || "/placeholder.svg"}
                        alt={`${car.brand} ${car.model}`}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        {car.status === "available" ? (
                          <Badge className="bg-green-500">متاحة</Badge>
                        ) : car.status === "rented" ? (
                          <Badge className="bg-blue-500">مؤجرة</Badge>
                        ) : (
                          <Badge variant="secondary">محجوزة</Badge>
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 rounded px-2 py-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{car.rating}</span>
                        <span className="text-xs text-muted-foreground">({car.reviewCount})</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">
                          {car.brand} {car.model} {car.year}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {car.location} • {car.dealer}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {car.year}
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          {car.specs.transmission}
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-4 w-4" />
                          {car.specs.fuel}
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        {(car.availability === "both" || car.availability === "sale") && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">سعر البيع:</span>
                            <span className="font-bold text-lg">{car.salePrice.toLocaleString()} ر.س</span>
                          </div>
                        )}

                        {(car.availability === "both" || car.availability === "rental") && (
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">تأجير يومي:</span>
                              <span className="font-semibold">{car.dailyRental} ر.س</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">تأجير شهري:</span>
                              <span className="font-semibold">{car.monthlyRental} ر.س</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/cars/${car.id}`}>
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href={`/cars/${car.id}/book`}>حجز</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="relative w-80">
                        <Image
                          src={car.images[0] || "/placeholder.svg"}
                          alt={`${car.brand} ${car.model}`}
                          width={320}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          {car.status === "available" ? (
                            <Badge className="bg-green-500">متاحة</Badge>
                          ) : car.status === "rented" ? (
                            <Badge className="bg-blue-500">مؤجرة</Badge>
                          ) : (
                            <Badge variant="secondary">محجوزة</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {car.brand} {car.model} {car.year}
                            </h3>
                            <p className="text-muted-foreground">
                              {car.location} • {car.dealer}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{car.rating}</span>
                              <span className="text-sm text-muted-foreground">({car.reviewCount} تقييم)</span>
                            </div>
                          </div>
                          <Button size="icon" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                            <span>{car.specs.engine}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{car.specs.transmission}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Fuel className="h-4 w-4 text-muted-foreground" />
                            <span>{car.specs.fuel}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{car.specs.seats} مقاعد</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="space-y-2">
                            {(car.availability === "both" || car.availability === "sale") && (
                              <div>
                                <span className="text-sm text-muted-foreground">سعر البيع: </span>
                                <span className="font-bold text-xl">{car.salePrice.toLocaleString()} ر.س</span>
                              </div>
                            )}
                            {(car.availability === "both" || car.availability === "rental") && (
                              <div className="flex gap-4 text-sm">
                                <span>
                                  يومي: <strong>{car.dailyRental} ر.س</strong>
                                </span>
                                <span>
                                  شهري: <strong>{car.monthlyRental} ر.س</strong>
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button asChild>
                              <Link href={`/cars/${car.id}`}>عرض التفاصيل</Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href={`/cars/${car.id}/book`}>حجز</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {sortedCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">لم يتم العثور على سيارات تطابق معايير البحث</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedBrands([])
                    setSelectedColors([])
                    setPriceRange([0, 500000])
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
