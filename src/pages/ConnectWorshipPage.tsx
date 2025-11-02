import { useState, useEffect, useRef } from 'react'
import { Play } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

function AnimatedElement({ children, delay = 0, className = "" }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-16 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function ConnectWorshipPage() {
  const heroMedia = {
    type: "video",
    video: getAssetPath("/videos/connectworshipmain.mp4"),
    alt: "Connect Worship 히어로 영상"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden flex items-center justify-start">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          {heroMedia.type === 'video' && heroMedia.video ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ pointerEvents: 'none' }}
              >
                <source src={heroMedia.video} type="video/mp4" />
                비디오를 로드할 수 없습니다.
              </video>
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ) : null}
        </div>

        {/* Main Typography */}
        <div className="relative z-20 px-6 max-w-6xl mx-auto text-left">
          <AnimatedElement>
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-none">
              CONNECT
            </h1>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tight leading-none -mt-4 lg:-mt-8">
              WORSHIP
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={400}>
            <p className="text-lg md:text-xl text-white/80 mt-8 mb-12 font-light tracking-wide">
              MOVEMENT & PRAYER — SEOUL, KOREA
            </p>
          </AnimatedElement>

          <AnimatedElement delay={600}>
            <div className="flex items-center space-x-8">
              <button className="text-white/60 hover:text-white transition-colors duration-300 text-sm tracking-widest">
                ↓ SCROLL TO EXPLORE
              </button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Large Typography Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <AnimatedElement>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                  WORSHIP
                  <br />
                  <span className="text-white/30">THROUGH</span>
                  <br />
                  MOVEMENT
                </h2>
              </AnimatedElement>
            </div>

            <div className="lg:col-span-5">
              <AnimatedElement delay={300}>
                <div className="space-y-6">
                  <p className="text-sm font-light tracking-widest text-white/60 uppercase">
                    A Creative Worship Experience
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed font-light">
                    Connect Worship은 단순한 춤이 아닙니다. 하나님께 드리는 진정한 예배이며,
                    우리의 마음과 몸을 통해 표현하는 살아있는 찬양입니다.
                  </p>
                  <button className="text-white border-b border-white/30 hover:border-white transition-colors duration-300 text-sm tracking-wide font-light pb-1">
                    더 알아보기 →
                  </button>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Gallery Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedElement>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
                OUR
                <br />
                MOMENTS
              </h2>
            </div>
          </AnimatedElement>

          {/* Large Feature Image */}
          <AnimatedElement delay={200}>
            <div className="mb-16">
              <div className="aspect-[21/9] relative overflow-hidden">
                <ImageWithFallback
                  src={getAssetPath("/images/worship-feature-large.jpg")}
                  alt="Main worship performance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-white/80 text-sm tracking-widest">SUNDAY WORSHIP — FEBRUARY 2025</p>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Grid Gallery */}
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item, index) => (
              <AnimatedElement key={index} delay={300 + index * 100}>
                <div className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                  <ImageWithFallback
                    src={getAssetPath(`/images/worship-grid-${item}.jpg`)}
                    alt={`Gallery ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
