import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import ItemList from '@/pages/items/ItemList'
import ItemDetail from '@/pages/items/ItemDetail'
import ItemForm from '@/pages/items/ItemForm'
import SupplierList from '@/pages/suppliers/SupplierList'
import SupplierDetail from '@/pages/suppliers/SupplierDetail'
import StockOverview from '@/pages/stock/StockOverview'
import CompatibilityBrowser from '@/pages/compatibility/CompatibilityBrowser'
import ReturList from '@/pages/returns/ReturList'
import ReportPage from '@/pages/reports/ReportPage'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/create" element={<ItemForm />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/items/:id/edit" element={<ItemForm />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
        <Route path="/stock" element={<StockOverview />} />
        <Route path="/compatibility" element={<CompatibilityBrowser />} />
        <Route path="/returns" element={<ReturList />} />
        <Route path="/reports" element={<ReportPage />} />
      </Routes>
    </AppLayout>
  )
}
