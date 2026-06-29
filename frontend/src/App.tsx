import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/website/HomePage";
import AboutPage from "./pages/website/AboutPage";
import LeadershipPage from "./pages/website/LeadershipPage";
import AcademicProgramsPage from "./pages/website/AcademicProgramsPage";
import ContactPage from "./pages/website/ContactPage";
import GalleryPage from "./pages/website/GalleryPage";
// import EventsPage from "./pages/website/EventsPage";
// import NewsPage from "./pages/website/NewsPage";
// import AdmissionsPage from "./pages/website/AdmissionsPage";
// import DepartmentsPage from "./pages/website/DepartmentsPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminNews from "./pages/admin/AdminNews";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DonatePage from "./pages/website/DonatePage";

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
          {/* <Route path="/departments" element={<DepartmentsPage />} /> */}
          {/* <Route path="/admissions" element={<AdmissionsPage />} /> */}
          {/* <Route path="/news" element={<NewsPage />} /> */}
          {/* <Route path="/events" element={<EventsPage />} /> */}
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
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
  );
}

export default App;
