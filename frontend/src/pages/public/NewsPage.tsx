import { useEffect, useState } from 'react'
import { newsAPI } from '../../services/api'

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    loadNews()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-12">
      <section className="bg-primary text-white py-16">
        <div className="container-main">
          <h1 className="text-4xl font-bold">News & Updates</h1>
          <p className="mt-2">Latest news and announcements</p>
        </div>
      </section>

      <section className="container-main">
        <div className="space-y-6">
          {news.map((article) => (
            <div key={article.id} className="card border-l-4 border-secondary">
              <p className="text-sm text-gray-500 mb-2">{article.date} • {article.category}</p>
              <h3 className="text-2xl font-bold text-primary mb-3">{article.title}</h3>
              <p className="text-gray-700 mb-4">{article.excerpt}</p>
              <button className="text-secondary font-bold hover:text-primary">Read More →</button>
            </div>
          ))}
          {news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No news available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
