import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./HomePage"));
const AboutPage = lazy(() => import("./AboutPage"));
const LeadershipPage = lazy(() => import("./LeadershipPage"));
const AcademicProgramsPage = lazy(() => import("./AcademicProgramsPage"));
const GalleryPage = lazy(() => import("./GalleryPage"));
const ContactPage = lazy(() => import("./ContactPage"));
const DonatePage = lazy(() => import("./DonatePage"));

function SectionLoader() {
  return (
    <div className="flex min-h-[35vh] items-center justify-center bg-[#fbf8f5] text-sm font-medium text-primary">
      <span className="animate-pulse">Loading section...</span>
    </div>
  );
}

function LazySection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <Suspense fallback={<SectionLoader />}>{children}</Suspense>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <LazySection id="home"><HomePage /></LazySection>
      <LazySection id="about"><AboutPage /></LazySection>
      <LazySection id="leadership"><LeadershipPage /></LazySection>
      <LazySection id="programs"><AcademicProgramsPage /></LazySection>
      <LazySection id="gallery"><GalleryPage /></LazySection>
      <LazySection id="contact"><ContactPage /></LazySection>
      <LazySection id="donate"><DonatePage /></LazySection>
    </>
  );
}