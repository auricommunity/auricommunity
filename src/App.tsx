import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CampPage from './pages/CampPage'
import AuriCampDetailPage from './pages/AuriCampDetailPage'
import AndCampDetailPage from './pages/AndCampDetailPage'
import ConnectWorshipPage from './pages/ConnectWorshipPage'
import DonationPage from './pages/DonationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/camp" element={<CampPage />} />
      <Route path="/camp/auri" element={<AuriCampDetailPage />} />
      <Route path="/camp/and" element={<AndCampDetailPage />} />
      <Route path="/connect-worship" element={<ConnectWorshipPage />} />
      <Route path="/donation" element={<DonationPage />} />
    </Routes>
  )
}

export default App
