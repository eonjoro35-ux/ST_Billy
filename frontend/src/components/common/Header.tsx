import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/leadership" },
    { label: "Programs", href: "/academic-programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-background text-white sticky top-0 z-50 shadow-lg">
      <div className="container-main py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="logo.webp"
              alt="Logo"
              className="sm:h-16 md:h-18 lg:h-20 rounded-full w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden font-bold md:flex items-center gap-8 text-primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Call to Action Donate Link */}
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-bold px-5 py-2.5 rounded-full shadow transition-all transform hover:-translate-y-0.5"
            >
              <Heart size={16} fill="currentColor" />
              Donate
            </Link>
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
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-accent transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl shadow mt-2"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={16} fill="currentColor" />
              Donate Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
