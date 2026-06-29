import { motion as motionElement } from "framer-motion";

// Animation configurations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
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

export default function AcademicProgramsPage() {
  // Organized structural representation of your holistic programs
  const schoolServices = [
    {
      icon: "🎓",
      category: "EDUCATION",
      title: "Alternative Basic Education",
      scope: "Ages 4 to 15 Years",
      borderColor: "border-l-primary",
      badgeColor: "bg-primary/10 text-primary",
      description: `We offer alternative basic education to students between the age of 4 and 15 years from poor backgrounds or vulnerable families. Our holistic education aims to help these students break out of the cycle of poverty and reach their full potential.

Education is a powerful weapon of personal development that levels the playing field for children, regardless of their background.`,
    },
    {
      icon: "🧠",
      category: "WELL-BEING",
      title: "Psycho-Counseling Services",
      scope: "Mental Health & Psychosocial Support",
      borderColor: "border-l-secondary",
      badgeColor: "bg-secondary/10 text-secondary",
      description: `We provide psycho-counseling services to help students cope with psychological challenges. This enables them to focus on their studies and excel academically. Data suggests that maintaining good mental health is crucial for better performance outcomes.

St. Bill Community Centre runs sensitization programs and provides comprehensive mental health services, including psychosocial support groups. We highly encourage students to participate in these support groups for emotional well-being.`,
    },
    {
      icon: "🍲",
      category: "NUTRITION",
      title: "School Feeding Program",
      scope: "Daily Nutritional Safety Net",
      borderColor: "border-l-accent",
      badgeColor: "bg-accent/10 text-accent",
      description: `St. Bill serves as a vital feeding center, providing structured meals to students in need. Our daily nutritional schedule includes restorative porridge at 10:00 AM, a hearty lunch, and a final stabilizing meal at 4:30 PM.

Proper nutrition is essential for brain development, and we believe firmly that a healthy diet contributes directly to improved academic performance. Due to deep financial difficulties faced by their families, many learners rely heavily on these meals. We warmly welcome food donations from partners to support our feeding program continuity.`,
    },
  ];

  return (
    <div className="space-y-16 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Header Section */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="container-main">
          {/* Animated Back Button */}
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
              </span>
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
      <section className="container-main max-w-4xl">
        <motionElement.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          {schoolServices.map((program, i) => (
            <motionElement.div
              key={i}
              variants={cardVariant}
              whileHover={{
                y: -4,
                boxShadow: "0 12px 30px -10px rgba(0,0,0,0.06)",
              }}
              className={`card bg-white border-l-4 ${program.borderColor} p-6 md:p-8 rounded-r-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-start transition-all`}
            >
              {/* Big Circular Icon Frame */}
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-2xl border flex-shrink-0 shadow-inner">
                {program.icon}
              </div>

              {/* Text Area */}
              <div className="space-y-3 flex-grow w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] tracking-widest font-extrabold uppercase px-2.5 py-0.5 rounded-full ${program.badgeColor}`}
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
          ))}
        </motionElement.div>
      </section>

      {/* Call to Action Callout Box */}
      <section className="container-main max-w-4xl">
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
