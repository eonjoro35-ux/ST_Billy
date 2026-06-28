import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send form data to backend
    console.log("Form submitted:", formData);
  };

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2">Get in touch with our school</p>
        </div>
      </section>

      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">📞 Phone</h3>
            <p className="text-gray-700">+1 (555) 123-4567</p>
            <p className="text-gray-700">+1 (555) 987-6543</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">📧 Email</h3>
            <p className="text-gray-700">info@school.edu</p>
            <p className="text-gray-700">admissions@school.edu</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">📍 Address</h3>
            <p className="text-gray-700">123 School Street</p>
            <p className="text-gray-700">City, State 12345</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="section-title">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                required
              ></textarea>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div>
            <h2 className="section-title">Our Location</h2>
            <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
              <span>Google Maps Embed</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
