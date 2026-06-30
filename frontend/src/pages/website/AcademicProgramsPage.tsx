// src/pages/website/AcademicProgramsPage.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { motion as motionElement } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  UtensilsCrossed,
  BookOpen,
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
};

// Map database text string keys cleanly to Lucide elements
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  education: GraduationCap,
  "well-being": HeartPulse,
  nutrition: UtensilsCrossed,
  general: BookOpen,
};

export default function AcademicProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("academic_programs")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setPrograms(data || []);
      } catch (err) {
        console.error(
          "Error connecting to programs database context loop:",
          err,
        );
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 font-medium text-gray-500">
        Syncing School Services...
      </div>
    );
  }

  return (
    <div className="space-y-16 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Header Section */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="container-main mx-auto px-4">
          <motionElement.div
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
          </motionElement.div>

          <motionElement.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Holistic Education & Welfare Programs
          </motionElement.h1>
          <p className="mt-1 text-white/80 text-sm max-w-2xl">
            Nurturing young minds in Dandora through inclusive academics,
            targeted psychological support, and daily nutritional care.
          </p>
        </div>
      </section>

      {/* Programs Content Stream */}
      <section className="container-main mx-auto px-4 max-w-4xl">
        <motionElement.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {programs.map((program) => {
            // Pick corresponding component icon dynamic reference layout or fallback
            const IconComponent =
              ICON_MAP[program.icon_key] || ICON_MAP.general;

            return (
              <motionElement.div
                key={program.id}
                variants={cardVariant}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.06)",
                }}
                className={`bg-white border-l-4 ${program.border_color_class} p-6 md:p-8 rounded-r-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start transition-all`}
              >
                {/* Big Circular Icon Frame using Lucide-React Component */}
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center border flex-shrink-0 shadow-inner text-primary">
                  <IconComponent size={26} strokeWidth={1.8} />
                </div>

                {/* Text Area */}
                <div className="space-y-3 flex-grow w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] tracking-widest font-extrabold uppercase px-2.5 py-0.5 rounded-full ${program.badge_color_class}`}
                    >
                      {program.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      • {program.scope}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-primary tracking-tight">
                    {program.title}
                  </h3>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line pt-1">
                    {program.description}
                  </p>
                </div>
              </motionElement.div>
            );
          })}
        </motionElement.div>
      </section>

      {/* Call to Action Callout Box */}
      <section className="container-main mx-auto px-4 max-w-4xl">
        <motionElement.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-accent/5 border border-dashed border-accent/40 rounded-2xl p-6 md:p-8 text-center space-y-4"
        >
          <h4 className="text-lg font-bold text-primary">
            💖 Want to support our welfare initiatives?
          </h4>
          <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
            From funding our psycho-social groups to donating bulk provisions
            (dry beans, rice, maize flour) for our 10:00 AM porridge and
            afternoon meals, your support keeps our classrooms thriving.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow hover:bg-primary/90 transition-colors"
            >
              Get Involved Today
            </a>
          </div>
        </motionElement.div>
      </section>
    </div>
  );
}
