import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { eventsAPI } from "../../services/api";

const gridContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 16 },
  },
};

const dummyEventsPageItems = [
  {
    id: "e1",
    title: "Annual Parents & Teachers Assembly",
    date: "July 12, 2026",
    time: "09:00 AM",
    description:
      "Join us in the main auditorium to review academic structures and milestone targets for the semester.",
    location: "Main Assembly Hall",
  },
  {
    id: "e2",
    title: "ICT & Digital Literacy Workshop",
    date: "July 20, 2026",
    time: "02:00 PM",
    description:
      "An open community training session introducing foundational coding and web layouts to young learners.",
    location: "Computer Innovation Hub",
  },
  {
    id: "e3",
    title: "Q3 Community Open Day & Exhibition",
    date: "August 05, 2026",
    time: "10:00 AM",
    description:
      "Explore vocational works, craft projects, and technical designs built entirely by our creative students.",
    location: "Center Courtyard",
  },
  {
    id: "e4",
    title: "Inter-Class Debate Finals",
    date: "August 14, 2026",
    time: "11:30 AM",
    description:
      "Watch our secondary tier scholars face off on contemporary global development and digital ethics.",
    location: "Seminar Theater Room B",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await eventsAPI.getAll();
        const fetched = res.data.data || [];
        setEvents([...fetched, ...dummyEventsPageItems].slice(0, 4));
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents(dummyEventsPageItems);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
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
            className="container-main"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">Events Calendar</h1>
            <p className="mt-2 text-white/80">
              Stay updated with upcoming events
            </p>
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
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={gridItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="card border-l-4 border-accent bg-white p-6 shadow-sm rounded-r-xl flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold text-accent mb-2 tracking-wide uppercase">
                  📅 {event.date} • 🕒 {event.time || "TBD"}
                </p>
                <h3 className="text-xl font-bold text-primary mb-3 leading-snug">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>
              </div>
              <div className="border-t border-gray-100 pt-3 text-xs font-semibold text-gray-500 flex items-center gap-1">
                📍 {event.location}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
