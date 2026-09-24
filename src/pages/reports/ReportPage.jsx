import { useState } from 'react'
import { Download, FileText, Package, Warehouse, RotateCcw, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import PageHeader from '@/components/shared/PageHeader'
import { getDashboardStats, items, suppliers, stocks } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function ReportPage() {
  const [dateFrom, setDateFrom] = useState('2024-01-01')
  const [dateTo, setDateTo] = useState('2024-09-30')
  const stats = getDashboardStats()

  const handleDownload = (reportName) => {
    alert(`Demo only — "${reportName}" fitur ini akan tersedia pada program versi full.`)
  }

  const reports = [
    {
      title: 'Stock Summary Report',
      description: 'Complete overview of current stock levels across all warehouses. Includes quantity, min/max thresholds, and stock status.',
      icon: Warehouse,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      stats: [
        { label: 'Total Entries', value: stocks.length },
        { label: 'Warehouses', value: '5' },
        { label: 'Stock Value', value: formatCurrency(stats.totalStockValue) },
      ],
      formats: ['PDF', 'Excel'],
    },
    {
      title: 'Item Catalog Report',
      description: 'Full catalog of all items including SKU, brand, category, pricing, and product details.',
      icon: Package,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      stats: [
        { label: 'Total Items', value: items.length },
        { label: 'Active', value: items.filter(i => i.status === 'active').length },
        { label: 'Inactive', value: items.filter(i => i.status === 'inactive').length },
      ],
      formats: ['PDF', 'Excel'],
    },
    {
      title: 'Returns Report',
      description: 'Summary of all product returns including reasons, status, and resolution timeline.',
      icon: RotateCcw,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      stats: [
        { label: 'Total Returns', value: '15' },
        { label: 'Pending', value: '6' },
        { label: 'Completed', value: '3' },
      ],
      formats: ['PDF', 'Excel'],
    },
  ]

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate and download inventory reports"
      />

      {/* Date Range Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Period:</span>
            </div>
            <div className="flex items-center gap-2">
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-40" />
              <span className="text-sm text-gray-400">to</span>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 rounded-lg ${report.iconBg}`}>
                  <report.icon className={`w-5 h-5 ${report.iconColor}`} />
                </div>
                <div>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {report.stats.map((stat) => (
                  <div key={stat.label} className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-sm font-semibold mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
              {/* Download Buttons */}
              <div className="flex gap-2">
                {report.formats.map((fmt) => (
                  <Button
                    key={fmt}
                    variant={fmt === 'PDF' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(`${report.title} (${fmt})`)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    {fmt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
