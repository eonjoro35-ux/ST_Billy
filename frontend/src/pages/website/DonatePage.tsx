import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DonatePage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportData, setReportData] = useState({
    name: "",
    country: "",
    amount: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation notice logged:", reportData);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-12 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Header section */}
      <section className="bg-primary text-white py-14 shadow-sm">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
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
            Support Our Mission
          </motion.h1>
          <p className="mt-1 text-white/80 text-sm max-w-xl">
            Your contributions provide education, nutritional security, and
            psychological rehabilitation for vulnerable children in Dandora.
          </p>
        </div>
      </section>

      {/* Main Payment Section Options */}
      <section className="container-main max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* M-PESA CHANNEL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="text-xl font-bold text-primary">
                  Lipa Na M-Pesa
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  For mobile money transfers inside East Africa
                </p>
              </div>
            </div>

            <ol className="space-y-2.5 text-gray-600 text-sm list-decimal list-inside font-medium">
              <li>
                Go to your{" "}
                <strong className="text-gray-900">M-Pesa menu</strong>.
              </li>
              <li>
                Select <strong className="text-gray-900">Lipa na M-Pesa</strong>
                .
              </li>
              <li>
                Choose <strong className="text-gray-900">Pay Bill</strong>.
              </li>
              <li>
                Enter Business Number:{" "}
                <strong className="text-secondary font-mono text-base">
                  400222
                </strong>
              </li>
              <li>
                Enter Account Number:{" "}
                <strong className="text-secondary font-mono text-base">
                  659793#
                </strong>
              </li>
              <li>Enter your desired transfer amount.</li>
              <li>Enter your secret M-Pesa PIN and press confirm.</li>
            </ol>

            <div className="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
              💡 <strong>Note:</strong> Ensure the confirmation prompt lists
              your funds destination towards the verified accounts linked to{" "}
              <strong>ST Bill Community Centre</strong>.
            </div>
          </motion.div>

          {/* BANK REMITTANCE CHANNEL CARD */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="text-3xl">🏦</div>
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    Direct Bank Wire
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    For international or local financial wire transfers
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
                <p>
                  <strong>Account Name:</strong>{" "}
                  <span className="text-gray-900">
                    ST Bill Community Education Centre
                  </span>
                </p>
                <p>
                  <strong>Bank Name:</strong>{" "}
                  <span className="text-gray-900">
                    Cooperative Bank of Kenya
                  </span>
                </p>
                <p>
                  <strong>Account Number:</strong>{" "}
                  <span className="text-secondary font-mono font-bold tracking-wide">{`01134382825700`}</span>
                </p>
                <p>
                  <strong>Swift Code:</strong>{" "}
                  <span className="text-gray-900 font-mono font-bold">{`KCOOKENA`}</span>
                </p>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed italic">
                * Please send a copy/photo of the wire receipt directly to{" "}
                <span className="text-primary font-medium underline">
                  stbilleducationalcentre@gmail.com
                </span>{" "}
                for manual verification.
              </p>

              <button
                onClick={() => {
                  setShowForm(true);
                  setIsSubmitted(false);
                }}
                className="w-full py-3 bg-secondary hover:bg-secondary/95 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow transition-colors flex items-center justify-center gap-2"
              >
                🤝 I Have Sent a Donation
              </button>
            </motion.div>
          </div>
        </div>

        {/* INTERACTIVE FORM POPUP MODAL COMPONENT */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white border border-gray-100 rounded-2xl shadow-md p-6 md:p-8 max-w-2xl mx-auto"
            >
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold text-primary">
                        Log Remittance Notice
                      </h4>
                      <p className="text-xs text-gray-400">
                        Help our tracking desk match transactions effortlessly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-bold px-2 py-1"
                    >
                      Close ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name / Entity"
                      value={reportData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-secondary bg-gray-50/50"
                      required
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country of Residence"
                      value={reportData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-secondary bg-gray-50/50"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount Donated"
                      value={reportData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-secondary bg-gray-50/50"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={reportData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-secondary bg-gray-50/50"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Donation Record
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  className="text-center py-6 space-y-3"
                >
                  <div className="text-3xl text-green-500">✅</div>
                  <h4 className="text-lg font-bold text-primary">
                    Record Logged!
                  </h4>
                  <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-gray-800">
                      {reportData.name}
                    </span>
                    . We will manually audit this reference tracking record
                    against incoming bank ledger drops.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-xs text-secondary hover:underline font-semibold pt-1"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
