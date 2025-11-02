import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowLeft } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

export default function AndCampDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const recruitmentStatus = {
    type: 'closed',
    text: '운영 종료',
    color: 'red'
  }

  const getStatusStyle = () => {
    switch (recruitmentStatus.color) {
      case 'green':
        return 'bg-green-900 border-green-600 text-green-400'
      case 'red':
        return 'bg-red-900 border-red-600 text-red-400'
      case 'orange':
        return 'bg-orange-900 border-orange-600 text-orange-400'
      case 'blue':
        return 'bg-blue-900 border-blue-600 text-blue-400'
      default:
        return 'bg-green-900 border-green-600 text-green-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Back Button */}
      <div className="pt-24 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/camp" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            캠프 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              AND 캠프
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              지난 10년과 미래를 잇는, AURI의 특별한 AND 캠프
            </p>

            {/* Camp Date & Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <div className="bg-gray-900 rounded-lg px-6 py-3 border border-gray-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">과거 진행 (현재 중단)</span>
                </div>
              </div>
              <div className={`rounded-lg px-6 py-3 border ${getStatusStyle()}`}>
                <div className="flex items-center space-x-2">
                  {recruitmentStatus.type === 'closed' && (
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  )}
                  <span className="font-medium">{recruitmentStatus.text}</span>
                </div>
              </div>
            </div>

            {/* Basic Info Cards */}
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">기간</div>
                <div className="text-white font-medium">2박 3일</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">장소</div>
                <div className="text-white font-medium">가평 힐링캠프</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">대상</div>
                <div className="text-white font-medium">중1 ~ 고3</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">상태</div>
                <div className="text-white font-medium">운영 중단</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-800 sticky top-20 z-40 bg-black/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: '소개' },
              { id: 'program', label: '프로그램' },
              { id: 'instructors', label: '강사소개' },
              { id: 'schedule', label: '일정' },
              { id: 'location', label: '장소' },
              { id: 'poster', label: '포스터' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-2/3 space-y-6">
                  <h2 className="text-2xl font-bold text-white">이어지는 이야기, 멈추지 않는 발걸음</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      2024년, AURI는 10년의 걸음을 돌아보며
                      <br/>단 한 번의 특별한 캠프, AND를 열었습니다.
                      <br/>
                      <br/>AND.
                      <br/>시간과 시간을 잇고,
                      <br/>세대와 세대를 연결하며,
                      <br/>놀이와 예배, 마음과 마음을 하나로 묶는 말.
                      <br/>그 한 단어 안에 AURI의 어제와 내일이 담겨 있습니다.
                      <br/>우리는 지금, 그 다음을 향해 걷기 시작했습니다.
                      <br/>
                      <br/>AND 캠프는 끝이 아닌 시작입니다.
                      <br/>AURI는 앞으로도,
                      <br/>다음세대의 마음을 열고
                      <br/>예배로 채우는 여정을 계속해 나가겠습니다.
                    </p>
                  </div>
                </div>
                <div className="lg:w-3/5">
                  <ImageWithFallback
                    src={getAssetPath("/images/andcampimage.jpg")}
                    alt="AND 캠프"
                    className="w-full h-[470px] rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Program Tab */}
          {activeTab === 'program' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">프로그램 특징</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <ImageWithFallback
                    src={getAssetPath("/images/andcampprogram-1.png")}
                    alt="말씀 프로그램"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">말씀 중심 프로그램</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    놀이와 결합한 말씀 중심 프로그램으로 하나님께 가까이 나아갑니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <ImageWithFallback
                    src={getAssetPath("/images/andcampprogram-2.png")}
                    alt="찬양과 워십"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">찬양과 워십</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Connect Worship팀과 함께 하나님께 마음껏 찬양을 올려드립니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <ImageWithFallback
                    src={getAssetPath("/images/andcampprogram-3.jpg")}
                    alt="공동체 활동"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">공동체 활동</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    소그룹 나눔과 야외 활동을 통해 건강한 공동체의 가치를 배우고 실천합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">상세 일정</h2>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <ImageWithFallback
                  src={getAssetPath("/images/andcampschedule.jpg")}
                  alt="AND 캠프 상세 일정표"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">강사 소개</h2>

              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <ImageWithFallback
                  src={getAssetPath("/images/andcamp people.jpg")}
                  alt="AND 캠프 강사진 소개"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'location' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">캠프 장소</h2>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">가평 힐링캠프</h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>경기 가평군 상면 임초밤안골로 153-42</span>
                      </p>
                      <p>🚗 서울에서 차로 2시간 30분 거리</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1083.5502041805196!2d127.37184222003778!3d37.75378013648946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35632de559b1eee3%3A0xc2d739d9a3a25a8a!2z6rCA7Y-J7Z6Q66eB7Lqg7ZSE!5e0!3m2!1sko!2skr!4v1753938072128!5m2!1sko!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="가평 힐링캠프 위치"
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-medium mb-2">위치 안내</h4>
                      <p className="text-gray-400 text-sm">경기 가평군 상면 임초밤안골로 153-42</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Poster Tab */}
          {activeTab === 'poster' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">캠프 포스터</h2>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <ImageWithFallback
                    src={getAssetPath("/images/andcampposter.jpg")}
                    alt="AND 캠프 공식 포스터"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
