import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  return (
    <div className="space-y-16 overflow-hidden bg-gray-50/50">
      {/* Hero Section */}
      <section
        className="relative min-h-[550px] md:h-[600px] w-full overflow-hidden bg-secondary bg-cover bg-center flex items-center py-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=85')" }}
      >
        <div className="absolute inset-0 z-0 bg-[#4a0f0f]/55"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#4a0f0f]/80 via-[#4a0f0f]/55 to-[#4a0f0f]/25"></div>
        <motion.div
          className="container-main relative z-10 text-white w-full"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block text-xs md:text-sm font-semibold tracking-wider text-accent uppercase mb-3"
          >
            Admissions Open for 2026 / 2027
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-5xl font-bold mb-4">
            ST BILL COMMUNITY EDUCATION CENTER
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl mb-8 max-w-2xl">
            "Transforming communities by creating hope and a future for the
            vulnerable, underprivileged and orphaned children through offering
            quality education."
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4">
            <a href="/academic-programs" className="btn-primary">
              Programs
            </a>
            <a className="btn-outline" href="/contact">
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="container-main py-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <span className="text-xs md:text-sm font-bold tracking-wider text-accent uppercase block mb-2">
            What We Do
          </span>
          <h2 className="section-title mb-4">
            Join Your Hands with Us for a Better Life and Future
          </h2>
          <p className="text-gray-600 font-medium">
            Join the community to provide education for children and together
            make them ready for a brighter future.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Card 1 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-4 text-center md:text-left flex flex-col justify-start"
          >
            <div className="text-3xl w-12 h-12 bg-secondary/10 text-secondary flex items-center justify-center rounded-xl mx-auto md:mx-0">
              🎓
            </div>
            <h3 className="font-bold text-lg text-primary">
              Access to Education
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Improve the quality of life for vulnerable, orphans, and
              underprivileged children by giving them access to quality
              education.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-4 text-center md:text-left flex flex-col justify-start"
          >
            <div className="text-3xl w-12 h-12 bg-accent/10 text-accent flex items-center justify-center rounded-xl mx-auto md:mx-0">
              🤝
            </div>
            <h3 className="font-bold text-lg text-primary">Community Growth</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create an environment that fosters community engagement and
              promotes lifelong learning in a supportive manner.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-4 text-center md:text-left flex flex-col justify-start"
          >
            <div className="text-3xl w-12 h-12 bg-secondary/10 text-secondary flex items-center justify-center rounded-xl mx-auto md:mx-0">
              🌱
            </div>
            <h3 className="font-bold text-lg text-primary">Inclusive Spaces</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Provide an inclusive environment where students can explore and
              develop their academic and personal potential.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Statistics */}
      <section className="bg-gray-100 py-16">
        <motion.div
          className="container-main"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h2 className="section-title text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "1000+", label: "Students" },
              { number: "50+", label: "Teachers" },
              { number: "18+", label: "Years" },
              { number: "95%", label: "Pass Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="card text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
