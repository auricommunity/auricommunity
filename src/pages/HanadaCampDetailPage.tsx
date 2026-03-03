import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { getAssetPath } from '../utils/path'

// 히어로 배경 미디어 설정 - 이미지 또는 영상 경로를 넣으면 배경이 활성화됩니다
const heroMedia = {
  // 영상 경로 (예: "/videos/hanada-hero.mp4")
  video: "",
  // 이미지 경로 (예: "/images/hanada-hero.jpg")
  image: "",
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-[15px] text-neutral-700 font-normal group-hover:text-black transition-colors pr-4">{question}</span>
        <ChevronRight className={`w-4 h-4 text-neutral-300 transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>
      <div className="overflow-hidden transition-all duration-400 ease-out" style={{ maxHeight: open ? '160px' : '0' }}>
        <p className="text-neutral-500 text-sm font-light leading-relaxed pb-6">{answer}</p>
      </div>
    </div>
  )
}

export default function HanadaCampDetailPage() {
  const [showModal, setShowModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isApplicationPeriod = false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Floating CTA */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors shadow-xl"
        >
          Register
        </button>
      </div>

      {/* ═══════ HERO (Dark → Light transition) ═══════ */}
      <section className="min-h-screen flex flex-col items-center justify-end relative px-6 pb-20 overflow-hidden bg-black text-white">
        {/* Background media */}
        <div className="absolute inset-0 z-0">
          {heroMedia.video && (
            <video
              autoPlay muted loop playsInline preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
            >
              <source src={getAssetPath(heroMedia.video)} type="video/mp4" />
            </video>
          )}
          {!heroMedia.video && heroMedia.image && (
            <img
              src={getAssetPath(heroMedia.image)}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* 오버레이 투명도 조절: bg-black/50 ~ bg-black/80 */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-8">
            AURI Community Presents
          </p>

          <h1 className="text-[clamp(4rem,14vw,12rem)] font-extralight tracking-[-0.04em] leading-[0.85] mb-2">
            하나다
          </h1>
          <p className="text-[clamp(1.5rem,4vw,3rem)] tracking-[0.3em] font-extralight text-white/40 uppercase mb-16">
            Camp
          </p>

          <p className="text-sm md:text-base font-light text-white/30 tracking-[0.15em] mb-20">
            따뜻한 만남, 하나 되는 우리
          </p>

          {/* Info bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/10 divide-x divide-white/10">
            {[
              { label: 'DATE', value: 'TBA' },
              { label: 'VENUE', value: 'TBA' },
              { label: 'FOR', value: 'TBA' },
              { label: 'PRICE', value: 'TBA' },
            ].map((item, i) => (
              <div key={i} className="py-5 md:py-6 text-center">
                <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase mb-1.5">{item.label}</p>
                <p className="text-sm font-light text-white/60">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transition to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ═══════ ABOUT (Light) ═══════ */}
      <section className="bg-white text-neutral-800 px-6 py-28 md:py-36">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-12 text-center">About the Camp</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="text-center space-y-10">
              <blockquote className="relative">
                <div className="text-neutral-200 text-6xl font-serif leading-none mb-4">"</div>
                <p className="text-[15px] text-neutral-500 font-light italic leading-relaxed -mt-6">
                  너희가 내 안에, 내가 너희 안에 거하면<br />
                  많은 열매를 맺느니라
                </p>
                <p className="text-[11px] text-neutral-400 mt-4 tracking-[0.15em]">— 요한복음 15:5</p>
              </blockquote>

              <div className="w-8 h-px bg-neutral-200 mx-auto" />

              <p className="text-base md:text-lg font-light leading-[2] text-neutral-500">
                하나다캠프는 서로를 깊이 알아가고,<br />
                말씀 안에서 함께 성장하며,<br />
                따뜻한 교제를 통해<br />
                진정한 공동체를 경험하는 캠프입니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PROGRAMME (Light gray) ═══════ */}
      <section className="bg-neutral-50 text-neutral-800 px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-16 text-center">Programme</p>
          </Reveal>

          {[
            { day: 'I', title: '첫째 날', items: ['도착 및 등록', '오프닝 워십', '말씀 집회', '소그룹 나눔', '교제의 시간'] },
            { day: 'II', title: '둘째 날', items: ['아침 큐티', '말씀 집회', '공동체 활동', '클로징 워십', '마무리 및 귀가'] },
          ].map((d, di) => (
            <Reveal key={di} delay={di * 0.15}>
              <div className={`grid md:grid-cols-[1fr_2fr] gap-8 py-12 ${di > 0 ? 'border-t border-neutral-200' : ''}`}>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-extralight text-neutral-200">{d.day}</span>
                  <span className="text-lg font-normal text-neutral-700">{d.title}</span>
                </div>
                <div className="space-y-4">
                  {d.items.map((item, ii) => (
                    <div key={ii} className="flex items-center gap-4 group">
                      <span className="text-[10px] text-neutral-300 tabular-nums w-4">{String(ii + 1).padStart(2, '0')}</span>
                      <div className="h-px flex-1 bg-neutral-200 group-hover:bg-neutral-400 transition-colors" />
                      <span className="text-sm text-neutral-600 font-light">{item}</span>
                    </div>
                  ))}
                  <p className="text-[11px] text-neutral-400 italic pt-2">* 세부 일정은 추후 공지됩니다</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════ VENUE (White) ═══════ */}
      <section className="bg-white text-neutral-800 px-6 py-28 md:py-36">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-16 text-center">Venue</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-xl font-normal text-neutral-700 mb-4">장소 미정</h3>
                <p className="flex items-start gap-3 text-neutral-500 font-light text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-neutral-400" />
                  <span>추후 공지될 예정입니다</span>
                </p>
              </div>
              <div className="aspect-[4/3] border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-5 h-5 text-neutral-300 mx-auto mb-2" />
                  <p className="text-[11px] text-neutral-400 tracking-wider">지도 준비중</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FAQ (Light gray) ═══════ */}
      <section className="bg-neutral-50 text-neutral-800 px-6 py-28 md:py-36">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-14 text-center">
              Frequently Asked Questions
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              {[
                { q: '하나다캠프는 어떤 캠프인가요?', a: '하나다캠프는 따뜻한 교제와 깊은 말씀 나눔을 통해 하나님 안에서 하나 되는 것을 경험하는 캠프입니다.' },
                { q: '참가 대상은 누구인가요?', a: '참가 대상은 추후 공지될 예정입니다. 공지사항을 확인해 주세요.' },
                { q: '참가비는 얼마인가요?', a: '참가비는 아직 미정입니다. 확정되는 대로 안내드리겠습니다.' },
                { q: '언제, 어디서 진행되나요?', a: '일시와 장소는 추후 공지될 예정입니다. 확정되는 대로 안내드리겠습니다.' },
                { q: '준비물은 무엇인가요?', a: '기본적으로 개인 세면도구, 성경, 필기도구를 준비해 주세요. 세부 사항은 캠프 확정 후 안내됩니다.' },
              ].map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CTA (Dark) ═══════ */}
      <section className="bg-black text-white px-6 py-28 md:py-36">
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-10">Join Us</p>
            <h2 className="text-3xl md:text-4xl font-extralight leading-relaxed text-white/80 mb-4">
              하나 되는 여정에<br />함께하세요
            </h2>
            <p className="text-sm text-white/30 font-light mb-14">
              캠프가 확정되면 가장 먼저 안내드리겠습니다
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-12 py-4 bg-white text-black text-sm font-semibold tracking-[0.15em] uppercase hover:bg-neutral-100 transition-colors"
            >
              Register Now
            </button>
          </div>
        </Reveal>
      </section>

      {/* Back */}
      <section className="bg-black py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Link to="/camp" className="inline-flex items-center text-white/25 hover:text-white/50 transition-colors text-sm gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>캠프 목록</span>
          </Link>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white text-neutral-800 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-10 text-center space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-3">하나다캠프</p>
                <h3 className="text-lg font-normal tracking-wide">참가 신청</h3>
              </div>

              {isApplicationPeriod ? (
                <div className="space-y-6">
                  <p className="text-neutral-500 text-sm font-light">
                    신청서를 작성하시면 담당자가<br />확인 후 연락드립니다.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full py-3.5 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors">
                      신청서 작성하기
                    </button>
                    <button onClick={() => setShowModal(false)} className="w-full py-3.5 text-neutral-400 text-sm hover:text-neutral-600 transition-colors">
                      닫기
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="py-6 border-t border-b border-neutral-100">
                    <p className="text-neutral-700 text-sm font-normal mb-1.5">아직 준비중입니다</p>
                    <p className="text-neutral-400 text-xs font-light">
                      캠프가 확정되면 안내드리겠습니다
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3.5 border border-neutral-200 text-neutral-600 text-sm tracking-wider hover:bg-neutral-50 transition-colors"
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
