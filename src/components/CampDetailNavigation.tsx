import { Link } from 'react-router-dom'
import { navItems } from '../lib/site-data'
import { getAssetPath } from '../utils/path'
import './CampDetailNavigation.css'

type CampDetailNavigationProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CampDetailNavigation({ open, onOpenChange }: CampDetailNavigationProps) {
  return (
    <>
      <header className="camp-detail-nav">
        <Link to="/" className="camp-detail-nav__brand" aria-label="AURI COMMUNITY 홈">
          <img src={getAssetPath('/images/logo.png')} alt="" />
        </Link>

        <nav className="camp-detail-nav__links" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>{item.label}</Link>
          ))}
        </nav>

        <button
          className="camp-detail-nav__burger"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          aria-controls="camp-detail-mobile-menu"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        >
          <i />
          <i />
        </button>
      </header>

      <nav
        id="camp-detail-mobile-menu"
        className={`camp-detail-mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="camp-detail-mobile-menu__inner">
          <p>MENU</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => onOpenChange(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
