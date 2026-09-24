import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { cn } from '@/lib/utils'

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cn('transition-all duration-300', collapsed ? 'ml-16' : 'ml-64')}>
        <Topbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
