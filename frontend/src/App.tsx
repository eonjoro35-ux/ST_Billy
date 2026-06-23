import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import LeadershipPage from './pages/public/LeadershipPage'
import AcademicProgramsPage from './pages/public/AcademicProgramsPage'
import DepartmentsPage from './pages/public/DepartmentsPage'
import AdmissionsPage from './pages/public/AdmissionsPage'
import NewsPage from './pages/public/NewsPage'
import EventsPage from './pages/public/EventsPage'
import GalleryPage from './pages/public/GalleryPage'
import ContactPage from './pages/public/ContactPage'
import LoginPage from './pages/auth/LoginPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminNews from './pages/admin/AdminNews'
import AdminEvents from './pages/admin/AdminEvents'
import AdminBanners from './pages/admin/AdminBanners'
import AdminUsers from './pages/admin/AdminUsers'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/academic-programs" element={<AcademicProgramsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/banners" element={<AdminBanners />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
