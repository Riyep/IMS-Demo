import { useParams, Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Edit, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import { getSupplierById, items, getBrandName, getCategoryName, getLatestPrice } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function SupplierDetail() {
  const { id } = useParams()
  const supplier = getSupplierById(Number(id))

  if (!supplier) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">Supplier not found</p>
        <Link to="/suppliers"><Button variant="link">Back to Suppliers</Button></Link>
      </div>
    )
  }

  // Mock: assign some items to this supplier based on ID
  const supplierItems = items.filter((_, idx) => idx % 8 === (supplier.id - 1) % 8 || idx % 5 === supplier.id % 5).slice(0, 8)

  return (
    <div>
      <PageHeader
        title={supplier.supplier_name}
        subtitle={supplier.supplier_code}
        backTo="/suppliers"
        actions={
          <Button><Edit className="w-4 h-4 mr-2" /> Edit Supplier</Button>
        }
      />

      <div className="flex items-center gap-3 mb-6">
        <StatusBadge status={supplier.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Contact Info */}
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-base">Contact Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{supplier.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{supplier.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium leading-relaxed">{supplier.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplied Items */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Supplied Items</CardTitle>
            <Badge variant="secondary"><Package className="w-3 h-3 mr-1" /> {supplierItems.length} items</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Cost Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierItems.map(item => {
                  const price = getLatestPrice(item.id)
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                      <TableCell>
                        <Link to={`/items/${item.id}`} className="text-blue-600 hover:underline text-sm">
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{getBrandName(item.brand_id)}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{getCategoryName(item.category_id)}</Badge></TableCell>
                      <TableCell className="text-sm">{price ? formatCurrency(price.cost_price) : '-'}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
