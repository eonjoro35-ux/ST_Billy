import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
const LandingPage = lazy(() => import("./pages/website/LandingPage"));
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
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/leadership" element={<Navigate to="/#leadership" replace />} />
            <Route path="/academic-programs" element={<Navigate to="/#programs" replace />} />
            <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/donate" element={<Navigate to="/#donate" replace />} />
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
