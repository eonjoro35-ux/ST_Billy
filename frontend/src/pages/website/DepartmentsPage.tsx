import { motion } from "framer-motion";

export default function DepartmentsPage() {
  const departments = [
    { name: "Mathematics Department", head: "Dr. Smith" },
    { name: "ICT Department", head: "Mr. Johnson" },
    { name: "Sciences Department", head: "Prof. Williams" },
    { name: "Languages Department", head: "Mrs. Brown" },
    { name: "Business Studies Department", head: "Mr. Davis" },
    { name: "Physical Education", head: "Mr. Wilson" },
  ];

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
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

          <h1 className="text-4xl font-bold">Departments</h1>
          <p className="mt-2">Explore our academic departments</p>
        </div>
      </section>

      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((dept, i) => (
            <div key={i} className="card">
              <h3 className="text-xl font-bold text-primary mb-2">
                {dept.name}
              </h3>
              <p className="text-gray-600 mb-4">Head: {dept.head}</p>
              <button className="btn-secondary text-sm">View Details</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
