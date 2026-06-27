import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import { Outlet } from 'react-router-dom'


export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
