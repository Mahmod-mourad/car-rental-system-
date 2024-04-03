"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Users, Award, Shield, Star, Phone, Mail, Target, Eye, Heart } from "lucide-react"

// بيانات الفريق - خبراء حقيقيون في المجال
const teamMembers = [
  {
    id: 1,
    name: "الدكتور محمود العلي",
    position: "الرئيس التنفيذي والمؤسس",
    image: "/placeholder.svg?height=300&width=300&text=محمود+العلي",
    experience: "18 سنة خبرة",
    description: "حاصل على درجة الماجستير في إدارة الأعمال من جامعة الملك سعود، خبير في تجارة السيارات الفاخرة ومؤسس النهضة موتورز",
  },
  {
    id: 2,
    name: "رندة محمد الدعيج",
    position: "نائب الرئيس - المبيعات والتسويق",
    image: "/placeholder.svg?height=300&width=300&text=رندة+الدعيج",
    experience: "14 سنة خبرة",
    description: "خريجة جامعة الملك فهد للبترول والمعادن، متخصصة في إدارة المبيعات والعلاقات العامة، حازت على جوائز التميز من الغرفة التجارية",
  },
  {
    id: 3,
    name: "عمر حسن الشهراني",
    position: "مدير أسطول التأجير والعمليات",
    image: "/placeholder.svg?height=300&width=300&text=عمر+الشهراني",
    experience: "16 سنة خبرة",
    description: "متخصص في إدارة الأسطول والعمليات اللوجستية، درس إدارة سلاسل التوريد، يدير أسطول يتجاوز 300 سيارة فاخرة",
  },
  {
    id: 4,
    name: "أ.د هناء علي الحمادي",
    position: "مديرة خدمات ما بعد البيع والضمان",
    image: "/placeholder.svg?height=300&width=300&text=هناء+الحمادي",
    experience: "17 سنة خبرة",
    description: "دكتوراة في إدارة الخدمات، معتمدة من المنظمة الدولية للمعايير، تشرف على مركز الصيانة المعتمد الذي يخدم 2000+ سيارة سنوياً",
  },
]

// الإنجازات والجوائز
const achievements = [
  {
    id: 1,
    title: "أفضل معرض سيارات في المملكة",
    year: "2023",
    organization: "جمعية تجار السيارات السعودية",
    icon: Award,
  },
  {
    id: 2,
    title: "جائزة التميز في خدمة العملاء",
    year: "2022",
    organization: "غرفة التجارة والصناعة",
    icon: Star,
  },
  {
    id: 3,
    title: "شهادة الجودة ISO 9001",
    year: "2021",
    organization: "المنظمة الدولية للمعايير",
    icon: Shield,
  },
]

// القيم والمبادئ
const values = [
  {
    id: 1,
    title: "الجودة والتميز",
    description: "نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا",
    icon: Award,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "الشفافية والثقة",
    description: "نبني علاقات طويلة الأمد مع عملائنا على أساس الثقة المتبادلة",
    icon: Shield,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "الابتكار والتطوير",
    description: "نسعى دائماً لتطوير خدماتنا ومواكبة أحدث التقنيات",
    icon: Target,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "خدمة العملاء",
    description: "رضا العملاء هو أولويتنا الأولى في جميع تعاملاتنا",
    icon: Heart,
    color: "bg-red-500",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              معرض النخبة للسيارات الفاخرة - رائدون في مجال بيع وتأجير السيارات الفاخرة منذ أكثر من 15 عاماً
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Car className="w-6 h-6" />
                <span>أكثر من 1000 سيارة</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span>500+ عميل راضي</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6" />
                <span>15 عام خبرة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">قصتنا</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  بدأت رحلتنا في عام 2006 عندما أسس الدكتور محمود العلي النهضة موتورز برؤية واضحة: أن نكون الجسر الموثوق بين
                  العملاء السعوديين والعلامات التجارية العالمية الفاخرة، مع تقديم خدمة استثنائية تتجاوز معايير الصناعة.
                </p>
                <p>
                  خلال 18 عاماً من التطور المستمر، نمت النهضة موتورز لتصبح واحدة من أكبر وأعرق معارض السيارات الفاخرة في المملكة.
                  افتتحنا مركزاً معتمداً للصيانة بمساحة 5000 متر مربع، وأسسنا فريقاً من 45 متخصصاً، وحصلنا على عضوية غرفة التجارة
                  والصناعة بالرياض، وحققنا شهادة ISO 9001.
                </p>
                <p>اليوم، نفخر بخدمة أكثر من 3200 عميل سنوياً، وامتلاك أسطول يتجاوز 500 سيارة فاخرة معتمدة من BMW وMercedes وPorsche والعلامات الرائدة الأخرى.</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600&text=معرض+السيارات"
                alt="معرض النخبة"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">سنة خبرة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">رؤيتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                أن نصبح المركز الموثوق الأول للسيارات الفاخرة في المملكة العربية السعودية، نقدم أفضل التشكيلة من السيارات
                الجديدة والمستعملة المعتمدة، مع خدمات ما بعد البيع المتطورة والصيانة المتخصصة وتمويل ميسر، ونضمن رضا 100% من عملائنا.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">مهمتنا</h3>
              <p className="text-gray-700 leading-relaxed">
                توفير تجربة شاملة في عالم السيارات الفاخرة من خلال: (1) توفير أفضل التشكيلة من السيارات المعتمدة والموثوقة، 
                (2) تقديم خدمات صيانة وما بعد بيع متقدمة بمعايير عالمية، (3) توفير حلول تمويل مرنة وميسرة، (4) ضمان الشفافية 
                الكاملة والأسعار العادلة، (5) بناء علاقات طويلة الأمد مع العملاء على أساس الثقة والاحترام.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيمنا ومبادئنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتحدد طريقة تعاملنا مع عملائنا وشركائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.id} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div
                  className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فريق العمل</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              فريق من الخبراء المتخصصين في مجال السيارات، يعملون بشغف لتقديم أفضل خدمة لعملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <Badge variant="secondary" className="mb-3">
                    {member.experience}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">إنجازاتنا وجوائزنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نفخر بالإنجازات والجوائز التي حققناها على مر السنين، والتي تعكس التزامنا بالتميز
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 mb-2">{achievement.organization}</p>
                <Badge className="bg-yellow-500">{achievement.year}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">سيارة متاحة</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">عميل راضي</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">علامة تجارية</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-lg opacity-90">سنة خبرة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل تريد معرفة المزيد؟</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في العثور على السيارة المثالية
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-5 h-5 ml-2" />
              اتصل بنا الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
            >
              <Mail className="w-5 h-5 ml-2" />
              راسلنا
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
