import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CampPage = lazy(() => import('./pages/CampPage'))
const AuriCampDetailPage = lazy(() => import('./pages/AuriCampDetailPage'))
const AndCampDetailPage = lazy(() => import('./pages/AndCampDetailPage'))
const Camp31DetailPage = lazy(() => import('./pages/Camp31DetailPage'))
const HanadaCampDetailPage = lazy(() => import('./pages/HanadaCampDetailPage'))
const ConnectWorshipPage = lazy(() => import('./pages/ConnectWorshipPage'))
const DonationPage = lazy(() => import('./pages/DonationPage'))

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white/60 text-sm tracking-wider">Loading...</div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/camp" element={<CampPage />} />
        <Route path="/camp/auri" element={<AuriCampDetailPage />} />
        <Route path="/camp/and" element={<AndCampDetailPage />} />
        <Route path="/camp/31" element={<Camp31DetailPage />} />
        <Route path="/camp/hanada" element={<HanadaCampDetailPage />} />
        <Route path="/connect-worship" element={<ConnectWorshipPage />} />
        <Route path="/donation" element={<DonationPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
