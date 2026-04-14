import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
// import { X } from "lucide-react" // 초기 접속 팝업용 (주석 해제하여 활용)
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
// import ImageWithFallback from "../components/ImageWithFallback" // 초기 접속 팝업용 (주석 해제하여 활용)
import { homeSlides } from "../lib/site-data"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideProgress, setSlideProgress] = useState(() => homeSlides.map(() => 0))
  // ===== 초기 접속 팝업 (주석 해제하여 활용) =====
  // const [showPopup, setShowPopup] = useState(false)
  //
  // useEffect(() => {
  //   const hideUntil = localStorage.getItem('hidePopupUntil')
  //   if (hideUntil !== new Date().toDateString()) {
  //     setShowPopup(true)
  //   }
  // }, [])
  // ===== 초기 접속 팝업 상태 끝 =====

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideProgress(prev => {
        const newProgress = [...prev]
        const currentSlideDuration = homeSlides[currentSlide]?.duration || 5000
        newProgress[currentSlide] += (100 / (currentSlideDuration / 100))

        if (newProgress[currentSlide] >= 100) {
          newProgress[currentSlide] = 100
          setTimeout(() => {
            const nextSlide = (currentSlide + 1) % homeSlides.length
            setCurrentSlide(nextSlide)
            const resetProgress = [...newProgress]
            resetProgress[nextSlide] = 0
            setSlideProgress(resetProgress)
          }, 100)
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(timer)
  }, [currentSlide])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setSlideProgress(prev => {
      const newProgress = [...prev]
      newProgress[index] = 0
      return newProgress
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          {homeSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.mediaType === 'video' && slide.video && index === currentSlide ? (
                <div className="relative w-full h-full">
                  <video
                    autoPlay
                    muted
                    loop={slide.videoSettings?.loop !== false}
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ pointerEvents: 'none' }}
                  >
                    <source src={slide.video} type="video/mp4" />
                    비디오를 로드할 수 없습니다.
                  </video>
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              ) : index !== currentSlide ? (
                <div className="absolute inset-0 bg-zinc-900"></div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-4 transition-all duration-1000">
            {homeSlides[currentSlide].mainTitle}
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-white/80 mb-4 transition-all duration-1000">
            {homeSlides[currentSlide].subtitle}
          </p>
          <p className="text-sm md:text-base font-light text-white/60 mb-16 max-w-2xl mx-auto transition-all duration-1000">
            {homeSlides[currentSlide].description}
          </p>

          {/* Navigation Pills */}
          <div className="flex justify-center space-x-0 mb-8">
            {homeSlides.map((slide, index) => (
              <div key={slide.id} className="relative">
                <button
                  onClick={() => handleSlideChange(index)}
                  className={`px-8 py-4 text-sm font-light tracking-wide transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-transparent backdrop-blur-sm'
                      : 'bg-transparent backdrop-blur-sm hover:bg-white/5'
                  } ${
                    index === 0 ? 'border-r border-white/20' : ''
                  } ${
                    index === 1 ? 'border-r border-white/20' : ''
                  }`}
                >
                  <span className="text-white/50 mr-4">{slide.number}</span>
                  {slide.title}
                </button>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/20 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ease-linear ${
                      index === currentSlide ? 'bg-white' : 'bg-white/30'
                    }`}
                    style={{
                      width: index === currentSlide ? `${slideProgress[index]}%` : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with YouTube Video */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
                세대를 아우르다, <br />하나로 세우다
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                AURI는 2014년부터 하나님의 사랑을 나누고<br/>함께 성장하는 특별한 공동체입니다.
              </p>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                다양한 캠프와 예배를 통해 하나님과 더 깊이 만나고,<br/>
                믿음의 가족들과 함께 영적으로 성장하며 소중한 추억을 만들어가고있습니다.
              </p>
              <Link to="/about">
                <button className="border border-white/30 text-white px-8 py-3 font-light hover:bg-white/10 transition-colors">
                  자세히 알아보기
                </button>
              </Link>
            </div>

            {/* YouTube Video */}
            <div className="relative">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/ZAGecliHJ7Q?si=T-DJKuoCEGq5nJX9"
                  title="AURI COMMUNITY 소개 비디오"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-thin tracking-wide text-white mb-4">
            하나님의 사역을 함께하세요
          </h2>
          <p className="text-white/60 font-light mb-8">
            여러분의 소중한 후원이 청소년들에게 하나님의 사랑을 전하는 귀한 사역이 됩니다
          </p>

          <div className="space-y-4">
            <Link to="/donation" className="inline-flex items-center px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors duration-300 group">
              <span>후원하기</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <p className="text-white/60 text-sm">
              모든 후원금은 청소년 사역을 위해 투명하게 사용됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 초기 접속 팝업 (주석 해제하여 활용) =====
         사용법: 위쪽 showPopup 상태와 useEffect도 함께 주석 해제 필요
         포스터 이미지, 링크 경로, 버튼 텍스트를 수정하여 다른 캠프에도 활용 가능

      {showPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <span>닫기</span>
              <X className="w-5 h-5" />
            </button>

            <Link to="/camp/31" onClick={() => setShowPopup(false)}>
              <ImageWithFallback
                src={getAssetPath("/images/31camp-poster.jpeg")}
                alt="31 CAMP 포스터"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </Link>

            <Link
              to="/camp/31"
              onClick={() => setShowPopup(false)}
              className="block w-full mt-4 py-4 bg-white text-black text-center font-light tracking-wider hover:bg-white/90 transition-colors"
            >
              자세히 보기
            </Link>

            <button
              onClick={() => {
                setShowPopup(false)
                localStorage.setItem('hidePopupUntil', new Date().toDateString())
              }}
              className="block w-full mt-2 py-3 text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              오늘 하루 보지 않기
            </button>
          </div>
        </div>
      )}
      ===== 초기 접속 팝업 끝 ===== */}

      <Footer />
    </div>
  )
}
