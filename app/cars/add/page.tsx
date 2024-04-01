"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AddCarPage() {
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    engineType: "",
    transmission: "",
    fuelConsumption: "",
    salePrice: "",
    dailyRentalPrice: "",
    weeklyRentalPrice: "",
    monthlyRentalPrice: "",
    currency: "SAR",
    description: "",
    condition: "",
    availability: [],
    features: [],
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In a real app, you would upload to a service like Cloudinary
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form data:", formData)
    console.log("Images:", images)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/cars">
            <ArrowRight className="mr-2 h-4 w-4" />
            العودة للسيارات
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">إضافة سيارة جديدة</h1>
          <p className="text-muted-foreground">أدخل تفاصيل السيارة الجديدة</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brand">العلامة التجارية *</Label>
                <Select
                  value={formData.brand}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, brand: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العلامة التجارية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">تويوتا</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">مرسيدس</SelectItem>
                    <SelectItem value="honda">هوندا</SelectItem>
                    <SelectItem value="nissan">نيسان</SelectItem>
                    <SelectItem value="hyundai">هيونداي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">الموديل *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                  placeholder="مثال: كامري، X5، C200"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="year">سنة الصنع *</Label>
                <Select
                  value={formData.year}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, year: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر السنة" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">اللون *</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, color: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر اللون" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">أبيض</SelectItem>
                    <SelectItem value="black">أسود</SelectItem>
                    <SelectItem value="silver">فضي</SelectItem>
                    <SelectItem value="gray">رمادي</SelectItem>
                    <SelectItem value="blue">أزرق</SelectItem>
                    <SelectItem value="red">أحمر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">الحالة *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">جديدة</SelectItem>
                    <SelectItem value="used">مستعملة</SelectItem>
                    <SelectItem value="certified">معتمدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <CardTitle>المعلومات التقنية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="engineType">نوع المحرك</Label>
                <Select
                  value={formData.engineType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, engineType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المحرك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">بنزين</SelectItem>
                    <SelectItem value="diesel">ديزل</SelectItem>
                    <SelectItem value="hybrid">هجين</SelectItem>
                    <SelectItem value="electric">كهربائي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">ناقل الحركة</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, transmission: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر ناقل الحركة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">أوتوماتيك</SelectItem>
                    <SelectItem value="manual">يدوي</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelConsumption">استهلاك الوقود (لتر/100كم)</Label>
                <Input
                  id="fuelConsumption"
                  type="number"
                  step="0.1"
                  value={formData.fuelConsumption}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fuelConsumption: e.target.value }))}
                  placeholder="مثال: 7.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>التسعير</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salePrice">سعر البيع *</Label>
                <Input
                  id="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salePrice: e.target.value }))}
                  placeholder="مثال: 95000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">العملة</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">ريال سعودي</SelectItem>
                    <SelectItem value="USD">دولار أمريكي</SelectItem>
                    <SelectItem value="EUR">يورو</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dailyRentalPrice">سعر التأجير اليومي</Label>
                <Input
                  id="dailyRentalPrice"
                  type="number"
                  value={formData.dailyRentalPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dailyRentalPrice: e.target.value }))}
                  placeholder="مثال: 200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeklyRentalPrice">سعر التأجير الأسبوعي</Label>
                <Input
                  id="weeklyRentalPrice"
                  type="number"
                  value={formData.weeklyRentalPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weeklyRentalPrice: e.target.value }))}
                  placeholder="مثال: 1200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRentalPrice">سعر التأجير الشهري</Label>
                <Input
                  id="monthlyRentalPrice"
                  type="number"
                  value={formData.monthlyRentalPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, monthlyRentalPrice: e.target.value }))}
                  placeholder="مثال: 4500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>صور السيارة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <Label htmlFor="images" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:text-primary/80">اضغط لرفع الصور</span>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF حتى 10MB</p>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid gap-4 md:grid-cols-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`صورة ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description and Availability */}
        <Card>
          <CardHeader>
            <CardTitle>الوصف والتوفر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">وصف السيارة</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="أدخل وصف مفصل للسيارة ومميزاتها..."
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label>حالة التوفر</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sale" />
                  <Label htmlFor="sale">متاحة للبيع</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rental" />
                  <Label htmlFor="rental">متاحة للتأجير</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            حفظ السيارة
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/cars">إلغاء</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
