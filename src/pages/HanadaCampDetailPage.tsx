import { useEffect, useState } from 'react'
import CampDetailNavigation from '../components/CampDetailNavigation'
import { HANADA_CAMP_YOUTUBE_URL } from '../config/hanadaCamp'
import { getAssetPath } from '../utils/path'
import './HanadaCampDetailPage.css'

const CAMP_VIDEO_URL = getAssetPath('/videos/camp.mp4')
const HANADA_POSTER_IMAGE = getAssetPath('/images/hanada-camp-poster.jpg')
const HANADA_SCHEDULE_IMAGE = getAssetPath('/images/hanada-camp-schedule.jpg')

function getYouTubeEmbedUrl(value: string) {
  const source = value.trim()
  if (!source) return ''

  try {
    const url = new URL(source)
    const hostname = url.hostname.replace(/^www\./, '')
    const isYouTube = hostname === 'youtube.com' || hostname.endsWith('.youtube.com')
    const isYouTubeNoCookie = hostname === 'youtube-nocookie.com' || hostname.endsWith('.youtube-nocookie.com')
    let videoId = ''

    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] ?? ''
    } else if (isYouTube || isYouTubeNoCookie) {
      const parts = url.pathname.split('/').filter(Boolean)
      if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live') {
        videoId = parts[1] ?? ''
      } else {
        videoId = url.searchParams.get('v') ?? ''
      }
    }

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return ''
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
  } catch {
    return ''
  }
}

const HANADA_YOUTUBE_EMBED_URL = getYouTubeEmbedUrl(HANADA_CAMP_YOUTUBE_URL)

const faqItems = [
  ['하나다캠프는 어떤 캠프인가요?', '말씀과 교제 안에서 서로를 깊이 알아가고 하나님 안에서 하나 되는 캠프입니다.'],
  ['참가 대상은 누구인가요?', '자립 및 미자립 교회 청소년을 위한 캠프입니다.'],
  ['일정과 장소는 정해졌나요?', '2026년 7월 23일부터 25일까지 제주청소년수련원에서 진행됩니다.'],
  ['참가비는 얼마인가요?', '자립교회는 80,000원, 미자립교회는 40,000원입니다. 자립교회는 7월 6일까지 사전등록 시 75,000원입니다.'],
]

