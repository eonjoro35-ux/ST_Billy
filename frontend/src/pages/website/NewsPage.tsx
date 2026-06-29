import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { newsAPI } from "../../services/api";

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
};

const dummyNewsPageItems = [
  {
    id: "n1",
    title: "New Modern Science Lab Commissioned",
    date: "June 24, 2026",
    category: "Academics",
    excerpt:
      "Our campus breaks ground on a state-of-the-art laboratory facility to advance interactive STEM projects.",
  },
  {
    id: "n2",
    title: "Inter-School Sports Championships Kick Off",
    date: "June 18, 2026",
    category: "Athletics",
    excerpt:
      "Cheer on our athletics squad this weekend as we host regional football and track tournaments.",
  },
  {
    id: "n3",
    title: "Community Farming Project Yields Record Harvest",
    date: "June 10, 2026",
    category: "Community",
    excerpt:
      "Students and local volunteers gather to celebrate our biggest agricultural distribution drive this year.",
  },
  {
    id: "n4",
    title: "Alumni Association Announces New Scholarship Fund",
    date: "May 28, 2026",
    category: "Admissions",
    excerpt:
      "Graduates of St Bill open a multi-tier tuition endowment system aimed at helping highly gifted students.",
  },
];

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await newsAPI.getAll();
        const fetched = res.data.data || [];
        setNews([...fetched, ...dummyNewsPageItems].slice(0, 4));
      } catch (error) {
        console.error("Error loading news:", error);
        setNews(dummyNewsPageItems);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );

  return (
    <div className="space-y-12 bg-gray-50/40 min-h-screen pb-16">
      {/* Dynamic Header Banner */}
      <section className="bg-primary text-white py-12 overflow-hidden shadow-sm">
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

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">News & Updates</h1>
            <p className="mt-2 text-white/80">Latest news and announcements</p>
          </motion.div>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="container-main">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={gridContainer}
        >
          {news.map((article) => (
            <motion.div
              key={article.id}
              variants={gridItem}
              whileHover={{
                y: -8,
                boxShadow: "0 12px 24px -10px rgba(0,0,0,0.12)",
              }}
              className="card border-t-4 border-secondary bg-white p-6 shadow-sm rounded-xl flex flex-col justify-between transition-shadow"
            >
              <div>
                <span className="inline-block text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full mb-3">
                  {article.category}
                </span>
                <p className="text-xs text-gray-400 mb-2 font-medium">
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>
              <button className="text-secondary text-sm font-bold hover:text-primary transition-colors self-start flex items-center gap-1">
                Read Full Story <span>→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
