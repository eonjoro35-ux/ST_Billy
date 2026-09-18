import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, Moon, Sun } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("st-billy-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("st-billy-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const navItems = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "Leadership", sectionId: "leadership" },
    { label: "Programs", sectionId: "programs" },
    { label: "Gallery", sectionId: "gallery" },
    { label: "Contact", sectionId: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${sectionId}`);
    setIsOpen(false);
  };

  return (
    <header className="site-header sticky top-0 z-50 border-b border-black/5 bg-background/95 text-primary shadow-sm backdrop-blur-md">
      <div className="container-main py-2">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-semibold"
            onClick={() => scrollToSection("home")}
          >
            <img
              src="logo.webp"
              alt="Logo"
              className="h-12 md:h-14 rounded-full w-auto"
              loading="lazy"
            />
            ST. Billy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 text-sm font-semibold text-primary md:flex">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                className="hover:text-accent transition-colors"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.sectionId);
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Call to Action Donate Link */}
            <a
              href="#donate"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-4 py-2 rounded-full shadow transition-all transform hover:-translate-y-0.5"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("donate");
              }}
            >
              <Heart size={16} fill="currentColor" />
              Donate
            </a>
            <button
              type="button"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDark((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setIsDark((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary hover:text-accent font-bold"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav id="mobile-navigation" className="md:hidden mt-4 flex flex-col gap-4 border-t border-primary/10 pb-4 pt-4 font-bold text-primary">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                className="hover:text-accent transition-colors py-1"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.sectionId);
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#donate"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl shadow mt-2"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("donate");
              }}
            >
              <Heart size={16} fill="currentColor" />
              Donate Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
