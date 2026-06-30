import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { Trash2, PlusCircle, Loader2, GraduationCap } from "lucide-react";

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form entries hook states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [scope, setScope] = useState("");
  const [iconKey, setIconKey] = useState("education");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("academic_programs")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setPrograms(data || []);
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed to load services.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title.trim() ||
      !category.trim() ||
      !scope.trim() ||
      !description.trim()
    ) {
      setMessage({
        text: "Please complete all mandatory input fields.",
        type: "warning",
      });
      return;
    }

    try {
      setSaving(true);
      setMessage({ text: "", type: "" });

      // Automatically compute visual color style configurations based on selected framework role
      let borderColor = "border-l-primary";
      let badgeColor = "bg-primary/10 text-primary";

      if (iconKey === "well-being") {
        borderColor = "border-l-secondary";
        badgeColor = "bg-secondary/10 text-secondary";
      } else if (iconKey === "nutrition") {
        borderColor = "border-l-accent";
        badgeColor = "bg-accent/10 text-accent";
      }

      const orderPosition = programs.length + 1;

      const { error } = await supabase.from("academic_programs").insert([
        {
          title,
          category: category.toUpperCase(),
          scope,
          icon_key: iconKey,
          description,
          border_color_class: borderColor,
          badge_color_class: badgeColor,
          sort_order: orderPosition,
        },
      ]);

      if (error) throw error;

      setMessage({
        text: `Program module "${title}" published live successfully!`,
        type: "success",
      });
      setTitle("");
      setCategory("");
      setScope("");
      setDescription("");
      fetchPrograms();
    } catch (err: any) {
      setMessage({
        text: err.message || "Operation exception error.",
        type: "danger",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to remove this academic/welfare program from the directory?",
      )
    )
      return;

    try {
      const { error } = await supabase
        .from("academic_programs")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setPrograms(programs.filter((p) => p.id !== id));
      setMessage({
        text: "Program node purged successfully.",
        type: "success",
      });
    } catch (err: any) {
      setMessage({
        text: err.message || "Delete execution failure.",
        type: "danger",
      });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        Manage School Programs
      </h1>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 border text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 border-success text-success"
              : message.type === "warning"
                ? "bg-amber-50 border-warning text-warning"
                : "bg-red-50 border-danger text-danger"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Entry Panel Control Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border mb-10 space-y-4"
      >
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <PlusCircle size={20} /> Launch New Service Program
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-text-primary text-xs font-bold mb-1">
              Program Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Early Childhood Education"
              className="w-full border p-2 rounded text-sm text-text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Category Code
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Nutrition, Education, Healthcare"
              className="w-full border p-2 rounded text-sm text-text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Visual Icon Graphic System
            </label>
            <select
              value={iconKey}
              onChange={(e) => setIconKey(e.target.value)}
              className="w-full border p-2 rounded text-sm bg-surface text-text-primary"
            >
              <option value="education">GraduationCap (Education)</option>
              <option value="well-being">HeartPulse (Well-being)</option>
              <option value="nutrition">UtensilsCrossed (Nutrition)</option>
              <option value="general">BookOpen (General Alternative)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-text-primary text-xs font-bold mb-1">
            Scope / Target Group Reach
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="e.g. Ages 4 to 15 Years, Primary Classrooms"
            className="w-full border p-2 rounded text-sm text-text-primary"
            required
          />
        </div>

        <div>
          <label className="block text-text-primary text-xs font-bold mb-1">
            Detailed Program Description Text
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Compose structured text body breakdown for web viewers..."
            className="w-full border p-2 rounded text-sm text-text-primary"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-6 rounded text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : null}
            {saving ? "Deploying..." : "Launch Program Module"}
          </button>
        </div>
      </form>

      {/* Inventory Map List */}
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Active System Programs Inventory
      </h2>
      {loading ? (
        <div className="text-text-muted animate-pulse">
          Querying relational tables database...
        </div>
      ) : programs.length === 0 ? (
        <div className="p-8 bg-white border rounded text-center text-text-muted">
          No programs currently configured.
        </div>
      ) : (
        <div className="space-y-3">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between gap-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 border flex items-center justify-center text-primary">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">
                    {program.title}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {program.category} •{" "}
                    <span className="font-medium text-secondary">
                      {program.scope}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(program.id)}
                className="text-danger p-2 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
