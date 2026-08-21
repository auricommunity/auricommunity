import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import CampDetailNavigation from '../components/CampDetailNavigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { CAMP31_YOUTUBE_URL } from '../config/camp31'
import { getAssetPath } from '../utils/path'
import './Camp31DetailPage.css'

const CAMP31_BACKGROUND_VIDEO = getAssetPath('/videos/31camp-background.mp4')

const campFacts = [
  { number: '01', label: 'DATE', value: '3월 1일(주일) 저녁 — 2일(월) 오후' },
  { number: '02', label: 'PLACE', value: '일산하나교회' },
  { number: '03', label: 'PEOPLE', value: '청년 31명 · 선착순' },
  { number: '04', label: 'FEE', value: '사전 30,000원 · 일반 35,000원' },
]

const faqs = [
  {
    question: '참가 대상이 어떻게 되나요?',
    answer: '청년(대학생, 직장인)을 대상으로 하며, 31명 선착순으로 마감됩니다.',
  },
  {
    question: '참가비에는 무엇이 포함되나요?',
    answer: '1박 숙박, 3식 식사, 모든 프로그램 참가비가 포함됩니다.',
  },
  {
    question: '준비물은 무엇인가요?',
    answer: '개인 세면도구, 성경, 필기도구, 편한 복장을 준비해 주세요.',
  },
  {
    question: '사전등록과 일반등록의 차이는?',
    answer: '사전등록은 마감일 전까지 신청 시 30,000원, 이후 일반등록은 35,000원입니다.',
  },
]

