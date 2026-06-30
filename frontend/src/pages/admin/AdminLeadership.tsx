import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";

export default function AdminLeadership() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form hooks state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [roleType, setRoleType] = useState("board");
  const [bioMessage, setBioMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leadership_members")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      setMembers(data || []);
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed to load management profiles.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !bioMessage.trim()) {
      setMessage({
        text: "Please complete all mandatory text parameters.",
        type: "warning",
      });
      return;
    }

    try {
      setSaving(true);
      setMessage({ text: "", type: "" });
      let uploadedUrl = "";

      // 1. If an image file was explicitly selected, upload it to our public gallery bucket
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `leader_${Math.random()}.${fileExt}`;
        const filePath = `leaders/${fileName}`;

        const { error: storageError } = await supabase.storage
          .from("gallery")
          .upload(filePath, file);

        if (storageError) throw storageError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery").getPublicUrl(filePath);

        uploadedUrl = publicUrl;
      }

      // 2. Insert rows inside the backend table storage sequence
      const nextSort = members.length + 1;
      const { error: dbError } = await supabase
        .from("leadership_members")
        .insert([
          {
            name,
            title,
            role_type: roleType,
            bio_message: bioMessage,
            image_url: uploadedUrl || null,
            sort_order: nextSort,
          },
        ]);

      if (dbError) throw dbError;

      setMessage({
        text: `Successfully registered profile entry for ${name}!`,
        type: "success",
      });
      setName("");
      setTitle("");
      setBioMessage("");
      setFile(null);
      fetchMembers();
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed to save profile record entry.",
        type: "danger",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (
      !confirm(
        "Are you sure you want to remove this official from the board directory?",
      )
    )
      return;

    try {
      if (imageUrl && imageUrl.includes("/storage/v1/object/public/gallery/")) {
        const pathSegment = imageUrl.split(
          "/storage/v1/object/public/gallery/",
        )[1];
        await supabase.storage.from("gallery").remove([pathSegment]);
      }

      const { error } = await supabase
        .from("leadership_members")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setMembers(members.filter((m) => m.id !== id));
      setMessage({
        text: "Leadership roster item detached successfully.",
        type: "success",
      });
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed execution loop.",
        type: "danger",
      });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        Roster & Leadership Directory
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

      {/* Input Data Container Sheet */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border mb-10 space-y-4"
      >
        <h3 className="text-lg font-bold text-primary flex items-center gap-2">
          <PlusCircle size={20} /> Onboard New Official
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Jane Smith"
              className="w-full border p-2 rounded text-sm text-text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Official Assignment Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Vice Chairman"
              className="w-full border p-2 rounded text-sm text-text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Tier Placement Segment
            </label>
            <select
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
              className="w-full border p-2 rounded text-sm bg-surface text-text-primary"
            >
              <option value="executive">Executive Board (Director)</option>
              <option value="board">Advisory Board Member</option>
              <option value="partner">Global Strategic Partner</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-text-primary text-xs font-bold mb-1">
              Biography / Official Statement Message
            </label>
            <textarea
              rows={4}
              value={bioMessage}
              onChange={(e) => setBioMessage(e.target.value)}
              placeholder="Type background credentials or statements..."
              className="w-full border p-2 rounded text-sm text-text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-text-primary text-xs font-bold mb-1">
              Portrait Avatar Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full border p-2 rounded text-sm bg-surface"
            />
            <p className="text-[11px] text-text-muted mt-1">
              Leave empty to use the standard default placeholder avatar
              framework box.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-6 rounded text-sm flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : null}
            {saving ? "Processing Records..." : "Commit Member Profile"}
          </button>
        </div>
      </form>

      {/* Roster Layout Sheet Rendering List */}
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Active Roster Directory
      </h2>
      {loading ? (
        <div className="text-text-muted animate-pulse">
          Reading live directory data...
        </div>
      ) : members.length === 0 ? (
        <div className="p-8 bg-white border rounded text-center text-text-muted">
          No records matched.
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between gap-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden border">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-mono">
                      N/A
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">
                    {member.name}
                  </h4>
                  <p className="text-xs text-text-muted">
                    {member.title} •{" "}
                    <span className="uppercase tracking-wider font-bold text-[10px] text-secondary">
                      {member.role_type}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(member.id, member.image_url)}
                className="text-danger p-2 hover:bg-red-50 rounded transition-colors"
                title="Delete Profile From Roster"
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
