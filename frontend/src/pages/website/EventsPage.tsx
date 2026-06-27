import { useEffect, useState } from 'react'
import { eventsAPI } from '../../services/api'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await eventsAPI.getAll()
        setEvents(res.data.data || [])
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">Events Calendar</h1>
          <p className="mt-2">Stay updated with upcoming events</p>
        </div>
      </section>

      <section className="container-main">
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="card border-l-4 border-accent">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-accent font-bold mb-2">{event.date} at {event.time}</p>
                  <h3 className="text-2xl font-bold text-primary mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-3">{event.description}</p>
                  <p className="text-gray-600">📍 {event.location}</p>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No upcoming events.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
