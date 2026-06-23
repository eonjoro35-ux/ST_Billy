import { useEffect, useState } from 'react'
import { contentAPI } from '../../services/api'

export default function LeadershipPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeadership = async () => {
      try {
        await contentAPI.getLeadership()
      } catch (error) {
        console.error('Error loading leadership:', error)
      } finally {
        setLoading(false)
      }
    }
    loadLeadership()
  }, [])

  if (loading) return <div>Loading...</div>

  const members = [
    { role: 'Principal', name: 'Dr. John Doe' },
    { role: 'Deputy Principal', name: 'Mrs. Jane Smith' },
    { role: 'Academic Head', name: 'Prof. Robert Johnson' },
  ]

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">Leadership & Administration</h1>
          <p className="mt-2">Meet our dedicated leadership team</p>
        </div>
      </section>

      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <div key={i} className="card text-center">
              <div className="bg-gray-300 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span>Photo</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-700 text-sm">
                Brief biography and professional achievements
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
