import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { PORTAL_PREFIX } from "../../App";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "", // Changed from username to email for Supabase Auth consistency
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: formData.email,
          password: formData.password,
        },
      );

      if (authError) throw authError;

      // Secure login complete, route into hidden section dashboard
      navigate(PORTAL_PREFIX);
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md border-t-4 border-primary">
        <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">
          St. Bill Portal
        </h1>
        <p className="text-center text-text-muted mb-8 text-sm">
          Authorized Administrative Access Only
        </p>

        {error && (
          <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-text-primary font-bold mb-2 text-sm">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-text-primary"
              placeholder="admin@stbilleducationalcentre.org"
              required
            />
          </div>

          <div>
            <label className="block text-text-primary font-bold mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-text-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying Credentials..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
