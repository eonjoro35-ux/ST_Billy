import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { contentAPI, newsAPI, eventsAPI } from "../../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  const [content, setContent] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/hero/classroom.jpg",
    "/hero/computer_student.jpg",
    "/hero/sewing_class.jpg",
    "/hero/student_farming.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [homepageRes, newsRes, eventsRes] = await Promise.all([
          contentAPI.getHomepage(),
          newsAPI.getAll(1, 2),
          eventsAPI.getAll(1, 2),
        ]);
        setContent(homepageRes.data);

        const fetchedNews = newsRes.data.data || [];
        setNews([...fetchedNews].slice(0, 2));

        const fetchedEvents = eventsRes.data.data || [];
        setEvents([...fetchedEvents].slice(0, 2));
      } catch (error) {
        console.error("Error loading homepage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );

  return (
    <div className="space-y-16 overflow-hidden bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative min-h-[550px] md:h-[600px] w-full overflow-hidden bg-secondary flex items-center py-20">
        {images.map((imgUrl, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.img
              key={imgUrl}
              src={imgUrl}
              alt={`School Campus View ${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
              style={{ zIndex: isActive ? 10 : 0 }}
            />
          );
        })}
        <div className="absolute inset-0 z-10 backdrop-blur-sm bg-secondary/40 md:bg-gradient-to-r md:from-secondary md:via-secondary/85 md:to-transparent"></div>{" "}
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
