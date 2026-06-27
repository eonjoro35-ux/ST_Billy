export default function AcademicProgramsPage() {
  const programs = [
    {
      name: 'Early Childhood Education',
      level: 'Pre-K to Grade 1',
      description: 'Foundational learning through play and exploration'
    },
    {
      name: 'Primary School',
      level: 'Grades 2-6',
      description: 'Core subjects with focus on fundamentals'
    },
    {
      name: 'Junior Secondary',
      level: 'Grades 7-9',
      description: 'Subject specialization begins'
    },
    {
      name: 'Senior Secondary',
      level: 'Grades 10-12',
      description: 'Advanced academics and career preparation'
    },
    {
      name: 'Technical Programs',
      level: 'Vocational Track',
      description: 'Hands-on technical skills training'
    },
  ]

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">Academic Programs</h1>
          <p className="mt-2">Discover our comprehensive educational offerings</p>
        </div>
      </section>

      <section className="container-main">
        {programs.map((program, i) => (
          <div key={i} className="card mb-6 border-l-4 border-accent">
            <h3 className="text-2xl font-bold text-primary mb-2">{program.name}</h3>
            <p className="text-gray-600 mb-3">{program.level}</p>
            <p className="text-gray-700">{program.description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
