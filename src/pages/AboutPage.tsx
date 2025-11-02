import { useState, useEffect, useRef } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

// 애니메이션 컴포넌트들
function SlideUpAnimation({ children, delay = 0, duration = 800 }: { children: React.ReactNode; delay?: number; duration?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay)
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`transform transition-all ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  )
}

function FadeInAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay)
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`transform transition-all ease-out duration-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  )
}

function CountingAnimation({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          const increment = target / 50
          let current = 0
          const interval = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(interval)
            } else {
              setCount(Math.floor(current))
            }
          }, 40)
        }
      },
      { threshold: 0.1 }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [hasStarted, target])

  return (
    <div ref={elementRef} className="text-4xl font-thin text-white mb-4">
      {count}{suffix}
    </div>
  )
}

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const backgroundImages = [
    getAssetPath("/images/aboutbackground.jpg"),
    getAssetPath("/images/aboutbackground2.jpg"),
    getAssetPath("/images/aboutbackground3.png"),
    getAssetPath("/images/aboutbackground4.jpg"),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`소개 배경 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-12">
            소개
          </h1>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div>
              <FadeInAnimation delay={200}>
                <div className="relative group">
                  <div className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                    <div className="relative mb-3 flex justify-center">
                      <div className="w-80 h-96 relative overflow-hidden rounded">
                        <ImageWithFallback
                          src={getAssetPath("/images/about1.jpg")}
                          alt="대표 김희성 목사"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInAnimation>
            </div>

            <div className="lg:col-span-2">
              <FadeInAnimation delay={400}>
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-light mb-6">
                    대표 인사말
                  </div>
                </div>
              </FadeInAnimation>

              <div className="space-y-4">
                <FadeInAnimation delay={600}>
                  <blockquote className="relative text-center">
                    <div className="absolute -left-4 -top-2 text-6xl text-white/20 font-serif leading-none">"</div>
                    <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic pl-8 pr-8">
                      복음이 멈춘 그 자리, 하나됨으로 다시 이어갑니다
                    </p>
                    <div className="absolute -right-4 -bottom-6 text-6xl text-white/20 font-serif leading-none">"</div>
                  </blockquote>
                </FadeInAnimation>

                <div className="space-y-3 text-white/70 font-light leading-relaxed text-sm">
                  <FadeInAnimation delay={800}>
                    <p>
                      지금 세대는 세상적인 문화의 습득 속도는 누구보다 빠르지만,
                      <br />그 어느 것보다 중요한 복음에 대해서는 누구보다 차가운 반응을 보입니다.
                      <br />이런 세상을 살아가며 다음세대를 바라보면 복음이 그들에게 흘러가고 있는가에 대한 의문이 들며
                      <br />교회가 짊어져야할 책임에 마음이 무거워지고, 안타깝다고 생각합니다.
                    </p>
                  </FadeInAnimation>

                  <FadeInAnimation delay={1000}>
                    <p>
                      다음세대를 향한 안타까움과 무거운 책임감을 가지고 설립한 '아우리 공동체'는
                      <br />다음세대를 다시 살리고, 성장하게 하고, 그들이 느끼는 영적 결핍을
                      <br />오직 하나님으로 충족시키기 위해 열심과 최선으로 나아가고 있습니다.
                    </p>
                  </FadeInAnimation>

                  <FadeInAnimation delay={1200}>
                    <p>
                      '아우리'를 향하신 주님의 뜻 안에 각 개인들이 연합으로 하나되고, 주님께서 주신 사명으로 공동체가 하나되어
                      <br />우리 모두를 위해 예비하시고 준비하신 자리에 순종하고 헌신하는 주님의 몸된 공동체가 되기를 간절히 소망합니다.
                    </p>
                  </FadeInAnimation>
                </div>

                <FadeInAnimation delay={1400}>
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent mb-1"></div>
                      <p className="text-white/80 font-light text-xs">AURI 공동체 대표</p>
                      <p className="text-base font-light text-white">김희성</p>
                    </div>
                  </div>
                </FadeInAnimation>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <SlideUpAnimation delay={200}>
              <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
                서로를 아우르며, 하나되어 다음세대를 섬기는 공동체
              </h2>
            </SlideUpAnimation>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="text-3xl font-light text-white mb-8">Story</div>
            <div className="space-y-8 text-white/70 font-light leading-relaxed text-lg">
              <SlideUpAnimation delay={1700}>
                <p>
                  2014년, 아우리 공동체와 아우리 캠프는 작은 교회들의 연합 수련회로 첫걸음을 내딛었습니다.
                  <br />비록 화려하진 않지만, 교회와 선교단체, 기관, 기업, 그리고 개인이 주님 안에서 하나 되어
                  <br />주어진 사명의 자리로 순종하며 나아가는 것, 이것이 바로 아우리의 정신입니다.
                </p>
              </SlideUpAnimation>

              <SlideUpAnimation delay={1900}>
                <p>
                  '아우르다'라는 이름처럼, 우리는 서로를 품고 하나 되어 섬겨왔습니다.
                  <br />때로는 단체의 이름이 드러나지 않고, 세상으로부터 박수나 칭찬을 받지 못했을지라도
                  <br />묵묵히 감당한 섬김의 자리에서 주님은 언제나 일하시고, 열매 맺게 하셨습니다.
                </p>
              </SlideUpAnimation>

              <SlideUpAnimation delay={2100}>
                <p>
                  앞으로도 우리는 주님 앞에서 아우리의 정체성을 붙들고,
                  <br />많은 이들과 함께 하나님의 부르심에 응답하는 공동체, 그리고 캠프로 걸어가겠습니다.
                </p>
              </SlideUpAnimation>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <CountingAnimation target={30} suffix="+" />
              <h4 className="text-lg font-light text-white mb-2">STAFF</h4>
              <p className="text-white/60 text-sm font-light">하나님의 사랑으로 시작된 특별한 여정</p>
            </div>
            <div className="text-center">
              <CountingAnimation target={5000} suffix="+" />
              <h4 className="text-lg font-light text-white mb-2">PEOPLE</h4>
              <p className="text-white/60 text-sm font-light">지금까지 함께한 소중한 가족들</p>
            </div>
            <div className="text-center">
              <CountingAnimation target={20} suffix="+" />
              <h4 className="text-lg font-light text-white mb-2">CAMP</h4>
              <p className="text-white/60 text-sm font-light">하나님과 함께한 특별한 시간들</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">AURI Vision</h2>
              <p className="text-xl text-white/70 font-light leading-relaxed">
                우리는 하나님의 사랑으로 다음세대를 섬기고, <br/>교회와 개인이 연합하여 세상에 소망을 전하는 공동체를 지향합니다.
              </p>
            </div>
          </SlideUpAnimation>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <FadeInAnimation delay={800}>
              <div>
                <h3 className="text-2xl font-light text-white mb-4">사랑의 실천</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  하나님의 사랑을 받아 이웃과 세상을 향해 그 사랑을 나누며<br/>
                  실천하는 공동체입니다.
                </p>
              </div>
            </FadeInAnimation>

            <FadeInAnimation delay={1000}>
              <div>
                <h3 className="text-2xl font-light text-white mb-4">함께 성장</h3>
                <p className="text-white/70 font-light leading-relaxed">
                  캠프, 예배, 모임을 통해 믿음 안에서 서로를 세우며,<br/>
                  영적으로 함께 자라고 성숙한 제자로 살아갑니다.
                </p>
              </div>
            </FadeInAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-thin text-white mb-8">핵심 가치</h3>
            </div>
          </SlideUpAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "사랑", desc: "하나님의 무조건적인 사랑을 경험하고, 다음세대와 공동체를 향해 그 사랑을 전합니다.", icon: "❤️" },
              { title: "교제", desc: "믿음 안에서 한 가족이 되어 서로를 돌보고, 함께 걸어가는 연합 공동체입니다.", icon: "🤝" },
              { title: "성장", desc: "말씀, 예배, 기도 가운데 다음세대가 신앙 안에서 자라며 성숙한 제자가 됩니다.", icon: "🌱" },
              { title: "섬김", desc: "예수님의 마음으로 지역과 다음세대를 섬기며, 세상에 소망을 전합니다.", icon: "🙏" }
            ].map((value, index) => (
              <FadeInAnimation key={index} delay={index * 200}>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h4 className="text-lg font-light text-white mb-2">{value.title}</h4>
                  <p className="text-white/60 text-sm">{value.desc}</p>
                </div>
              </FadeInAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SlideUpAnimation>
            <div className="text-center mb-16">
              <h3 className="text-3xl font-thin text-white mb-8">AURI History</h3>
              <p className="text-white/60 font-light">하나님의 인도하심 아래 걸어온 소중한 발걸음들</p>
            </div>
          </SlideUpAnimation>
          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20"></div>
            {/* Timeline Line - Mobile */}
            <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-white/20"></div>

            <div className="space-y-12 md:space-y-16">
              {[
                {
                  year: "2014",
                  title: "AURI 공동체 설립",
                  description: "작은 교회들이 모여 서로 연합하여 시작한 것이 아우리의 시작입니다.",
                  side: "left",
                  delay: 0
                },
                {
                  year: "2018",
                  title: "비영리단체 등록",
                  description: "정식 비영리단체로 등록하며 체계적인 사역을 시작했습니다. 연간 100명 이상의 청소년들이 참여하게 되었습니다.",
                  side: "right",
                  delay: 200
                },
                {
                  year: "2020",
                  title: "온라인 사역 확대",
                  description: "COVID-19 상황에 대응하여 온라인 예배와 캠프 프로그램을 개발했습니다. 전국 어디서나 참여 가능하게 되었습니다.",
                  side: "left",
                  delay: 400
                },
                {
                  year: "2022",
                  title: "지역 사회 확장",
                  description: "서울 외에도 부산, 대구 등 주요 도시로 사역을 확장하여 더 많은 사람들과 하나님의 사랑을 나누게 되었습니다.",
                  side: "right",
                  delay: 600
                },
                {
                  year: "2025",
                  title: "새로운 비전",
                  description: "현재까지 5000명 이상의 청소년들이 참여했으며, 차세대 다음세대 사역과 비전을 향해 나아가고 있습니다.",
                  side: "left",
                  delay: 800
                }
              ].map((item, index) => (
                <FadeInAnimation key={index} delay={item.delay}>
                  {/* Desktop Layout */}
                  <div className={`hidden md:flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-1/2 ${item.side === "left" ? "pr-8 text-right" : "pl-8"}`}>
                      <div className="bg-zinc-800 p-6 rounded-lg border border-white/10">
                        <div className={`text-2xl font-thin text-white mb-2 ${item.side === "right" ? "text-left" : "text-right"}`}>{item.year}</div>
                        <h4 className={`text-lg font-light text-white mb-3 ${item.side === "right" ? "text-left" : "text-right"}`}>{item.title}</h4>
                        <p className={`text-white/70 text-sm leading-relaxed ${item.side === "right" ? "text-left" : "text-right"}`}>{item.description}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-zinc-900 z-10 relative"></div>
                    <div className="w-1/2"></div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-start">
                    <div className="w-4 h-4 bg-white rounded-full border-4 border-zinc-900 z-10 relative mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-zinc-800 p-6 rounded-lg border border-white/10">
                        <div className="text-2xl font-thin text-white mb-2">{item.year}</div>
                        <h4 className="text-lg font-light text-white mb-3">{item.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeInAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