export default function HanadaCampDetailPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showApplicationModal, setShowApplicationModal] = useState(false)

  useEffect(() => {
    const previousTitle = document.title

    document.title = '하나다 CAMP | AURI COMMUNITY'
    document.documentElement.classList.add('hanada-editorial-document')
    document.body.classList.add('hanada-editorial-body')

    return () => {
      document.title = previousTitle
      document.documentElement.classList.remove('hanada-editorial-document')
      document.body.classList.remove('hanada-editorial-body')
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setShowApplicationModal(false)
      }
    }
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = menuOpen || showApplicationModal ? 'hidden' : ''

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [menuOpen, showApplicationModal])

  return (
    <main className="hanada-editorial-page min-h-full w-full overflow-x-hidden bg-black text-white">
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black" id="hanada-home">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
          src={CAMP_VIDEO_URL}
        />

        <CampDetailNavigation open={menuOpen} onOpenChange={setMenuOpen} />

        <div className="relative z-10 h-full w-full">
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-48 bg-gradient-to-b from-transparent to-black" />

          <h1 className="hanada-editorial-title absolute left-4 top-[18%] z-10 text-[14vw] font-medium text-white md:left-10 md:text-[13vw]">
            hanada
          </h1>
          <h1 className="hanada-editorial-title absolute right-4 top-[38%] z-10 text-[14vw] font-medium text-white md:right-10 md:text-[13vw]">
            camp
          </h1>
          <h1 className="hanada-editorial-title absolute left-[18%] top-[58%] z-10 text-[14vw] font-medium text-white md:left-[28%] md:text-[13vw]">
            together
          </h1>

          <p className="absolute left-6 top-[46%] z-10 max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10">
            말씀 안에서 하나 되고,<br />새로운 흐름을 함께 입는 시간
          </p>

          <div className="absolute right-6 top-[14%] z-10 md:right-24">
            <div className="flex items-center justify-end gap-3">
              <span className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
              <span className="whitespace-nowrap text-2xl font-medium tracking-tight md:text-4xl">2026.07.23–07.25</span>
            </div>
            <p className="mt-1 text-right text-xs text-white/70 md:text-sm">camp date</p>
          </div>

          <div className="absolute bottom-20 left-6 z-10 md:bottom-24 md:left-20">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-medium tracking-tight md:text-5xl">youth</span>
              <span className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            </div>
            <p className="mt-1 text-xs text-white/70 md:text-sm">자립 및 미자립 교회 청소년</p>
          </div>

          <div className="absolute bottom-16 right-6 z-10 md:bottom-20 md:right-20">
            <div className="flex items-center justify-end gap-3">
              <span className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
              <span className="text-4xl font-medium tracking-tight md:text-5xl">JEJU</span>
            </div>
            <p className="mt-1 text-right text-xs text-white/70 md:text-sm">제주청소년수련원 / venue</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-28 md:px-10 md:py-48" id="hanada-about">
        <p className="mb-12 text-sm font-medium tracking-[0.18em] text-white/70">01 / about hanada</p>
        <h2 className="max-w-[1200px] text-[clamp(3.4rem,9vw,9rem)] font-medium leading-[0.92] tracking-[-0.055em]">
          세상을<br />하나님 나라의<br /><span className="text-white/75">TREND</span>로 입다
        </h2>

        <div className="mt-20 grid gap-12 border-t border-white/20 pt-10 md:mt-28 xl:grid-cols-[0.55fr_1.45fr] xl:items-start xl:gap-16">
          <p className="max-w-[34rem] text-lg font-light leading-8 text-white/75 md:text-xl md:leading-9">
            하나다캠프는 서로를 깊이 알아가고 말씀 안에서 함께 성장하며,
            따뜻한 교제를 통해 진정한 공동체를 경험하는 캠프입니다.
          </p>
          <blockquote className="max-w-[58rem] text-[clamp(1.2rem,1.8vw,1.5rem)] font-normal leading-[1.55] tracking-[-0.04em] xl:justify-self-end xl:pl-4">
            <span className="block">“너희는 이 세대를 본받지 말고</span>
            <span className="block">오직 마음을 새롭게 함으로 변화를 받아</span>
            <span className="block">하나님의 선하시고 기뻐하시고 온전하신 뜻이 무엇인지 분별하도록 하라”</span>
            <cite className="mt-8 block text-sm not-italic tracking-[0.16em] text-white/65">로마서 12:2</cite>
          </blockquote>
        </div>
      </section>

      <section className="mx-6 grid border-y border-white/20 md:mx-10 md:grid-cols-2 xl:grid-cols-4" aria-label="하나다캠프 기본 정보">
        {[
          ['01', 'for', '자립 및 미자립 교회 청소년', ''],
          ['02', 'date', '2026.07.23 - 07.25', ''],
          ['03', 'venue', '제주청소년수련원', ''],
          ['04', 'fee', '자립 80,000원 / 미자립 40,000원', '사전등록 시 자립 75,000원 · 7월 6일까지'],
        ].map(([number, label, value, note], index) => (
          <article className={`flex min-h-36 items-center gap-6 py-6 md:min-h-40 md:px-8 md:py-7 ${index > 0 ? 'border-t border-white/20' : ''} ${index % 2 === 1 ? 'md:border-l md:border-t-0' : ''} ${index > 1 ? 'md:border-t' : ''} ${index > 0 ? 'xl:border-l xl:border-t-0' : 'xl:border-t-0'}`} key={label}>
            <span className="text-sm text-white/55">{number}</span>
            <div>
              <p className="mb-2 text-sm tracking-[0.16em] text-white/65">{label}</p>
              <strong className="text-lg font-normal leading-snug md:text-xl">{value}</strong>
              {note && <p className="mt-2 text-sm leading-5 text-white/65">{note}</p>}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-28 md:px-10 md:py-48" id="hanada-film">
        <div className="mb-16 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-24">
          <div>
            <p className="mb-12 text-sm font-medium tracking-[0.18em] text-white/70">02 / camp film</p>
            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">하나다의 순간을<br />영상으로 만나다</h2>
          </div>
          <div className="max-w-lg md:w-max md:max-w-none md:justify-self-end">
            <p className="text-base font-normal leading-7 text-white/75 md:whitespace-nowrap md:text-[17px] md:leading-8 lg:text-lg">
              함께 예배하고 웃으며 하나 되어 가는 캠프의 순간을 영상으로 만나보세요.
            </p>
            <a
              aria-label="캠다청 인스타그램 방문하기"
              className="mt-5 inline-flex items-center gap-3 border-b border-white/30 pb-1 text-sm tracking-[0.08em] text-white/70 transition-colors hover:border-white hover:text-white"
              href="https://www.instagram.com/camdachung/"
              rel="noreferrer"
              target="_blank"
            >
              <span>영상 자료 · 캠다청</span>
              <span>@camdachung ↗</span>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-neutral-900 shadow-2xl md:rounded-[2rem]">
          {HANADA_YOUTUBE_EMBED_URL ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video w-full bg-black"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src={HANADA_YOUTUBE_EMBED_URL}
              title="하나다캠프 영상"
            />
          ) : (
            <video
              aria-label="하나다캠프 영상"
              className="aspect-video w-full bg-black object-cover"
              controls
              playsInline
              preload="metadata"
              src={CAMP_VIDEO_URL}
            />
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-28 md:px-10 md:py-48" id="hanada-programme">
        <div className="mb-16 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-24">
          <div>
            <p className="mb-12 text-sm font-medium tracking-[0.18em] text-white/70">03 / programme</p>
            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">poster &amp;<br />timetable</h2>
          </div>
          <p className="max-w-lg text-base font-normal leading-7 text-white/75 md:justify-self-end md:text-lg md:leading-8">
            2026 여름 하나다캠프의 공식 포스터와 전체 일정을 확인해 보세요.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2">
          <figure>
            <figcaption className="mb-4 flex items-center justify-between text-sm tracking-[0.14em] text-white/65">
              <span>01 / official poster</span>
              <span>2026</span>
            </figcaption>
            <a aria-label="하나다캠프 공식 포스터 크게 보기" className="block overflow-hidden rounded-[1.5rem] border border-white/20 bg-neutral-900 md:rounded-[2rem]" href={HANADA_POSTER_IMAGE} rel="noreferrer" target="_blank">
              <img alt="2026 여름 하나다캠프 공식 포스터" className="h-auto w-full transition-transform duration-500 hover:scale-[1.015]" loading="lazy" src={HANADA_POSTER_IMAGE} />
            </a>
          </figure>

          <figure>
            <figcaption className="mb-4 flex items-center justify-between text-sm tracking-[0.14em] text-white/65">
              <span>02 / timetable</span>
              <span>07.23 — 07.25</span>
            </figcaption>
            <a aria-label="하나다캠프 타임테이블 크게 보기" className="block overflow-hidden rounded-[1.5rem] border border-white/20 bg-neutral-900 md:rounded-[2rem]" href={HANADA_SCHEDULE_IMAGE} rel="noreferrer" target="_blank">
              <img alt="2026 여름 하나다캠프 타임테이블" className="h-auto w-full transition-transform duration-500 hover:scale-[1.015]" loading="lazy" src={HANADA_SCHEDULE_IMAGE} />
            </a>
          </figure>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] border-t border-white/20 px-6 py-28 md:px-10 md:py-48" id="hanada-faq">
        <p className="mb-12 text-sm font-medium tracking-[0.18em] text-white/70">04 / faq</p>
        <div className="grid gap-20 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-5xl font-medium leading-[0.9] tracking-[-0.05em] md:text-8xl">before<br />we meet</h2>
          <div>
            {faqItems.map(([question, answer], index) => (
              <details className="group border-t border-white/20 last:border-b" key={question}>
                <summary className="grid min-h-24 cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-center text-base md:text-lg">
                  <span className="text-sm text-white/55">{String(index + 1).padStart(2, '0')}</span>
                  {question}
                  <b className="text-2xl font-light transition-transform group-open:rotate-45">+</b>
                </summary>
                <p className="mb-8 ml-12 max-w-xl text-base font-light leading-7 text-white/70 md:text-lg">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[720px] flex-col items-center justify-center px-6 py-28 text-center">
        <p className="mb-12 text-sm font-medium tracking-[0.18em] text-white/70">hanada camp / coming soon</p>
        <h2 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.9] tracking-[-0.055em]">one in faith<br />together</h2>
        <p className="mt-10 text-base font-light text-white/70 md:text-lg">하나다캠프의 다음 이야기가 곧 시작됩니다.</p>
        <button
          className="mt-10 rounded-full bg-white px-8 py-4 text-sm text-black transition-colors hover:bg-neutral-200"
          onClick={() => setShowApplicationModal(true)}
          type="button"
        >
          참가 신청
        </button>
      </section>

      {showApplicationModal && (
        <div className="hanada-modal-backdrop" onClick={() => setShowApplicationModal(false)}>
          <div
            aria-labelledby="hanada-application-title"
            aria-modal="true"
            className="hanada-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="닫기"
              className="hanada-modal-close"
              onClick={() => setShowApplicationModal(false)}
              type="button"
            >
              ×
            </button>
            <p>HANADA CAMP · APPLICATION</p>
            <h3 id="hanada-application-title">하나다캠프 신청</h3>
            <div className="hanada-modal-message">
              <strong>이번 캠프는 종료되었습니다.</strong>
              함께해 주셔서 감사합니다.<br />다음 캠프에서 다시 만나요.
            </div>
            <button
              autoFocus
              className="hanada-modal-confirm"
              onClick={() => setShowApplicationModal(false)}
              type="button"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
