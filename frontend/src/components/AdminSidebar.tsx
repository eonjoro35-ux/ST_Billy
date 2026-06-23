import { Link, useLocation } from 'react-router-dom'
import { LogOut, BarChart3, FileText, Calendar, Users, Settings } from 'lucide-react'

export default function AdminSidebar() {
  const location = useLocation()

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: BarChart3 },
    { label: 'News', href: '/admin/news', icon: FileText },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'bg-secondary border-l-4 border-accent'
                  : 'hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700 w-64">
        <button className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors w-full">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}
