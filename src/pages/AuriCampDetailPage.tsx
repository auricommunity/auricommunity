import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowLeft, Instagram, Youtube } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

export default function AuriCampDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  // 모집 상태 설정
  const recruitmentStatus = {
    type: 'closed',
    text: '모집 마감',
    color: 'orange'
  }

  const isApplicationPeriod = recruitmentStatus.type === 'recruiting'
  const applicationFormUrl = "https://forms.gle/YOUR_FORM_ID"

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
              AURI 캠프
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              하나님의 사랑 안에서 하나 되는 특별한 경험을 통해 청소년들의 영적 성장과 공동체 경험을 제공하는 캠프입니다.
            </p>

            {/* Camp Date & Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <div className="bg-gray-900 rounded-lg px-6 py-3 border border-gray-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">미정</span>
                </div>
              </div>
              <div className={`rounded-lg px-6 py-3 border ${getStatusStyle()}`}>
                <div className="flex items-center space-x-2">
                  {recruitmentStatus.type === 'recruiting' && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                  {recruitmentStatus.type === 'closed' && (
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  )}
                  {recruitmentStatus.type === 'full' && (
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  )}
                  {recruitmentStatus.type === 'upcoming' && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
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
                <div className="text-white font-medium">2박 3일(여름/겨울)</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <MapPin className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">장소</div>
                <div className="text-white font-medium">미정</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">대상</div>
                <div className="text-white font-medium">중1 ~ 고3</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
                <Clock className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">모집</div>
                <div className="text-white font-medium">미정</div>
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
              { id: 'poster', label: '포스터' },
              { id: 'info', label: '캠프안내' }
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
                  <h2 className="text-2xl font-bold text-white">AURI 캠프</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      AURI는 '놀이' 또한 예배로 나아가는 소중한 통로라고 믿습니다.
                      <br/>
                      다음세대가 진정한 예배자로 자라나기 위해서는
                      <br/>무엇보다 마음이 열리고, 관계가 연결되어야 합니다.
                      <br/>
                      <br/>함께 웃고 뛰는 놀이는
                      <br/>예수님을 사랑하는 친구들과 자연스럽게 연결되는 시작이며,
                      <br/>복음이 마음 깊숙이 흘러가는 통로가 됩니다.
                      <br/>
                      <br/>AURI는 이 시간을 통해
                      <br/> 다음세대가 예배를 배우고, 예배를 삶으로 이어가며,
                      <br/>하나님 안에서 참된 만족과 기쁨을 경험하도록 돕습니다.
                      <br/>
                      <br/>우리는 단순히 노는 것이 아니라,
                      <br/>놀이로 마음을 열고, 예배로 마음을 드리는
                      <br/>다음세대를 위한 캠프를 만들어갑니다.
                    </p>
                  </div>
                </div>
                <div className="lg:w-3/5">
                  <ImageWithFallback
                    src={getAssetPath("/images/auricamp people.jpg")}
                    alt="AURI 캠프"
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
                    src={getAssetPath("/images/auricampprogram-1.jpg")}
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
                    src={getAssetPath("/images/auricampprogram-2.jpg")}
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
                    src={getAssetPath("/images/auricampprogram-3.jpg")}
                    alt="공동체 활동"
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">진심으로 다가가는 시간</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    진심으로 드리는 예배를 통해 하나님께 더 가까이 나아갑니다.
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
                  src={getAssetPath("/images/auri-camp-schedule-full.jpg")}
                  alt="AURI 캠프 상세 일정표"
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
                  src={getAssetPath("/images/auri-camp-instructors.jpg")}
                  alt="AURI 캠프 강사진 소개"
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
                    <h3 className="text-xl font-semibold text-white mb-4">미정</h3>
                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start space-x-2">
                        <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>미정</span>
                      </p>
                      <p>🚗 준비중입니다.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Google Map */}
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284833133!2d128.6830!3d37.6553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM1LCsDM5JzE5LjEiTiAxMjjCsDQwJzU4LjgiRQ!5e0!3m2!1sko!2skr!4v1609459200000!5m2!1sko!2skr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="AURI 수련원 위치"
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-medium mb-2">위치 안내</h4>
                      <p className="text-gray-400 text-sm">강원도 평창군 대관령면 수련원길 123</p>
                    </div>
                  </div>

                  {/* Facility Images */}
                  <div className="grid grid-cols-2 gap-4">
                    {['1', '2', '3', '4'].map((num) => (
                      <div key={num} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                        <ImageWithFallback
                          src={getAssetPath(`/images/auri-facility-${num}.jpg`)}
                          alt={`시설 ${num}`}
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-3">
                          <p className="text-white text-sm font-medium">시설 {num}</p>
                        </div>
                      </div>
                    ))}
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
                    src={getAssetPath("/images/auri-camp-poster.jpg")}
                    alt="AURI 캠프 공식 포스터"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="mt-6 text-center">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>포스터 다운로드</span>
                  </button>
                  <p className="text-gray-400 text-sm mt-2">고해상도 포스터를 다운로드하여 인쇄하거나 공유하세요.</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white">참가 안내</h2>

              <div className="space-y-8">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">캠프 기본 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">개최 일정(여름/겨울)</span>
                      <span className="text-white">미정</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">캠프 기간</span>
                      <span className="text-white">2박 3일</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">참가 대상</span>
                      <span className="text-white">중학교 1학년 ~ 고등학교 3학년</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">모집 정원</span>
                      <span className="text-white">미정</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">참가비</span>
                      <span className="text-white font-semibold">미정</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4">자주 묻는 질문</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 캠프 참가 조건이 있나요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 중학교 1학년부터 고등학교 3학년까지 참가 가능합니다. 신앙 유무는 상관없으며, 캠프에 대한 열린 마음과 적극적인 참여 의지만 있으면 됩니다.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 준비물은 무엇인가요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 개인 세면도구, 2박 3일분 의류, 성경, 필기도구, 개인 상비약, 운동화를 준비해 주세요.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Q. 캠프비는 무엇이 포함되나요?</h4>
                      <p className="text-gray-400 text-sm leading-relaxed pl-4">
                        A. 캠프비에는 2박 3일 숙박비, 6회 식사비, 모든 프로그램 비용 등이 포함됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 AURI 캠프에 신청하세요
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            하나님의 사랑을 경험하고 평생 잊지 못할 추억을 만들어갈 특별한 경험이 여러분을 기다리고 있습니다.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowApplicationModal(true)}
              className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              지금 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-gray-700">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-bold text-white">AURI 캠프 신청</h3>

              {isApplicationPeriod ? (
                <div className="space-y-4">
                  <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">신청 가능</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      현재 AURI 캠프 신청을 받고 있습니다!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        window.open(applicationFormUrl, '_blank')
                        setShowApplicationModal(false)
                      }}
                      className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      신청폼 작성하기
                    </button>
                    <button
                      onClick={() => setShowApplicationModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-orange-400 font-medium">신청 기간 아님</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      지금은 신청기간이 아닙니다.
                      <br />다음 신청 기간을 기다려주세요.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-400 text-sm">
                      신청 시작 알림을 받고 싶으시다면 SNS를 팔로우해주세요!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a
                        href="https://www.instagram.com/auri_community/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Instagram className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href="https://www.youtube.com/@AURICOMMUNITY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Youtube className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowApplicationModal(false)}
                    className="w-full px-6 py-3 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
