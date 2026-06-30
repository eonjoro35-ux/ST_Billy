import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { Trash2, Upload, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Class Activities",
  "Laboratories",
  "Sports",
  "School Trips",
  "Graduation Ceremonies",
  "Events",
];

export default function AdminGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setMessage({
        text: err.message || "Failed to load files",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !caption.trim()) {
      setMessage({
        text: "Please select an image file and type a description",
        type: "warning",
      });
      return;
    }

    try {
      setUploading(true);
      setMessage({ text: "", type: "" });

      // 1. Upload asset binary to Supabase Object Storage bucket
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (storageError) throw storageError;

      // 2. Generate accessible Public URL for image
      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(filePath);

      // 3. Document details inside PostgreSQL row
      const { error: dbError } = await supabase
        .from("gallery_items")
        .insert([{ image_url: publicUrl, category, caption }]);

      if (dbError) throw dbError;

      setMessage({
        text: "Media successfully uploaded to website gallery!",
        type: "success",
      });
      setCaption("");
      setFile(null);
      fetchGallery();
    } catch (err: any) {
      setMessage({
        text: err.message || "Upload process failed",
        type: "danger",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (
      !confirm("Are you sure you want to delete this photo from the gallery?")
    )
      return;

    try {
      // Extract original file path segment from the public URL link
      const urlParts = imageUrl.split("/storage/v1/object/public/gallery/");
      if (urlParts.length === 2) {
        await supabase.storage.from("gallery").remove([urlParts[1]]);
      }

      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);
      if (error) throw error;

      setItems(items.filter((item) => item.id !== id));
      setMessage({ text: "Item deleted successfully", type: "success" });
    } catch (err: any) {
      setMessage({
        text: err.message || "Delete operations failed",
        type: "danger",
      });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">
        Manage Media Gallery
      </h1>

      {message.text && (
        <div
          className={`p-4 rounded-lg mb-6 border font-medium ${
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

      {/* Upload Interface Box */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-xl shadow-md border mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
      >
        <div>
          <label className="block text-text-primary font-bold text-sm mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="w-full border p-2 rounded-lg text-sm bg-surface"
            required
          />
        </div>
        <div>
          <label className="block text-text-primary font-bold text-sm mb-2">
            Category Section
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2.5 rounded-lg text-sm bg-surface text-text-primary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-text-primary font-bold text-sm mb-2">
            Caption Text
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Students inside the computer science room..."
            className="w-full border p-2 rounded-lg text-sm text-text-primary"
            required
          />
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="bg-primary hover:bg-red-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Upload size={18} />
            )}
            {uploading ? "Uploading Content..." : "Publish To Gallery"}
          </button>
        </div>
      </form>

      {/* Existing Dynamic Gallery Grid List */}
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Current Gallery Inventory
      </h2>
      {loading ? (
        <div className="text-text-muted animate-pulse">
          Querying media records...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center border text-text-muted">
          No images found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group"
            >
              <div className="relative h-40 bg-surface">
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                  {item.category}
                </span>
              </div>
              <div className="p-3 bg-white flex-1 flex flex-col justify-between gap-3">
                <p className="text-text-muted text-xs font-medium line-clamp-2">
                  {item.caption}
                </p>
                <button
                  onClick={() => handleDelete(item.id, item.image_url)}
                  className="w-full border border-danger/30 text-danger text-xs py-1.5 rounded font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 size={14} /> Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
