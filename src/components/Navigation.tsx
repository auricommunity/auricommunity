import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../lib/site-data'
import { getAssetPath } from '../utils/path'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string, match: 'exact' | 'prefix' = 'exact') =>
    match === 'prefix'
      ? location.pathname === path || location.pathname.startsWith(`${path}/`)
      : location.pathname === path

  return (
    <nav className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={getAssetPath("/images/logo.png")}
                alt="AURI COMMUNITY 로고"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-light tracking-wider">
              AURI COMMUNITY
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path, item.match) ? 'text-white' : 'text-white/70'
                } hover:text-white transition-all duration-300 text-sm font-light tracking-wide`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path, item.match) ? 'text-white' : 'text-white/70'
                  } hover:text-white transition-all duration-300 text-sm font-light tracking-wide`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
