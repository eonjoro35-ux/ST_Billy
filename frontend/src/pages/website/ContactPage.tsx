import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Container staggering presets
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const elementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating API backend request latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    console.log("Form submitted successfully:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form fields
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-12 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Page Hero Banner */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
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

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Contact Our Center
          </motion.h1>
          <p className="mt-1 text-white/80 text-sm max-w-xl">
            Have questions about student enrollment, psycho-social programs, or
            drop-off logistics for feeding donations? Reach out directly.
          </p>
        </div>
      </section>

      {/* Main Multi-Column Content Interface */}
      <section className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT AREA: DIRECT CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-primary tracking-tight">
                Get In Touch
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Reach out using our direct contact coordinates or drop your
                physical donations right at our administration block.
              </p>
            </div>

            <div className="space-y-4">
              {/* Location Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  📍
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    Our Location
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed mt-1">
                    St. Bill Community Education Centre,
                    <br />
                    Dandora Slums, Nairobi, Kenya.
                  </p>
                </div>
              </div>

              {/* Operations/Feeding Dropoff Card */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  🍲
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    Support & Food Provisions Drop-offs
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed mt-1">
                    We accept deliveries of bulk dry foods (maize, porridge
                    flour, rice, legumes) directly to our school storage room
                    between 8:00 AM and 5:00 PM.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT AREA: FORM STACK */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="contact-form-key"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold text-primary mb-6">
                    Send us a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={elementVariants}>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-lg focus:outline-none focus:border-secondary focus:bg-white transition-all focus:ring-2 focus:ring-secondary/10 text-gray-800"
                          required
                        />
                      </motion.div>
                      <motion.div variants={elementVariants}>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-lg focus:outline-none focus:border-secondary focus:bg-white transition-all focus:ring-2 focus:ring-secondary/10 text-gray-800"
                          required
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={elementVariants}>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number (Optional)"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-lg focus:outline-none focus:border-secondary focus:bg-white transition-all focus:ring-2 focus:ring-secondary/10 text-gray-800"
                        />
                      </motion.div>
                      <motion.div variants={elementVariants}>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-lg focus:outline-none focus:border-secondary focus:bg-white transition-all focus:ring-2 focus:ring-secondary/10 text-gray-800"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={elementVariants}>
                      <textarea
                        name="message"
                        placeholder="Type your message description here..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50/50 rounded-lg focus:outline-none focus:border-secondary focus:bg-white transition-all focus:ring-2 focus:ring-secondary/10 text-gray-800 resize-none"
                        required
                      ></textarea>
                    </motion.div>

                    <motion.div variants={elementVariants} className="pt-2">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider text-white shadow-sm transition-colors flex justify-center items-center gap-2 ${
                          isSubmitting
                            ? "bg-primary/70 cursor-wait"
                            : "bg-primary hover:bg-primary/95"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Dispatching Message...
                          </>
                        ) : (
                          "Send Secure Message"
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>
              ) : (
                /* POST-SUBMIT SUCCESS BANNER STATE */
                <motion.div
                  key="success-card-key"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="py-12 text-center space-y-4 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-3xl shadow-sm text-green-600 animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary">
                      Message Dispatched!
                    </h3>
                    <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting St. Bill Community Education
                      Centre. Our administrative desk will review and get back
                      to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-semibold text-secondary hover:underline pt-2"
                  >
                    ← Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
