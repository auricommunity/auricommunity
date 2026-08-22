import { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { getAssetPath } from '../utils/path'
import './ConnectWorshipMovementPage.css'

export default function ConnectWorshipMovementPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'CONNECT WORSHIP — MOVEMENT | AURI COMMUNITY'

    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.connect-motion-reveal'))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="connect-movement-page">
      <Navigation />

      <main>
        <section className="connect-movement-hero" aria-labelledby="connect-movement-title">
          <video
            className="connect-movement-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={getAssetPath('/videos/connectworshipmain.mp4')} type="video/mp4" />
          </video>
          <div className="connect-movement-hero-shade" aria-hidden="true" />

          <div className="connect-movement-hero-frame">
            <h1 id="connect-movement-title">
              <span className="connect-movement-hero-line">CONNECT</span>
              <span className="connect-movement-hero-line">WORSHIP</span>
            </h1>

            <div className="connect-movement-hero-bottom connect-movement-hero-meta">
              <p>MOVE AS ONE. WORSHIP AS ONE.</p>
              <a href="#connect-movement-word">SCROLL TO THE WORD <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <p className="connect-movement-side-note" aria-hidden="true">
            ONE BODY · ONE PRAISE · ONE HEART
          </p>
        </section>

        <section id="connect-movement-word" className="connect-movement-word" aria-labelledby="connect-word-title">
          <div className="connect-movement-section-index">
            <span>01</span>
            <span>THE WORD</span>
          </div>
          <div className="connect-movement-word-copy connect-motion-reveal">
            <p className="connect-movement-word-lead">춤 추며</p>
            <h2 id="connect-word-title">그의 이름을<br />찬양하며</h2>
            <p className="connect-movement-word-end">소고와 수금으로 그를 찬양할지어다</p>
            <cite>시편 149편 3절</cite>
          </div>
          <div className="connect-movement-orbit" aria-hidden="true" />
        </section>

        <section className="connect-movement-story" aria-labelledby="connect-story-title">
          <div className="connect-movement-section-index">
            <span>02</span>
            <span>WHY WE MOVE</span>
          </div>

          <div className="connect-movement-story-title connect-motion-reveal">
            <p>CONNECT WORSHIP IS FOR EVERYONE</p>
            <h2 id="connect-story-title">
              <span>움직임이 찬양이 되고</span>
              <span>우리가 하나 되는 예배</span>
            </h2>
          </div>

          <div className="connect-movement-story-copy connect-motion-reveal connect-motion-delay-1">
            <div className="connect-movement-story-paragraph">
              <span aria-hidden="true">01</span>
              <p>
                Connect Worship은 춤을 잘 추는 사람만을 위한 무대가 아닙니다.
                경험과 실력에 관계없이 누구나 움직임을 배우고, 한마음으로 하나님을 찬양하는 예배입니다.
              </p>
            </div>
            <div className="connect-movement-story-paragraph">
              <span aria-hidden="true">02</span>
              <p>
                서툰 동작도 함께하면 고백이 됩니다. 서로의 움직임을 따라가며 마음을 열고,
                우리의 몸과 삶으로 기쁨의 찬양을 드립니다.
              </p>
            </div>
          </div>

          <span className="connect-movement-story-watermark" aria-hidden="true">MOVE</span>
        </section>

        <section className="connect-movement-archive" aria-labelledby="connect-archive-title">
          <div className="connect-movement-archive-heading connect-motion-reveal">
            <div className="connect-movement-section-index">
              <span>03</span>
              <span>VISUAL ARCHIVE</span>
            </div>
            <div>
              <p>SCENES OF PRAISE</p>
              <h2 id="connect-archive-title">함께 만들어 갈<br />우리의 다음 장면</h2>
            </div>
          </div>

          <div className="connect-movement-archive-grid">
            <figure className="connect-movement-photo-slot connect-movement-photo-slot-main connect-motion-reveal">
              <div role="img" aria-label="커넥트 워십 예배 이미지 준비 중">
                <span>01 / WORSHIP</span>
                <strong>PREPARING</strong>
                <small>IMAGE COMING SOON</small>
              </div>
              <figcaption>움직임이 찬양이 되는 순간</figcaption>
            </figure>

            <figure className="connect-movement-photo-slot connect-movement-photo-slot-portrait connect-motion-reveal connect-motion-delay-1">
              <div role="img" aria-label="커넥트 워십 연습 이미지 준비 중">
                <span>02 / PRACTICE</span>
                <strong>PREPARING</strong>
                <small>IMAGE COMING SOON</small>
              </div>
              <figcaption>서로의 움직임을 배워가는 시간</figcaption>
            </figure>

            <figure className="connect-movement-photo-slot connect-movement-photo-slot-wide connect-motion-reveal">
              <div role="img" aria-label="커넥트 워십 공동체 이미지 준비 중">
                <span>03 / TOGETHER</span>
                <strong>PREPARING</strong>
                <small>IMAGE COMING SOON</small>
              </div>
              <figcaption>하나의 마음으로 함께 드리는 예배</figcaption>
            </figure>
          </div>
        </section>

        <section className="connect-movement-values" aria-labelledby="connect-values-title">
          <div className="connect-movement-values-heading connect-motion-reveal">
            <div className="connect-movement-section-index connect-movement-section-index-light">
              <span>04</span>
              <span>HOW WE WORSHIP</span>
            </div>
            <h2 id="connect-values-title">잘 추는 것보다<br />함께 드리는 마음</h2>
          </div>

          <div className="connect-movement-value-list">
            <article className="connect-motion-reveal">
              <span>01 / EVERYONE</span>
              <h3>누구나</h3>
              <p>경험과 실력에 관계없이 편안하게 참여합니다.</p>
            </article>
            <article className="connect-motion-reveal connect-motion-delay-1">
              <span>02 / TOGETHER</span>
              <h3>함께</h3>
              <p>서로의 움직임을 따라가며 하나의 공동체가 됩니다.</p>
            </article>
            <article className="connect-motion-reveal connect-motion-delay-2">
              <span>03 / WORSHIP</span>
              <h3>예배</h3>
              <p>보여주기 위한 춤이 아니라 하나님께 드리는 찬양입니다.</p>
            </article>
          </div>
        </section>

        <section className="connect-movement-flow" aria-label="커넥트 워십의 흐름">
          <div className="connect-movement-flow-row connect-motion-reveal">
            <span>01</span>
            <strong>LEARN</strong>
            <p>움직임을 배우고</p>
          </div>
          <div className="connect-movement-flow-row connect-motion-reveal connect-motion-delay-1">
            <span>02</span>
            <strong>CONNECT</strong>
            <p>서로 연결되며</p>
          </div>
          <div className="connect-movement-flow-row connect-motion-reveal connect-motion-delay-2">
            <span>03</span>
            <strong>WORSHIP</strong>
            <p>함께 찬양합니다</p>
          </div>
        </section>

        <section className="connect-movement-invitation" aria-labelledby="connect-invitation-title">
          <p className="connect-motion-reveal">THE NEXT MOVEMENT STARTS WITH US</p>
          <h2 id="connect-invitation-title" className="connect-motion-reveal connect-motion-delay-1">
            우리의 다음 움직임은<br />
            <em>함께 예배하는 것</em>입니다.
          </h2>
          <a className="connect-motion-reveal connect-motion-delay-2" href="https://www.instagram.com/auri_community/" target="_blank" rel="noreferrer">
            다음 예배 소식 보기 <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}
