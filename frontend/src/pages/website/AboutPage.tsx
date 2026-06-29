import { motion } from "framer-motion";

// Framer Motion Variants for smooth orchestrations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function AboutPage() {
  return (
    <div className="space-y-16 bg-gray-50/30 min-h-screen pb-20 overflow-hidden">
      {/* Header Banner Section */}
      <section className="bg-primary text-white py-14 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent z-0" />
        <div className="container-main relative z-10">
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
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl"
          >
            About ST Bill Community Education Centre
          </motion.h1>
          <p className="text-white/70 text-sm md:text-base mt-2 font-medium tracking-wide">
            Dandora, Nairobi, Kenya • Registered Alternative Basic Education
            Provider
          </p>
        </div>
      </section>

      {/* Narrative History Section */}
      <section className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="section-title text-primary"
            >
              Our Journey & Foundation
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 leading-relaxed text-base"
            >
              ST Bill Community Education Centre is a non-profit community day
              school that offers alternative basic education to students between
              the ages of 4 and 15 who navigate diverse learning and
              socio-economic challenges. Established within the complex
              socioeconomic environment of the **Dandora slums in Nairobi,
              Kenya**, our center stands as a beacon of stability where children
              can reclaim their right to education.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 leading-relaxed text-base"
            >
              Driven by the mandate of the Kenyan constitutional framework which
              guarantees every child access to a basic education, the school
              levels the playing field. We explicitly shelter, nurture, and
              prepare vulnerable, orphaned, and disadvantaged children to become
              well-behaved, hardworking, and highly productive citizens.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 leading-relaxed text-base"
            >
              Beyond our classrooms, our methodology embraces the entire
              ecosystem of the child. We actively collaborate with
              community-based organizations, global well-wishers, local
              authorities, and the government to offer foundational safety
              nets—including comprehensive **daily feeding programs, poverty
              alleviation initiatives, healthcare awareness, sports
              rehabilitation, and youth counseling networks**.
            </motion.p>
          </motion.div>

          {/* Quick Context Callout Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-xl space-y-4 shadow-sm"
          >
            <h4 className="font-bold text-secondary text-lg">
              Institutional Profile
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Location:</strong> Dandora Sub-County, Nairobi County,
                Kenya
              </p>
              <p>
                <strong>Target Age Group:</strong> 4 to 15 years old
              </p>
              <p>
                <strong>Registration Status:</strong> Fully registered with
                relevant Kenyan Educational Authorities
              </p>
              <p>
                <strong>Core Focus:</strong> Specializing in Inclusive
                Alternative Basic Education and Holistic Community Empowerment
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structural Timeline Section */}
      <section className="bg-gray-100 py-16">
        <div className="container-main">
          <h2 className="section-title text-center mb-12 text-primary">
            Milestones of Hope
          </h2>

          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-32 space-y-12">
            {[
              {
                year: "2008",
                title: "The Humble Spark",
                desc: "Founded deep in the Dandora slums with only 2 vulnerable students and 1 dedicated teacher working in a single makeshift room.",
              },
              {
                year: "2014",
                title: "Feeding Program Launch",
                desc: "Recognized that nutrition dictates concentration. Launched the school feeding program to offer daily balanced meals to every child.",
              },
              {
                year: "2020",
                title: "Government Recognition",
                desc: "Formally registered with the Ministry and local authorities, solidifying our curriculum framework as a verified alternative basic education pipeline.",
              },
              {
                year: "2026",
                title: "16 Years of Transformation",
                desc: "Now a comprehensive community facility that has nurtured over 500+ primary graduates, breaking generational cycles of slum poverty.",
              },
            ].map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 group"
              >
                {/* Absolute Year Floating Indicator */}
                <div className="absolute -left-4 top-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow transition-transform group-hover:scale-110">
                  {milestone.year}
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 max-w-3xl">
                  <h3 className="font-bold text-lg text-secondary mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars: Mission, Vision, Values */}
      <section className="container-main">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Mission Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="card bg-white p-6 rounded-2xl shadow-md border-t-4 border-primary flex flex-col h-full"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To provide transformative, quality alternative basic education
              alongside vital welfare support, restoring hope and unlocking the
              long-term potential of vulnerable, underprivileged, and orphaned
              children in Dandora.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="card bg-white p-6 rounded-2xl shadow-md border-t-4 border-secondary flex flex-col h-full"
          >
            <div className="text-3xl mb-3">👁️‍🗨️</div>
            <h3 className="text-xl font-bold text-secondary mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To see a fully transformed community where every marginalized
              child, regardless of socio-economic background, grows up educated,
              self-reliant, and equipped to serve as a responsible citizen.
            </p>
          </motion.div>

          {/* Core Values Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -6 }}
            className="card bg-white p-6 rounded-2xl shadow-md border-t-4 border-accent flex flex-col h-full"
          >
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-xl font-bold text-accent mb-3">Core Values</h3>
            <ul className="text-gray-600 text-sm space-y-2 font-medium">
              <li>
                • <strong>Inclusivity:</strong> Embracing children from all
                cultural and religious backgrounds.
              </li>
              <li>
                • <strong>Integrity:</strong> Operating with transparency before
                our partners and community.
              </li>
              <li>
                • <strong>Compassion:</strong> Placing the emotional and
                physical safety of the child first.
              </li>
              <li>
                • <strong>Resilience:</strong> Fostering dedication to overcome
                environmental limits.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title text-primary">
            Milestones & Achievements
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Despite local structural challenges, our community-driven ecosystem
            delivers exceptional developmental and institutional achievements.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {[
            {
              metric: "100%",
              title: "Curriculum Integration",
              detail:
                "Successfully verified and synchronized all learning levels with the official national educational parameters.",
            },
            {
              metric: "150k+",
              title: "Meals Provided Annually",
              detail:
                "Sustaining healthy child development via nutritional feeding modules directly protecting class concentration.",
            },
            {
              metric: "500+",
              title: "Youth Rehabilitated",
              detail:
                "Empowering vulnerable children through specialized sports counseling, community arts, and mentorship networks.",
            },
            {
              metric: "20+",
              title: "Local Partnerships",
              detail:
                "Coordinating smoothly with localized community networks, CBOs, and government health departments.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between text-left"
            >
              <div>
                <div className="text-3xl font-extrabold text-secondary mb-2">
                  {item.metric}
                </div>
                <h4 className="font-bold text-sm text-primary mb-1 uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
