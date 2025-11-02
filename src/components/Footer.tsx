import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook } from 'lucide-react'
import { getAssetPath } from '../utils/path'

export default function Footer() {
  return (
    <footer className="py-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
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
            </div>
            <p className="text-white/60 leading-relaxed font-light text-sm">
              하나님의 사랑으로 하나 되는 공동체
            </p>
          </div>
          <div>
            <h4 className="font-light text-white mb-6 text-sm tracking-wide">MENU</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                ABOUT
              </Link>
              <Link to="/connect-worship" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                CONNECT WORSHIP
              </Link>
              <Link to="/camp" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                CAMP
              </Link>
              <Link to="/donation" className="block text-white/60 hover:text-white transition-colors duration-300 text-sm font-light">
                후원
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-light text-white mb-6 text-sm tracking-wide">CONTACT</h4>
            <div className="space-y-2 text-white/60 text-sm font-light">
              <p></p>
              <p></p>
              <p>auricommunity@gmail.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-light text-white mb-6 text-sm tracking-wide">SOCIAL</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/auri_community/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@AURICOMMUNITY"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/p/%EC%95%84%EC%9A%B0%EB%A6%AC%EA%B3%B5%EB%8F%99%EC%B2%B4-100077341464707/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm font-light">&copy; 2025 AURI & AURI COMMUNITY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
