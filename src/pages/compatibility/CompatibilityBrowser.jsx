import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bike } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import { itemCompatibilities, items, getBrandName, getCategoryName, getLatestPrice } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function CompatibilityBrowser() {
  const [motorBrand, setMotorBrand] = useState('')
  const [motorModel, setMotorModel] = useState('')
  const [motorType, setMotorType] = useState('')
  const [yearFilter, setYearFilter] = useState('')

  // Unique motor brands/models/types from data
  const motorBrands = [...new Set(itemCompatibilities.map(c => c.motor_brand))].sort()
  const motorModels = useMemo(() => {
    let filtered = itemCompatibilities
    if (motorBrand) filtered = filtered.filter(c => c.motor_brand === motorBrand)
    return [...new Set(filtered.map(c => c.motor_model))].sort()
  }, [motorBrand])
  const motorTypes = [...new Set(itemCompatibilities.map(c => c.motor_type))].sort()

  // Filter compatibilities
  const filtered = useMemo(() => {
    let result = itemCompatibilities
    if (motorBrand) result = result.filter(c => c.motor_brand === motorBrand)
    if (motorModel) result = result.filter(c => c.motor_model === motorModel)
    if (motorType) result = result.filter(c => c.motor_type === motorType)
    if (yearFilter) {
      const year = Number(yearFilter)
      result = result.filter(c => year >= c.year_from && year <= c.year_to)
    }
    return result
  }, [motorBrand, motorModel, motorType, yearFilter])

  // Get unique items from filtered compatibilities
  const compatibleItemIds = [...new Set(filtered.map(c => c.item_id))]
  const compatibleItems = compatibleItemIds.map(id => items.find(i => i.id === id)).filter(Boolean)

  return (
    <div>
      <PageHeader
        title="Compatibility Browser"
        subtitle="Find parts compatible with your motorcycle"
      />

      {/* Search Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Bike className="w-5 h-5 text-blue-600" />
            Search by Vehicle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Motor Brand</label>
              <Select value={motorBrand} onChange={e => { setMotorBrand(e.target.value); setMotorModel('') }}>
                <option value="">All Brands</option>
                {motorBrands.map(b => <option key={b} value={b}>{b}</option>)}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Model</label>
              <Select value={motorModel} onChange={e => setMotorModel(e.target.value)}>
                <option value="">All Models</option>
                {motorModels.map(m => <option key={m} value={m}>{m}</option>)}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Type</label>
              <Select value={motorType} onChange={e => setMotorType(e.target.value)}>
                <option value="">All Types</option>
                {motorTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Year</label>
              <Input
                type="number"
                placeholder="e.g. 2020"
                value={yearFilter}
                onChange={e => setYearFilter(e.target.value)}
                min="2000"
                max="2025"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">
            Compatible Parts
            <Badge variant="secondary" className="ml-2">{compatibleItems.length} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {compatibleItems.length === 0 ? (
            <div className="text-center py-12">
              <Bike className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground">Select a vehicle to see compatible parts</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Retail Price</TableHead>
                  <TableHead>Compatible With</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compatibleItems.map(item => {
                  const price = getLatestPrice(item.id)
                  const itemCompats = filtered.filter(c => c.item_id === item.id)
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                      <TableCell>
                        <Link to={`/items/${item.id}`} className="font-medium text-blue-600 hover:underline">
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{getBrandName(item.brand_id)}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{getCategoryName(item.category_id)}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={item.type === 'OEM' ? 'info' : item.type === 'Racing' ? 'warning' : 'secondary'} className="text-xs">
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{price ? formatCurrency(price.retail_price) : '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {itemCompats.map(c => (
                            <Badge key={c.id} variant="outline" className="text-[10px]">
                              {c.motor_model} ({c.year_from}-{c.year_to})
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
