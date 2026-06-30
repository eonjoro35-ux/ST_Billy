import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/website/HomePage";
import AboutPage from "./pages/website/AboutPage";
import LeadershipPage from "./pages/website/LeadershipPage";
import AcademicProgramsPage from "./pages/website/AcademicProgramsPage";
import ContactPage from "./pages/website/ContactPage";
import GalleryPage from "./pages/website/GalleryPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminGallery from "./pages/admin/AdminGallery"; // Added admin manager
import DonatePage from "./pages/website/DonatePage";
import AdminLeadership from "./pages/admin/AdminLeadership";
import AdminPrograms from "./pages/admin/AdminPrograms";

export const PORTAL_PREFIX = "/st-bill-portal-99";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/academic-programs" element={<AcademicProgramsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
        </Route>

        {/* Hidden Auth Route */}
        <Route path={`${PORTAL_PREFIX}/login`} element={<LoginPage />} />

        {/* Hidden Secure Admin Routes */}
        <Route path={PORTAL_PREFIX} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="leadership" element={<AdminLeadership />} />
        </Route>

        <Route
          path="/admin/*"
          element={<Navigate to={`${PORTAL_PREFIX}/login`} replace />}
        />
        <Route
          path="/login"
          element={<Navigate to={`${PORTAL_PREFIX}/login`} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
