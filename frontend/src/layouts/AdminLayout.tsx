import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AdminSidebar from '../components/AdminSidebar'

export default function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated and is admin
    const checkAuth = async () => {
      try {
        // TODO: Verify admin status
      } catch (error) {
        navigate('/login')
      }
    }
    checkAuth()
  }, [navigate])

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
