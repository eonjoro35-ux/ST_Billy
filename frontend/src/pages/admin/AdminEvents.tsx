import { useEffect, useState } from 'react'
import { eventsAPI } from '../../services/api'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  })

  useEffect(() => {
    loadEvents()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await eventsAPI.create(formData)
      setFormData({ title: '', description: '', date: '', time: '', location: '' })
      setShowForm(false)
      loadEvents()
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await eventsAPI.delete(id)
        loadEvents()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Events Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Add Event
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={4}
              required
            ></textarea>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <button type="submit" className="btn-primary">
              Create Event
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Title</th>
              <th className="px-6 py-3 text-left font-bold">Date</th>
              <th className="px-6 py-3 text-left font-bold">Location</th>
              <th className="px-6 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{event.title}</td>
                <td className="px-6 py-3">{event.date}</td>
                <td className="px-6 py-3">{event.location}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="p-8 text-center text-gray-600">
            No events yet. Create your first event!
          </div>
        )}
      </div>
    </div>
  )
}
