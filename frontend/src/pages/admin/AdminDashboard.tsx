import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { PORTAL_PREFIX } from "../../App";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalGallery: 0,
    pageViews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        const { data, error: dbError } = await supabase
          .from("site_statistics")
          .select("metric_name, metric_value");

        if (dbError) throw dbError;

        if (data) {
          const dynamicStats = data.reduce(
            (acc, curr) => {
              if (curr.metric_name === "total_gallery")
                acc.totalGallery = curr.metric_value;
              if (curr.metric_name === "page_views")
                acc.pageViews = curr.metric_value;
              return acc;
            },
            { totalGallery: 0, pageViews: 0 },
          );
          setStats(dynamicStats);
        }
      } catch (err: any) {
        console.error("Error loading metrics:", err);
        setError(err.message || "Failed to load dynamic statistics.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        Dashboard Overview
      </h1>

      {error && (
        <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-muted animate-pulse font-medium">
          Loading system metrics from Supabase database sync loop...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-b-4 border-accent">
              <p className="text-text-muted text-sm mb-2 font-medium">
                Gallery Files
              </p>
              <p className="text-4xl font-bold text-accent">
                {stats.totalGallery}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 border-b-4 border-info">
              <p className="text-text-muted text-sm mb-2 font-medium">
                Public Page Views
              </p>
              <p className="text-4xl font-bold text-info">{stats.pageViews}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Quick Management Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate(`${PORTAL_PREFIX}/gallery`)}
                className="bg-primary text-white py-2.5 px-4 rounded font-bold hover:bg-red-800 transition-colors text-sm"
              >
                Manage Gallery Media
              </button>
              <button
                onClick={() => navigate(`${PORTAL_PREFIX}/leadership`)}
                className="bg-accent text-white py-2.5 px-4 rounded font-bold hover:opacity-90 transition-colors text-sm"
              >
                Manage Leadership Team
              </button>
              <button
                onClick={() => navigate(`${PORTAL_PREFIX}/programs`)}
                className="bg-secondary text-white py-2.5 px-4 rounded font-bold hover:bg-gray-900 transition-colors text-sm"
              >
                Welfare & Academics
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
