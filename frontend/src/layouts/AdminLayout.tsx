import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { supabase } from "../services/supabaseClient";
import { PORTAL_PREFIX } from "../App";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate(`${PORTAL_PREFIX}/login`, { replace: true });
      } else {
        setChecking(false);
      }
    };

    checkAuth();

    // Listen for authentication state adjustments (e.g., tokens expiration)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate(`${PORTAL_PREFIX}/login`, { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="text-lg font-semibold text-text-muted animate-pulse">
          Securing session context...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
