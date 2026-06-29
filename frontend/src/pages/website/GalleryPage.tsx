import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation Presets
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function GalleryPage() {
  // Set default active tab to "All"
  const [activeCategory, setActiveCategory] = useState("All");

  // --- DYNAMIC DATA MAP ---
  // Replace these blank array objects with your actual image file strings!
  const galleryData = {
    "Class Activities": [
      { id: "c1", src: "", alt: "Students engaged in group study" },
      { id: "c2", src: "", alt: "Math session on alternative curriculum" },
      { id: "c3", src: "", alt: "Reading workshop circles" },
    ],
    Laboratories: [
      { id: "l1", src: "", alt: "Computer science desktop units setup" },
      { id: "l2", src: "", alt: "Basic science experimentation desk" },
    ],
    Sports: [
      { id: "s1", src: "", alt: "Football rehabilitation matches" },
      { id: "s2", src: "", alt: "Athletics training field track run" },
      { id: "s3", src: "", alt: "Inter-school friendly basketball games" },
    ],
    "School Trips": [
      { id: "t1", src: "", alt: "Excursion bus departure outside center" },
      { id: "t2", src: "", alt: "Nairobi local wildlife education visit" },
    ],
    "Graduation Ceremonies": [
      {
        id: "g1",
        src: "",
        alt: "Primary scholars receiving exit certificates",
      },
      { id: "g2", src: "", alt: "Parent-teacher celebration assembly lines" },
    ],
    Events: [
      { id: "e1", src: "", alt: "Porridge distribution meal lines at 10 AM" },
      { id: "e2", src: "", alt: "Psychosocial therapy open theater circle" },
      { id: "e3", src: "", alt: "Community sensitization group meeting" },
    ],
  };

  // Process data for counts and general display array
  const categoriesList = Object.keys(galleryData).map((catName) => ({
    name: catName,
    count: galleryData[catName as keyof typeof galleryData].length,
  }));

  // Flatten everything if "All" is picked, else pluck selected category
  const displayedImages =
    activeCategory === "All"
      ? Object.values(galleryData).flat()
      : galleryData[activeCategory as keyof typeof galleryData] || [];

  return (
    <div className="space-y-12 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Header Banner */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="container-main">
          {/* Animated Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white font-medium transition-colors group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform inline-block">
                ←
              </span>
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
            community events in Dandora.
          </p>
        </div>
      </section>

      {/* Category Selection Grid Section */}
      <section className="container-main">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="section-title text-primary">Photo Collections</h2>

          {/* Reset View Filter Filter Badge */}
          <button
            onClick={() => setActiveCategory("All")}
            className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border transition-all ${
              activeCategory === "All"
                ? "bg-secondary text-white border-secondary shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100"
            }`}
          >
            👁️ Show All Photos ({Object.values(galleryData).flat().length})
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
                transition={{ delay: i * 0.05 }}
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
      <section className="container-main">
        <div className="border-b border-gray-200/60 pb-3 mb-6 flex items-center justify-between">
          <h2 className="section-title text-primary">
            Showing:{" "}
            <span className="text-secondary font-semibold">
              {activeCategory}
            </span>
          </h2>
          <span className="text-xs text-gray-400 font-medium font-mono">
            {displayedImages.length} frames visible
          </span>
        </div>

        {/* AnimatePresence handles grid reshuffling items cleanly layout items vanish or enter */}
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
                id={img.id}
                key={img.id}
                variants={itemFadeIn}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 12px 20px -8px rgba(0,0,0,0.15)",
                }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 p-2.5 flex flex-col group transition-shadow"
              >
                {/* Visual Frame Container */}
                <div className="bg-gray-100 h-44 rounded-lg flex items-center justify-center relative overflow-hidden text-gray-400 border shadow-inner">
                  {img.src ? (
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
                      <svg
                        className="w-8 h-8 stroke-[1.5]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                      <span className="text-[10px] font-mono tracking-wider uppercase bg-gray-200/60 px-1.5 py-0.5 rounded text-gray-500">
                        Image Asset Box
                      </span>
                    </div>
                  )}
                </div>

                {/* Sub-label Caption context */}
                <div className="pt-3 pb-1 px-1">
                  <p className="text-gray-700 text-xs font-medium leading-normal line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
