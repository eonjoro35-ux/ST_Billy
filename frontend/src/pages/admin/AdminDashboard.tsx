import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalUsers: 0,
    pageViews: 0,
  })

  useEffect(() => {
    // TODO: Load stats from API
    setStats({
      totalNews: 45,
      totalEvents: 12,
      totalUsers: 156,
      pageViews: 8234,
    })
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total News</p>
          <p className="text-4xl font-bold text-primary">{stats.totalNews}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total Events</p>
          <p className="text-4xl font-bold text-secondary">{stats.totalEvents}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Total Users</p>
          <p className="text-4xl font-bold text-accent">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Page Views</p>
          <p className="text-4xl font-bold text-primary">{stats.pageViews}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary">Add News</button>
          <button className="btn-secondary">Add Event</button>
          <button className="btn-outline">Manage Users</button>
        </div>
      </div>
    </div>
  )
}
