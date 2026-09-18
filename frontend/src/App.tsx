import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
const HomePage = lazy(() => import("./pages/website/HomePage"));
const AboutPage = lazy(() => import("./pages/website/AboutPage"));
const LeadershipPage = lazy(() => import("./pages/website/LeadershipPage"));
const AcademicProgramsPage = lazy(() => import("./pages/website/AcademicProgramsPage"));
const ContactPage = lazy(() => import("./pages/website/ContactPage"));
const GalleryPage = lazy(() => import("./pages/website/GalleryPage"));
const DonatePage = lazy(() => import("./pages/website/DonatePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
import AdminLayout from "./layouts/AdminLayout";
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBanners = lazy(() => import("./pages/admin/AdminBanners"));
const AdminGallery = lazy(() => import("./pages/admin/AdminGallery"));
const AdminLeadership = lazy(() => import("./pages/admin/AdminLeadership"));
const AdminPrograms = lazy(() => import("./pages/admin/AdminPrograms"));

export const PORTAL_PREFIX = "/st-bill-portal-99";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#fbf8f5] text-sm font-medium text-primary">
      <span className="animate-pulse">Loading page...</span>
    </div>
  );
}

function App() {
  return (
    <Router basename="/ST_Billy">
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/academic-programs" element={<AcademicProgramsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
          </Route>

          <Route path={`${PORTAL_PREFIX}/login`} element={<LoginPage />} />

          <Route path={PORTAL_PREFIX} element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="leadership" element={<AdminLeadership />} />
          </Route>

          <Route path="/admin/*" element={<Navigate to={`${PORTAL_PREFIX}/login`} replace />} />
          <Route path="/login" element={<Navigate to={`${PORTAL_PREFIX}/login`} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
