import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageWithFallback from '../components/ImageWithFallback'
import { getAssetPath } from '../utils/path'

export default function DonationPage() {
  const [copyToast, setCopyToast] = useState(false)

  const bankAccounts = [
    {
      bank: "카카오뱅크",
      account: "7979-866-8405",
      holder: "도예슬"
    },
  ]

  const copyToClipboard = (bank: string, account: string) => {
    const textToCopy = `${bank} ${account}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyToast(true)
      setTimeout(() => {
        setCopyToast(false)
      }, 1500)
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={getAssetPath("/images/donation.jpg")}
            alt="후원 - 함께하는 사랑의 손길"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-wider mb-12">
            후원
          </h1>

          <div className="flex items-center justify-center space-x-3 text-white/60 text-sm font-light">
            <p className="text-xl md:text-2xl font-light tracking-wide text-white/80 mb-6">
              작은 사랑이 모여, 다음세대의 예배를 지켜냅니다
            </p>
          </div>
        </div>
      </section>

      {/* Donation Content */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-wide text-white mb-8">
              함께 만드는 희망
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
              AURI의 사역과 캠프는 여러분의 후원으로 이어집니다.<br />
              여러분의 소중한 나눔은 더 많은 청소년들에게 하나님의 사랑을 전하는 데 사용됩니다.
            </p>
          </div>

          {/* Bank Account Info */}
          <div className="max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl font-thin text-white mb-8 text-center">후원 계좌</h3>
            <div className="space-y-6">
              {bankAccounts.map((account, index) => (
                <div key={index} className="bg-zinc-900 p-8 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-white font-medium text-lg">{account.bank}</span>
                        <span className="text-white/60 text-sm">예금주: {account.holder}</span>
                      </div>
                      <div className="text-2xl font-light text-white tracking-wider">
                        {account.account}
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(account.bank, account.account)}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm"
                    >
                      복사
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-800/50 p-6 rounded-lg mt-6">
              <h4 className="text-white font-light mb-3">후원 안내</h4>
              <ul className="text-white/70 text-sm space-y-2">
                <li>• 계좌 이체 후 010-4820-9155(김희성 목사)로 연락주시면 감사합니다</li>
                <li>• 후원자 성함과 연락처를 남겨주세요</li>
                <li>• 기부금 영수증이 필요하신 경우 말씀해주세요</li>
                <li>• 정기 후원을 원하시는 경우 별도 연락 부탁드립니다</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-thin text-white mb-8">후원금 사용처</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "다음세대를 위한 캠프",
                desc: "여름/겨울 캠프를 통해 청소년들에게 복음을 전합니다."
              },
              {
                title: "예배와 사역을 위한 지원",
                desc: "미자립 교회, 청소년 예배 및 모임의 운영을 함께 돕습니다."
              },
              {
                title: "청소년 장학 후원",
                desc: "캠프 참가가 어려운 청소년에게 참가비와 후원금을 지원합니다."
              },
              {
                title: "국내 선교와 나눔 사역",
                desc: "지역 청소년과 이웃을 위한 복음 전파와 봉사 활동에 사용됩니다."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h4 className="text-lg font-light text-white mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-thin text-white mb-8">후원 문의</h3>
          <div className="bg-zinc-900 p-8 rounded-lg">
            <div className="space-y-4 text-white/70">
              <div>
                <span className="text-white font-light">전화</span> 010-4820-9155(김희성 목사)
              </div>
              <div>
                <span className="text-white font-light">이메일</span> auricommunity@gmail.com
              </div>
            </div>
            <p className="text-white/60 text-sm mt-6">
              후원과 관련한 모든 문의사항은 언제든지 연락해주세요.
            </p>
          </div>
        </div>
      </section>

      {/* Copy Toast */}
      {copyToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
          <div className="bg-white text-black px-6 py-3 rounded-lg shadow-xl border border-gray-200 flex items-center space-x-3 animate-pulse">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium">계좌번호가 복사되었습니다!</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
