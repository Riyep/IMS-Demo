import { useParams, Link } from 'react-router-dom'
import { Edit, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  getItemById, getBrandName, getCategoryName, getItemPrices,
  getItemStocks, getItemCompatibilities, getWarehouseName,
  getLocationName, getStockStatus
} from '@/data/mock'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ItemDetail() {
  const { id } = useParams()
  const item = getItemById(Number(id))

  if (!item) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Item not found</p>
        <Link to="/items"><Button variant="link">Back to Items</Button></Link>
      </div>
    )
  }

  const prices = getItemPrices(item.id)
  const stockEntries = getItemStocks(item.id)
  const compatibilities = getItemCompatibilities(item.id)

  const priceChartData = [...prices].reverse().map(p => ({
    date: formatDate(p.effective_date),
    cost: p.cost_price,
    retail: p.retail_price,
    wholesale: p.wholesale_price,
  }))

  const infoFields = [
    { label: 'SKU', value: item.sku },
    { label: 'ESBN', value: item.esbn },
    { label: 'Part Number', value: item.part_number },
    { label: 'Brand', value: getBrandName(item.brand_id) },
    { label: 'Category', value: getCategoryName(item.category_id) },
    { label: 'Type', value: item.type },
    { label: 'Size', value: item.size },
    { label: 'Unit', value: item.unit },
    { label: 'Product Type', value: item.product_type },
    { label: 'Weight', value: `${item.weight} kg` },
    { label: 'Barcode', value: item.barcode },
  ]

  return (
    <div>
      <PageHeader
        title={item.name}
        subtitle={`${item.sku} • ${item.part_number}`}
        backTo="/items"
        actions={
          <Link to={`/items/${item.id}/edit`}>
            <Button><Edit className="w-4 h-4 mr-2" /> Edit Item</Button>
          </Link>
        }
      />

      {/* Status + Quick Info */}
      <div className="flex items-center gap-3 mb-6">
        <StatusBadge status={item.status} />
        <Badge variant={item.type === 'OEM' ? 'info' : item.type === 'Racing' ? 'warning' : 'secondary'}>
          {item.type}
        </Badge>
        <Badge variant="outline">{getCategoryName(item.category_id)}</Badge>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="prices">Prices ({prices.length})</TabsTrigger>
          <TabsTrigger value="stock">Stock ({stockEntries.length})</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility ({compatibilities.length})</TabsTrigger>
        </TabsList>

        {/* Info Tab */}
        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Item Details</CardTitle></CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {infoFields.map(f => (
                    <div key={f.label}>
                      <dt className="text-xs text-muted-foreground">{f.label}</dt>
                      <dd className="text-sm font-medium">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground">Created: {formatDate(item.created_at)}</p>
                  <p className="text-xs text-muted-foreground">Updated: {formatDate(item.updated_at)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prices Tab */}
        <TabsContent value="prices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Price History</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Effective Date</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Retail</TableHead>
                      <TableHead>Wholesale</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prices.map(p => (
                      <TableRow key={p.id}>
                        <TableCell>{formatDate(p.effective_date)}</TableCell>
                        <TableCell>{formatCurrency(p.cost_price)}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(p.retail_price)}</TableCell>
                        <TableCell>{formatCurrency(p.wholesale_price)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {priceChartData.length > 1 && (
              <Card>
                <CardHeader><CardTitle className="text-base">Price Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={priceChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={11} />
                      <YAxis fontSize={11} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v) => formatCurrency(v)} />
                      <Line type="monotone" dataKey="retail" stroke="#2563EB" strokeWidth={2} name="Retail" />
                      <Line type="monotone" dataKey="cost" stroke="#10B981" strokeWidth={2} name="Cost" />
                      <Line type="monotone" dataKey="wholesale" stroke="#F59E0B" strokeWidth={2} name="Wholesale" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Stock Tab */}
        <TabsContent value="stock">
          <Card>
            <CardHeader><CardTitle className="text-base">Stock by Warehouse</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Min</TableHead>
                    <TableHead>Max</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockEntries.map(s => {
                    const status = getStockStatus(s.quantity, s.minimum_stock, s.maximum_stock)
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{getWarehouseName(s.warehouse_id)}</TableCell>
                        <TableCell>{getLocationName(s.location_id)}</TableCell>
                        <TableCell className="font-semibold">{s.quantity}</TableCell>
                        <TableCell>{s.minimum_stock}</TableCell>
                        <TableCell>{s.maximum_stock}</TableCell>
                        <TableCell><StatusBadge status={status} /></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compatibility Tab */}
        <TabsContent value="compatibility">
          <Card>
            <CardHeader><CardTitle className="text-base">Compatible Vehicles</CardTitle></CardHeader>
            <CardContent>
              {compatibilities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No compatibility data</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Year Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compatibilities.map(c => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.motor_brand}</TableCell>
                        <TableCell>{c.motor_model}</TableCell>
                        <TableCell><Badge variant="outline">{c.motor_type}</Badge></TableCell>
                        <TableCell>{c.year_from} – {c.year_to}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
