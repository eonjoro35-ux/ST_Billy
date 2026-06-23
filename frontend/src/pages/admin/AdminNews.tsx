import { useEffect, useState } from 'react'
import { newsAPI } from '../../services/api'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
  })

  useEffect(() => {
    loadNews()
  }, [])

  const loadNews = async () => {
    try {
      const res = await newsAPI.getAll()
      setNews(res.data.data || [])
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await newsAPI.create(formData)
      setFormData({ title: '', content: '', excerpt: '', category: '' })
      setShowForm(false)
      loadNews()
    } catch (error) {
      console.error('Error creating news:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await newsAPI.delete(id)
        loadNews()
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">News Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Add News
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
            <input
              type="text"
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={5}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button type="submit" className="btn-primary">
              Create News
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-bold">Title</th>
              <th className="px-6 py-3 text-left font-bold">Category</th>
              <th className="px-6 py-3 text-left font-bold">Date</th>
              <th className="px-6 py-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{item.title}</td>
                <td className="px-6 py-3">{item.category}</td>
                <td className="px-6 py-3">{item.date}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {news.length === 0 && (
          <div className="p-8 text-center text-gray-600">
            No news yet. Create your first news article!
          </div>
        )}
      </div>
    </div>
  )
}
