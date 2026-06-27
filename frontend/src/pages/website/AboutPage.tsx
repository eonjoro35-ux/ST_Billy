export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2">Learn about our school's history, mission, and values</p>
        </div>
      </section>

      <section className="container-main">
        <h2 className="section-title">School History</h2>
        <p className="text-gray-700 leading-relaxed mb-8">
          Our school was founded with a vision to provide quality education to all students.
          Over the years, we have established ourselves as one of the leading educational institutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">Mission</h3>
            <p className="text-gray-600">To provide holistic education that develops academic excellence and character.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">Vision</h3>
            <p className="text-gray-600">To nurture responsible citizens who contribute positively to society.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-primary mb-3">Core Values</h3>
            <p className="text-gray-600">Integrity, Excellence, Respect, Responsibility, and Innovation.</p>
          </div>
        </div>

        <h2 className="section-title">Achievements</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>National Recognition for Academic Excellence</li>
          <li>STEM Education Leaders</li>
          <li>Sports Champions</li>
          <li>International Exchange Programs</li>
        </ul>
      </section>
    </div>
  )
}