export default function Camp31DetailPage() {
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 모집 상태 (다음 캠프 시 true로 변경하고 applicationFormUrl 업데이트)
  const isApplicationPeriod = false
  const applicationFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeB900CUIbpo9sjGRnBa2BDBp_QWuRDy-6lju6bm8_Z399f0Q/viewform?usp=dialog'

  useEffect(() => {
    const previousTitle = document.title
    document.title = '31 CAMP : RE:BUILDING | AURI COMMUNITY'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerHeight * 0.72)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setShowApplicationModal(false)
      }
    }
    const handleResize = () => {
      if (window.innerWidth / window.innerHeight > 1.1) setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    document.body.style.overflow = isMenuOpen || showApplicationModal ? 'hidden' : ''

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, showApplicationModal])

  const openApplication = () => {
    setIsMenuOpen(false)
    setShowApplicationModal(true)
  }

  return (
    <div className={`camp31-page ${isMenuOpen ? 'is-menu-open' : ''}`}>
      <section className="camp31-stage" aria-labelledby="camp31-title">
        <div className="camp31-plate" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata" poster={getAssetPath('/images/31camp-poster.jpeg')}>
            <source src={CAMP31_BACKGROUND_VIDEO} type="video/mp4" />
          </video>
        </div>

        <CampDetailNavigation open={isMenuOpen} onOpenChange={setIsMenuOpen} />

        <main className="camp31-hero">
          <p className="camp31-eyebrow">AURI COMMUNITY PRESENTS · 2026</p>
          <h1 id="camp31-title">
            <span>31 CAMP</span>
            <span>RE:BUILDING</span>
          </h1>
          <p className="camp31-hero-copy">
            <span>무너진 것을 다시 세우는 시간.</span>
            <span>함께 예배하고, 나누고, 회복하는 1박 2일의 여정.</span>
          </p>
          <div className="camp31-hero-actions">
            <button className="camp31-pill" onClick={openApplication}>참가 신청</button>
            <a href="#camp-story" className="camp31-ghost-link">
              캠프 이야기 <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </main>

        <div className="camp31-fact-strip" aria-label="캠프 핵심 정보">
          {campFacts.map((fact) => (
            <div className="camp31-fact" key={fact.label}>
              <span className="camp31-fact-number">{fact.number}</span>
              <span className="camp31-fact-label">{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <button
        className={`camp31-floating-cta ${isScrolled ? 'is-visible' : ''}`}
        onClick={openApplication}
        aria-hidden={!isScrolled}
        tabIndex={isScrolled ? 0 : -1}
      >
        참가 신청
      </button>

      <section id="camp-story" className="camp31-editorial camp31-section">
        <div className="camp31-section-kicker">01 — STORY</div>
        <div className="camp31-story-grid">
          <div className="camp31-story-title">
            <span aria-hidden="true">31</span>
            <h2>다시 세우는<br />우리의 믿음과 삶</h2>
          </div>
          <div className="camp31-story-copy">
            <blockquote>
              “또 그들에게 하나님의 선한 손이 나를 도우신 일과 왕이 내게 이른 말씀을 전하였더니 그들의 말이 일어나 건축하자 하고 모두 힘을 내어 이 선한 일을 하려 하매”
              <cite>느헤미야 2:18</cite>
            </blockquote>
            <p>
              31 CAMP는 느헤미야의 심정으로 무너진 성벽을 다시 세우듯,
              우리의 신앙과 삶을 RE:BUILDING 하는 1박 2일의 특별한 여정입니다.
            </p>
            <p>
              31명의 청년이 함께 예배하고, 나누고, 회복하며 하나님과의 깊은 만남을 경험합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="camp31-information camp31-section" aria-labelledby="information-title">
        <div className="camp31-section-kicker">02 — INFORMATION</div>
        <div className="camp31-section-heading">
          <h2 id="information-title">머무는 이틀의<br />필요한 정보</h2>
          <p>캠프에 필요한 핵심 안내를 한눈에 확인하세요.</p>
        </div>
        <dl className="camp31-info-list">
          {campFacts.map((fact) => (
            <div key={fact.label}>
              <dt><span>{fact.number}</span>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="camp31-visuals camp31-section" aria-labelledby="visuals-title">
        <div className="camp31-section-kicker">03 — CAMP GUIDE</div>
        <div className="camp31-section-heading">
          <h2 id="visuals-title">포스터와<br />타임 테이블</h2>
          <p>31 CAMP의 전체 안내와 이틀의 흐름입니다.</p>
        </div>
        <div className="camp31-visual-grid">
          <figure>
            <ImageWithFallback
              src={getAssetPath('/images/31camp-poster.jpeg')}
              alt="31 CAMP 포스터"
              className="camp31-guide-image"
            />
            <figcaption><span>01</span>OFFICIAL POSTER</figcaption>
          </figure>
          <figure>
            <ImageWithFallback
              src={getAssetPath('/images/31camp-schedule.png')}
              alt="31 CAMP 스케줄"
              className="camp31-guide-image"
            />
            <figcaption><span>02</span>TIME TABLE</figcaption>
          </figure>
        </div>
      </section>

      <section className="camp31-film camp31-section" aria-labelledby="camp31-film-title">
        <div className="camp31-section-kicker">04 — CAMP FILM</div>
        <div className="camp31-section-heading">
          <h2 id="camp31-film-title">함께 세운<br />우리의 순간</h2>
          <p>함께 예배하고 나누며 다시 세워진 31 CAMP의 시간을 영상으로 만나보세요.</p>
        </div>
        <div className="camp31-film-frame">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={CAMP31_YOUTUBE_URL}
            title="31 CAMP 영상"
          />
        </div>
      </section>

      <section className="camp31-location camp31-section" aria-labelledby="location-title">
        <div className="camp31-section-kicker">05 — LOCATION</div>
        <div className="camp31-location-grid">
          <div className="camp31-location-copy">
            <h2 id="location-title">일산하나교회</h2>
            <p><MapPin aria-hidden="true" />경기도 고양시 일산동구 애니골길 18-21</p>
            <span>31 CAMP의 예배와 교제가 시작되는 곳</span>
          </div>
          <div className="camp31-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.148282850283!2d126.78888737607612!3d37.66922337201218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9000bbd30cdd%3A0x7a21659847d35a7f!2z7J287IKw7ZWY64KY6rWQ7ZqM!5e0!3m2!1sko!2skr!4v1769490816671!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="일산하나교회 위치"
            />
          </div>
        </div>
      </section>

      <section className="camp31-faq camp31-section" aria-labelledby="faq-title">
        <div className="camp31-section-kicker">06 — FAQ</div>
        <div className="camp31-faq-grid">
          <div className="camp31-section-heading">
            <h2 id="faq-title">오시기 전에<br />확인해 주세요</h2>
          </div>
          <div className="camp31-faq-list">
            {faqs.map((item, index) => (
              <details key={item.question}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="camp31-final-cta">
        <p>AURI COMMUNITY · 31 CAMP</p>
        <h2>다시 세우는 여정에<br />함께하세요.</h2>
        <span>31명의 자리, 당신을 기다립니다.</span>
        <button className="camp31-pill" onClick={openApplication}>참가 신청하기</button>
      </section>

      <div className="camp31-back-link">
        <Link to="/camp"><ArrowLeft aria-hidden="true" />캠프 목록으로 돌아가기</Link>
      </div>

      {showApplicationModal && (
        <div className="camp31-modal-backdrop" onClick={() => setShowApplicationModal(false)}>
          <div className="camp31-modal" role="dialog" aria-modal="true" aria-labelledby="application-title" onClick={(event) => event.stopPropagation()}>
            <button className="camp31-modal-close" onClick={() => setShowApplicationModal(false)} aria-label="닫기">×</button>
            <p>31 CAMP · RE:BUILDING</p>
            <h3 id="application-title">31 CAMP 신청</h3>

            {isApplicationPeriod ? (
              <>
                <div className="camp31-modal-message">
                  신청서를 작성하시면 담당자가 확인 후 연락드립니다.
                </div>
                <button
                  className="camp31-pill"
                  onClick={() => {
                    window.open(applicationFormUrl, '_blank', 'noopener,noreferrer')
                    setShowApplicationModal(false)
                  }}
                >
                  신청서 작성하기
                </button>
              </>
            ) : (
              <>
                <div className="camp31-modal-message">
                  <strong>이번 캠프는 종료되었습니다.</strong>
                  함께해 주셔서 감사합니다.<br />다음 캠프에서 다시 만나요.
                </div>
                <button className="camp31-pill camp31-pill-outline" onClick={() => setShowApplicationModal(false)}>확인</button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
