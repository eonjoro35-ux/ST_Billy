import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../services/supabaseClient";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemFadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 17 },
  },
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [rawImages, setRawImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublicGallery() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("gallery_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setRawImages(data || []);
      } catch (err) {
        console.error("Error connecting to gallery DB storage source:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPublicGallery();
  }, []);

  // Defined static categories to render counters consistently
  const categoriesBase = [
    "Class Activities",
    "Laboratories",
    "Sports",
    "School Trips",
    "Graduation Ceremonies",
    "Events",
  ];

  const categoriesList = categoriesBase.map((catName) => ({
    name: catName,
    count: rawImages.filter((img) => img.category === catName).length,
  }));

  // Filter image item collections safely on the runtime client thread
  const displayedImages =
    activeCategory === "All"
      ? rawImages
      : rawImages.filter((img) => img.category === activeCategory);

  return (
    <div className="space-y-12 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white font-medium transition-colors group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform inline-block">
                ←
              </span>{" "}
              Back to Home
            </a>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Media Gallery
          </motion.h1>
          <p className="mt-1 text-white/80 text-sm">
            A window into daily student development, nutrition modules, and
            community events at St. Bill Educational Centre.
          </p>
        </div>
      </section>

      {/* Category Selection Grid Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-primary">Photo Collections</h2>
          <button
            onClick={() => setActiveCategory("All")}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border transition-all ${
              activeCategory === "All"
                ? "bg-secondary text-white border-secondary shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
            }`}
          >
            👁️ Show All Photos ({rawImages.length})
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesList.map((category, i) => {
            const isSelected = activeCategory === category.name;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.name)}
                className={`p-4 rounded-xl flex flex-col justify-between cursor-pointer border transition-all min-h-[110px] shadow-sm select-none ${
                  isSelected
                    ? "bg-gradient-to-br from-secondary to-primary text-white border-transparent ring-2 ring-secondary/30"
                    : "bg-white text-gray-800 border-gray-100 hover:border-secondary/40"
                }`}
              >
                <h3 className="text-sm font-bold leading-snug line-clamp-2">
                  {category.name}
                </h3>
                <p
                  className={`text-xs mt-2 ${isSelected ? "text-white/80 font-medium" : "text-gray-400 font-semibold"}`}
                >
                  {category.count} items
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Dynamic Image Display Workspace Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="border-b border-gray-200/60 pb-3 mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">
            Showing:{" "}
            <span className="text-secondary font-semibold">
              {activeCategory}
            </span>
          </h2>
          <span className="text-xs text-gray-400 font-medium font-mono">
            {displayedImages.length} frames visible
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-muted animate-pulse font-medium">
            Loading gallery grid assets securely from database stream...
          </div>
        ) : displayedImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border text-text-muted font-medium">
            No active photographic media items posted in this category folder
            yet.
          </div>
        ) : (
          <motion.div
            layout
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  variants={itemFadeIn}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.15 },
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 20px -8px rgba(0,0,0,0.12)",
                  }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 p-2.5 flex flex-col group transition-shadow"
                >
                  <div className="bg-gray-100 h-44 rounded-lg flex items-center justify-center relative overflow-hidden border shadow-inner">
                    <img
                      src={img.image_url}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-3 pb-1 px-1">
                    <p className="text-text-primary text-xs font-semibold leading-normal line-clamp-2">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
