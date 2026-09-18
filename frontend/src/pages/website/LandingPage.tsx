import { lazy, Suspense, useEffect, useRef, useState } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(id === "home");

  useEffect(() => {
    if (shouldRender || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <section ref={sectionRef} id={id} className="content-section scroll-mt-24">
      {shouldRender ? (
        <Suspense fallback={<SectionLoader />}>{children}</Suspense>
      ) : (
        <SectionLoader />
      )}
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