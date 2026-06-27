import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Programs', href: '/academic-programs' },
    { label: 'Departments', href: '/departments' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'News', href: '/news' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container-main py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            School Logo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Admin and Login */}
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/login" className="btn-outline text-sm py-2 px-4">
              Login
            </Link>
            <Link to="/admin" className="btn-secondary text-sm py-2 px-4">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" className="btn-outline text-sm py-2 px-4 inline-block">
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
