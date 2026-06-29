import { motion } from "framer-motion";

export default function AdmissionsPage() {
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

          <h1 className="text-4xl font-bold">Admissions</h1>
          <p className="mt-2">Join our school community</p>
        </div>
      </section>

      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="section-title">Admission Requirements</h2>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Completed application form</li>
              <li>✓ Birth certificate</li>
              <li>✓ Previous academic records</li>
              <li>✓ Medical examination</li>
              <li>✓ Entrance test (if applicable)</li>
            </ul>
          </div>
          <div>
            <h2 className="section-title">Application Process</h2>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Submit application form</li>
              <li>Appear for entrance test</li>
              <li>Personal interview</li>
              <li>Admission decision</li>
              <li>Pay admission fees</li>
            </ol>
          </div>
        </div>

        <div className="bg-accent text-white p-8 rounded-lg text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
          <button className="bg-white text-accent px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
            Download Application Form
          </button>
        </div>

        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "When are admissions open?",
              a: "Admissions are open from January to March every year.",
            },
            {
              q: "What is the admission fee?",
              a: "Fees vary by grade level. Please contact the office for details.",
            },
            {
              q: "Do you offer scholarships?",
              a: "Yes, merit-based and need-based scholarships are available.",
            },
          ].map((faq, i) => (
            <div key={i} className="card">
              <h4 className="font-bold text-primary mb-2">{faq.q}</h4>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
