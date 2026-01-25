import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Clock, ChevronDown } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

// 캠프 날짜 설정 (2026년 3월 1일)
const campDate = new Date('2026-03-01T18:00:00')

// 타이머 계산 함수
function calculateTimeLeft() {
  const now = new Date()
  const difference = campDate.getTime() - now.getTime()

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

export default function Camp31DetailPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  // 모집 상태
  const isApplicationPeriod = true
  const applicationFormUrl = "https://forms.gle/YOUR_FORM_ID"

  // 카운트다운 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Floating CTA Button */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button
          onClick={() => setShowApplicationModal(true)}
          className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-all shadow-2xl shadow-white/20"
        >
          지금 신청하기
        </button>
      </div>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
          {/* Gradient Blobs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="text-xs tracking-[0.3em] text-white/50 uppercase">AURI Community Presents</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-4">
            31 CAMP
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide text-white/80 mb-12">
            RE:BUILDING
          </p>

          {/* Verse */}
          <div className="mb-16">
            <p className="text-sm md:text-base text-white/60 font-light italic max-w-2xl mx-auto leading-relaxed">
              "또 그들에게 하나님의 선한 손이 나를 도우신 일과 왕이 내게 이른 말씀을 전하였더니<br />
              그들의 말이 일어나 건축하자 하고 모두 힘을 내어 이 선한 일을 하려 하매"
            </p>
            <p className="text-xs text-white/40 mt-4 tracking-wider">느헤미야 2:18</p>
          </div>

          {/* Countdown */}
          <div className="flex justify-center gap-8 md:gap-12 mb-16">
            {[
              { value: timeLeft.days, label: 'DAYS' },
              { value: timeLeft.hours, label: 'HRS' },
              { value: timeLeft.minutes, label: 'MIN' },
              { value: timeLeft.seconds, label: 'SEC' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-extralight tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs tracking-[0.2em] text-white/40 mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowApplicationModal(true)}
            className="group inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-light tracking-wider hover:bg-white hover:text-black transition-all duration-500"
          >
            <span>참가 신청</span>
            <span className="text-xs opacity-50">31명 한정</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/30" />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Information</span>
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { icon: Calendar, label: '일시', value: '3월 1일(주일) 저녁', sub: '~ 2일(월) 오후', color: 'text-blue-400' },
              { icon: MapPin, label: '장소', value: '일산하나교회', sub: '경기 고양시 일산동구', color: 'text-green-400' },
              { icon: Users, label: '대상', value: '청년 31명', sub: '선착순 마감', color: 'text-purple-400' },
              { icon: Clock, label: '참가비', value: '사전 30,000원', sub: '일반 35,000원', color: 'text-orange-400' }
            ].map((item, index) => (
              <div key={index} className="bg-black p-8 md:p-10 text-center">
                <item.icon className={`w-5 h-5 mx-auto mb-6 ${item.color}`} />
                <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">{item.label}</div>
                <div className="text-lg font-light mb-1">{item.value}</div>
                <div className="text-sm text-white/50">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Gradient Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">About</span>
          </div>

          <div className="space-y-8 text-center">
            <p className="text-xl md:text-2xl font-extralight leading-relaxed text-white/80">
              무너진 것을 다시 세우는 시간
            </p>
            <p className="text-base md:text-lg font-light leading-loose text-white/60">
              31 CAMP는 느헤미야의 심정으로<br />
              무너진 성벽을 다시 세우듯,<br />
              우리의 신앙과 삶을 RE:BUILDING 하는<br />
              1박 2일의 특별한 여정입니다.
            </p>
            <p className="text-base md:text-lg font-light leading-loose text-white/60">
              31명의 청년이 모여<br />
              함께 예배하고, 나누고, 회복하는<br />
              하나님과의 깊은 만남을 경험합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Poster Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Poster</span>
          </div>

          <div className="relative">
            <ImageWithFallback
              src={getAssetPath("/images/31camp-poster.jpeg")}
              alt="31 CAMP 포스터"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Schedule</span>
          </div>

          <div className="relative">
            {/* Blur Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-white/80 text-lg font-light tracking-wide">추후 공개됩니다</p>
              </div>
            </div>

            <div className="space-y-0 blur-sm select-none">
              {/* Day 1 */}
              <div className="border-l border-white/20 pl-8 pb-16 relative">
                <div className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full -translate-x-[5px]"></div>
                <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">Day 1 — 3월 1일 (주일)</div>
                <div className="space-y-3 text-white/70 font-light">
                  <p>18:00 — 등록 및 체크인</p>
                  <p>19:00 — 저녁식사</p>
                  <p>20:00 — 오프닝 & 아이스브레이킹</p>
                  <p>21:00 — 저녁 집회</p>
                  <p>23:00 — 소그룹 나눔</p>
                </div>
              </div>

              {/* Day 2 */}
              <div className="border-l border-white/20 pl-8 relative">
                <div className="absolute left-0 top-0 w-2 h-2 bg-white rounded-full -translate-x-[5px]"></div>
                <div className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">Day 2 — 3월 2일 (월)</div>
                <div className="space-y-3 text-white/70 font-light">
                  <p>07:00 — 아침 큐티</p>
                  <p>08:00 — 아침식사</p>
                  <p>09:30 — 오전 집회</p>
                  <p>12:00 — 점심식사</p>
                  <p>13:30 — 클로징 & 파송</p>
                  <p>14:30 — 해산</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Location</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-extralight">일산하나교회</h3>
              <div className="space-y-3 text-white/60 font-light">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-green-400" />
                  <span>경기도 고양시 일산동구 애니골길 18-21</span>
                </p>
              </div>
            </div>

            <div className="aspect-video bg-zinc-900 rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.1234567890123!2d126.7700000!3d37.6600000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDM5JzM2LjAiTiAxMjbCsDQ2JzEyLjAiRQ!5e0!3m2!1sko!2skr!4v1609459200000!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="일산하나교회 위치"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">FAQ</span>
          </div>

          <div className="space-y-8">
            {[
              { q: '참가 대상이 어떻게 되나요?', a: '청년(대학생, 직장인)을 대상으로 하며, 31명 선착순으로 마감됩니다.' },
              { q: '참가비에는 무엇이 포함되나요?', a: '1박 숙박, 3식 식사, 모든 프로그램 참가비가 포함됩니다.' },
              { q: '준비물은 무엇인가요?', a: '개인 세면도구, 성경, 필기도구, 편한 복장을 준비해 주세요.' },
              { q: '사전등록과 일반등록의 차이는?', a: '사전등록은 마감일 전까지 신청 시 30,000원, 이후 일반등록은 35,000원입니다.' }
            ].map((item, index) => (
              <div key={index} className="border-b border-white/10 pb-8">
                <h4 className="text-white font-light mb-3">{item.q}</h4>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-8">Join Us</p>
          <h2 className="text-3xl md:text-4xl font-extralight mb-6">
            다시 세우는 여정에<br />함께하세요
          </h2>
          <p className="text-white/50 font-light mb-12">
            31명의 자리, 당신을 기다립니다
          </p>
          <button
            onClick={() => setShowApplicationModal(true)}
            className="px-12 py-5 bg-white text-black font-light tracking-wider hover:bg-white/90 transition-all"
          >
            참가 신청하기
          </button>
        </div>
      </section>

      {/* Back to Camp List */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Link to="/camp" className="inline-flex items-center text-white/40 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            캠프 목록으로 돌아가기
          </Link>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 max-w-md w-full p-8 border border-white/10">
            <div className="text-center space-y-6">
              <h3 className="text-xl font-light tracking-wide">31 CAMP 신청</h3>

              {isApplicationPeriod ? (
                <div className="space-y-6">
                  <div className="py-4 border-y border-white/10">
                    <p className="text-white/60 text-sm font-light">
                      신청서를 작성하시면 담당자가 확인 후<br />연락드립니다.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        window.open(applicationFormUrl, '_blank')
                        setShowApplicationModal(false)
                      }}
                      className="w-full py-4 bg-white text-black font-light tracking-wider hover:bg-white/90 transition-colors"
                    >
                      신청서 작성하기
                    </button>
                    <button
                      onClick={() => setShowApplicationModal(false)}
                      className="w-full py-4 border border-white/20 text-white font-light tracking-wider hover:bg-white/5 transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="py-4 border-y border-white/10">
                    <p className="text-white/60 text-sm">
                      현재 신청 기간이 아닙니다.
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

      <Footer />
    </div>
  )
}
