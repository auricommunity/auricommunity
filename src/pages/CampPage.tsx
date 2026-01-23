import { useState } from "react"
import { Link } from 'react-router-dom'
import { X, Calendar, MapPin, Users, BookOpen, Sprout, Star } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

export default function CampPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const isApplicationPeriod = false

  const heroMedia = {
    type: "video",
    video: getAssetPath("/videos/campmain.mp4"),
    alt: "캠프 히어로 영상"
  }

  const camps = [
    {
      id: 1,
      title: "31 CAMP : RE:BUILDING",
      subtitle: "무너진 것을 다시 세우는 시간",
      period: "3월 1일(주일) ~ 2일(월)",
      location: "일산하나교회",
      participants: "청년 31명",
      price: "사전 3만원 / 일반 3.5만원",
      status: "모집중",
      slug: "31",
      description: "느헤미야의 심정으로 무너진 성벽을 다시 세우듯, 우리의 신앙과 삶을 RE:BUILDING 하는 1박 2일의 여정입니다.",
      features: ["말씀 집회", "소그룹 나눔", "아침 큐티", "공동체 교제"],
      image: getAssetPath("/images/31camp-poster.jpeg")
    },
    {
      id: 2,
      title: "AURI 캠프",
      subtitle: "하나님의 사랑 안에서 하나 되는 다음세대",
      period: "매년 여름/겨울",
      location: "미정",
      participants: "중학생~고등학생",
      price: "문의",
      status: "정기캠프",
      slug: "auri",
      description: "AURI 공동체의 대표 정기 캠프로, 다음세대를 위한 특별한 영적 성장의 시간입니다.",
      features: ["말씀 집회", "찬양 워십", "공동체 활동", "개인 기도 시간"],
      image: getAssetPath("/images/auricamp main.jpg")
    },
    {
      id: 3,
      title: "AND 캠프",
      subtitle: "And 함께하는 은혜의 시간",
      period: "과거 진행 (현재 중단)",
      location: "가평 힐링캠프",
      participants: "중학생~고등학생",
      price: "-",
      status: "지난캠프",
      slug: "and",
      description: "2024년, AURI는 10년의 걸음을 돌아보며, 단 한 번의 특별한 캠프, AND를 열었습니다.",
      features: ["말씀 나눔", "공동체 교제", "자연 체험", "문화 활동"],
      image: getAssetPath("/images/andcamp main.jpg")
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          {heroMedia.type === 'video' && heroMedia.video ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ pointerEvents: 'none' }}
              >
                <source src={heroMedia.video} type="video/mp4" />
                비디오를 로드할 수 없습니다.
              </video>
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          ) : null}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-12">
            CAMP
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light mb-12">
            하나님과 함께하는 특별한 시간, 믿음의 친구들과 함께 성장하는 캠프
          </p>
        </div>
      </section>

      {/* Camp Cards */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
              하나님과 함께하는 특별한 시간
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
              아름다운 자연 속에서 하나님의 사랑을 깊이 경험하고,
              믿음의 친구들과 함께 성장하며 소중한 추억을 만들어가는 캠프입니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {camps.map((camp) => (
              <Link
                key={camp.id}
                to={`/camp/${camp.slug}`}
                className="bg-zinc-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 block"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      camp.status === '모집중' ? 'bg-red-500/30 text-red-200 animate-pulse' :
                      camp.status === '정기캠프' ? 'bg-green-500/30 text-green-200' : 'bg-yellow-500/30 text-yellow-200'
                    }`}>
                      {camp.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-light text-white mb-2">{camp.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{camp.subtitle}</p>

                  <div className="space-y-2 text-sm text-white/70 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{camp.period}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-400" />
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>{camp.participants}</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {camp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {camp.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-light">{camp.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Camp Benefits */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-thin text-white mb-8">캠프를 통해 얻는 것들</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "말씀 배움", desc: "성경을 통해 하나님의 마음을 알아가요", icon: BookOpen, color: "text-blue-400" },
              { title: "진정한 친구", desc: "믿음 안에서 평생 친구를 만나요", icon: Users, color: "text-green-400" },
              { title: "영적 성장", desc: "하나님의 사랑 안에서 성장해요", icon: Sprout, color: "text-purple-400" },
              { title: "소중한 추억", desc: "평생 기억에 남을 추억을 만들어요", icon: Star, color: "text-orange-400" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h4 className="text-lg font-light text-white mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-thin text-white mb-6">함께 캠프에 참여하세요</h3>
          <p className="text-white/70 mb-8 leading-relaxed">
            하나님의 사랑 안에서 성장하고 소중한 추억을 만들어가는 특별한 시간에 초대합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowApplicationModal(true)}
              className="bg-white text-black px-8 py-3 font-light hover:bg-gray-100 transition-colors"
            >
              캠프 신청
            </button>
            <button
              onClick={() => setShowInquiryModal(true)}
              className="border border-white/30 text-white px-8 py-3 font-light hover:border-white/50 transition-colors"
            >
              캠프 문의
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 max-w-md w-full p-8 border border-white/10">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-light tracking-wide text-white">캠프 신청</h3>

              {!isApplicationPeriod && (
                <div className="space-y-6">
                  <div className="py-4 border-y border-white/10">
                    <p className="text-white/60 text-sm font-light">
                      지금은 신청기간이 아닙니다.<br />
                      다음 신청 기간을 기다려주세요.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="w-full py-4 border border-white/20 text-white font-light tracking-wider hover:bg-white/5 transition-colors"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 max-w-md w-full p-8 border border-white/10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-light tracking-wide text-white">캠프 문의</h3>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:010-4820-9155"
                    className="flex items-center justify-center py-4 bg-white text-black font-light tracking-wider hover:bg-white/90 transition-colors"
                  >
                    전화문의
                  </a>
                  <a
                    href="mailto:auricommunity@gmail.com"
                    className="flex items-center justify-center py-4 border border-white/20 text-white font-light tracking-wider hover:bg-white/5 transition-colors"
                  >
                    이메일
                  </a>
                </div>

                <div className="py-4 border-y border-white/10 text-left">
                  <h4 className="text-white/80 font-light mb-3 text-sm tracking-wide">전화 문의 시간</h4>
                  <div className="space-y-1 text-white/50 text-xs font-light">
                    <p>평일 — 오전 10시 ~ 오후 6시</p>
                    <p>주말 — 오후 2시 ~ 오후 5시</p>
                    <p className="text-white/30 mt-2">* 공휴일 휴무</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
