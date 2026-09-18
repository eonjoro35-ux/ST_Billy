import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
    <header className="bg-background text-white sticky top-0 z-50 shadow-md">
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
          <nav className="hidden font-semibold md:flex items-center gap-5 text-primary text-sm">
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
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary hover:text-accent font-bold"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 text-primary font-bold">
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
