import { useState, useEffect } from 'react'
import { contentAPI, newsAPI, eventsAPI } from '../../services/api'

export default function HomePage() {
  const [content, setContent] = useState<any>(null)
  const [news, setNews] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [homepageRes, newsRes, eventsRes] = await Promise.all([
          contentAPI.getHomepage(),
          newsAPI.getAll(1, 3),
          eventsAPI.getAll(1, 3),
        ])
        setContent(homepageRes.data)
        setNews(newsRes.data.data || [])
        setEvents(eventsRes.data.data || [])
      } catch (error) {
        console.error('Error loading homepage:', error)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-32">
        <div className="container-main">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our School</h1>
          <p className="text-xl mb-8">"Educating Leaders of Tomorrow"</p>
          <div className="flex gap-4">
            <button className="btn-primary">Apply Now</button>
            <button className="btn-outline">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="section-title">Message from Principal</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {content?.principalMessage || 'Welcome to our institution...'}
            </p>
          </div>
          <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
            <span>Principal Photo</span>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="bg-gray-100 py-16">
        <div className="container-main">
          <h2 className="section-title text-center mb-12">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Students' },
              { number: '50+', label: 'Teachers' },
              { number: '20+', label: 'Years' },
              { number: '95%', label: 'Pass Rate' },
            ].map((stat, i) => (
              <div key={i} className="card text-center">
                <div className="text-4xl font-bold text-secondary mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="container-main">
        <h2 className="section-title">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article) => (
            <div key={article.id} className="card">
              <div className="bg-gray-300 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span>News Image</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <h3 className="font-bold text-lg mb-2">{article.title}</h3>
              <p className="text-gray-600">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container-main">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="card border-l-4 border-accent">
              <p className="text-sm text-accent font-bold mb-2">{event.date}</p>
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-sm text-gray-500">📍 {event.location}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
