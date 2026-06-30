import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function LeadershipPage() {
  const [loading, setLoading] = useState(true);
  const [executives, setExecutives] = useState<any[]>([]);
  const [boardMembers, setBoardMembers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const loadLeadershipFromDB = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("leadership_members")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;

        if (data) {
          setExecutives(data.filter((m) => m.role_type === "executive"));
          setBoardMembers(data.filter((m) => m.role_type === "board"));
          setPartners(data.filter((m) => m.role_type === "partner"));
        }
      } catch (error) {
        console.error(
          "Error loading leadership database array records:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };
    loadLeadershipFromDB();
  }, []);

  const AvatarPlaceholder = () => (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
      <svg
        className="w-12 h-12 mb-2 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="text-xs bg-gray-200/60 px-2 py-0.5 rounded font-mono">
        No Image
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 font-medium text-gray-500">
        Syncing Team Records...
      </div>
    );
  }

  return (
    <div className="space-y-16 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="container-main mx-auto px-4">
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
              </span>{" "}
              Back to Home
            </a>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Leadership & Governance
          </motion.h1>
          <p className="mt-1 text-white/80 text-sm">
            The visionary team driving inclusive education and structural
            transformation in Dandora.
          </p>
        </div>
      </section>

      <div className="container-main mx-auto px-4 space-y-20">
        {/* EXECUTIVE DIRECTORS */}
        {executives.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-primary border-b pb-2">
              Executive Leadership
            </h2>
            {executives.map((director) => (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-3 items-stretch"
              >
                <div className="relative bg-gray-100 h-72 lg:h-auto min-h-[340px] lg:col-span-1 overflow-hidden">
                  {director.image_url ? (
                    <img
                      src={director.image_url}
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarPlaceholder />
                  )}
                </div>
                <div className="p-8 lg:col-span-2 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {director.name}
                    </h3>
                    <p className="text-secondary font-semibold text-sm uppercase tracking-wider mt-0.5">
                      {director.title}
                    </p>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-5 -left-2 text-5xl text-secondary/10 font-serif">
                      “
                    </span>
                    <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-4 space-y-3 whitespace-pre-line">
                      {director.bio_message}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        )}

        {/* ADVISORY BOARD MEMBERS */}
        {boardMembers.length > 0 && (
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-primary border-b pb-2">
              The Advisory Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {boardMembers.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeInUp}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
                  }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all"
                >
                  <div className="h-56 bg-gray-100 relative">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AvatarPlaceholder />
                    )}
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs text-accent font-semibold uppercase tracking-wide mt-1">
                        {member.title}
                      </p>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed flex-grow whitespace-pre-line">
                      {member.bio_message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* STRATEGIC GLOBAL PARTNERS */}
        {partners.length > 0 && (
          <section className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-primary border-b pb-2 text-center">
              Global Partnership
            </h2>
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-8 flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-xl flex-shrink-0 relative overflow-hidden border shadow-inner">
                  {partner.image_url ? (
                    <img
                      src={partner.image_url}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarPlaceholder />
                  )}
                </div>
                <div className="text-center md:text-left space-y-2 flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                      {partner.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-2 italic border-t border-gray-100">
                    "{partner.bio_message}"
                  </p>
                </div>
              </motion.div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
