import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  BarChart3,
  Image,
  Flag,
  Users,
  GraduationCap,
} from "lucide-react";
import { supabase } from "../../services/supabaseClient";
import { PORTAL_PREFIX } from "../../App";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", href: PORTAL_PREFIX, icon: BarChart3 },
    { label: "Gallery Media", href: `${PORTAL_PREFIX}/gallery`, icon: Image },
    {
      label: "School Leadership",
      href: `${PORTAL_PREFIX}/leadership`,
      icon: Users,
    },
    {
      label: "Welfare & Programs",
      href: `${PORTAL_PREFIX}/programs`,
      icon: GraduationCap,
    },
    { label: "Hero Banners", href: `${PORTAL_PREFIX}/banners`, icon: Flag },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate(`${PORTAL_PREFIX}/login`);
  };

  return (
    <aside className="w-64 bg-secondary text-white relative min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-accent">St. Bill Admin</h1>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-primary text-white border-l-4 border-accent"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-700 w-full bg-secondary">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
