import { Package, Users, Warehouse, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StatCard from '@/components/shared/StatCard'
import PageHeader from '@/components/shared/PageHeader'
import { formatCurrency } from '@/lib/utils'
import { getDashboardStats, items, categories, stocks, getLatestPrice, getBrandName, getCategoryName, getStockStatus } from '@/data/mock'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#1D4ED8', '#1E40AF', '#1E3A8A']

export default function Dashboard() {
  const stats = getDashboardStats()

  // Stock value by category
  const categoryStockData = categories.map(cat => {
    const catItems = items.filter(i => i.category_id === cat.id)
    let value = 0
    catItems.forEach(item => {
      const price = getLatestPrice(item.id)
      const itemStocks = stocks.filter(s => s.item_id === item.id)
      const totalQty = itemStocks.reduce((sum, s) => sum + s.quantity, 0)
      if (price) value += totalQty * price.cost_price
    })
    return { name: cat.name, value }
  }).filter(d => d.value > 0).sort((a, b) => b.value - a.value)

  // Top items by stock quantity
  const topItemsData = items.map(item => {
    const itemStocks = stocks.filter(s => s.item_id === item.id)
    const totalQty = itemStocks.reduce((sum, s) => sum + s.quantity, 0)
    return { name: item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name, quantity: totalQty }
  }).sort((a, b) => b.quantity - a.quantity).slice(0, 8)

  // Low stock items
  const lowStockItems = stocks.map(s => {
    const status = getStockStatus(s.quantity, s.minimum_stock, s.maximum_stock)
    if (status === 'critical' || status === 'low' || status === 'out') {
      const item = items.find(i => i.id === s.item_id)
      return { ...s, item, status }
    }
    return null
  }).filter(Boolean)

  // Monthly movement mock data
  const monthlyData = [
    { month: 'Jan', masuk: 120, keluar: 95 },
    { month: 'Feb', masuk: 85, keluar: 110 },
    { month: 'Mar', masuk: 150, keluar: 130 },
    { month: 'Apr', masuk: 95, keluar: 88 },
    { month: 'May', masuk: 180, keluar: 160 },
    { month: 'Jun', masuk: 110, keluar: 105 },
    { month: 'Jul', masuk: 140, keluar: 125 },
    { month: 'Aug', masuk: 160, keluar: 145 },
    { month: 'Sep', masuk: 130, keluar: 120 },
  ]

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your inventory" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          icon={Package}
          trend={5}
          trendLabel="from last month"
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStockCount}
          icon={AlertTriangle}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Active Suppliers"
          value={stats.activeSuppliers}
          icon={Users}
          trend={2}
          trendLabel="new this month"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Total Stock Value"
          value={formatCurrency(stats.totalStockValue)}
          icon={TrendingUp}
          trend={12}
          trendLabel="from last month"
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stock Value by Category */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Stock Value by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryStockData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} fontSize={11} />
                <YAxis type="category" dataKey="name" width={80} fontSize={12} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="value" fill="#2563EB" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Stock Movement */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Monthly Stock Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="masuk" stroke="#2563EB" strokeWidth={2} name="Stock In" />
                <Line type="monotone" dataKey="keluar" stroke="#F59E0B" strokeWidth={2} name="Stock Out" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Items by Quantity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Top Items by Stock Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topItemsData} margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} angle={-20} textAnchor="end" height={60} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Low Stock Alerts</CardTitle>
            <Link to="/stock">
              <Button variant="ghost" size="sm" className="text-xs">
                View All <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.slice(0, 6).map((s) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{s.item?.name}</p>
                    <p className="text-xs text-muted-foreground">{getBrandName(s.item?.brand_id)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      s.status === 'out' ? 'text-red-600' : s.status === 'critical' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {s.quantity} / {s.minimum_stock}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{s.status}</p>
                  </div>
                </div>
              ))}
              {lowStockItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">All stock levels OK</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
