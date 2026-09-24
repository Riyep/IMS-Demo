import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit, MoreHorizontal, PackagePlus, FilePlus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import DataTable from '@/components/shared/DataTable'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import { items, brands, categories, warehouses, locations, getBrandName, getCategoryName, getLatestPrice } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function ItemList() {
  const navigate = useNavigate()
  const [brandFilter, setBrandFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [addExistingOpen, setAddExistingOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const hasActiveFilters = brandFilter || categoryFilter || statusFilter

  const handleClearAll = () => {
    setBrandFilter('')
    setCategoryFilter('')
    setStatusFilter('')
  }

  let filteredItems = items
  if (brandFilter) filteredItems = filteredItems.filter(i => i.brand_id === Number(brandFilter))
  if (categoryFilter) filteredItems = filteredItems.filter(i => i.category_id === Number(categoryFilter))
  if (statusFilter) filteredItems = filteredItems.filter(i => i.status === statusFilter)

  // Filtered locations based on selected warehouse
  const filteredLocations = selectedWarehouse
    ? locations.filter(l => l.warehouse_id === Number(selectedWarehouse))
    : []

  const columns = [
    { key: 'sku', header: 'SKU', sortable: true },
    {
      key: 'name', header: 'Item Name', sortable: true,
      render: (row) => (
        <div>
          <Link to={`/items/${row.id}`} className="font-medium text-blue-600 hover:underline">{row.name}</Link>
          <p className="text-xs text-muted-foreground">{row.part_number}</p>
        </div>
      )
    },
    {
      key: 'brand_id', header: 'Brand', sortable: true,
      sortKey: (row) => getBrandName(row.brand_id),
      render: (row) => getBrandName(row.brand_id)
    },
    {
      key: 'category_id', header: 'Category',
      render: (row) => <Badge variant="outline">{getCategoryName(row.category_id)}</Badge>
    },
    {
      key: 'type', header: 'Type',
      render: (row) => (
        <Badge variant={row.type === 'OEM' ? 'info' : row.type === 'Racing' ? 'warning' : 'secondary'}>
          {row.type}
        </Badge>
      )
    },
    {
      key: 'price', header: 'Retail Price', sortable: true,
      sortKey: (row) => getLatestPrice(row.id)?.retail_price || 0,
      render: (row) => {
        const price = getLatestPrice(row.id)
        return price ? formatCurrency(price.retail_price) : '-'
      }
    },
    {
      key: 'status', header: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions', header: '',
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/items/${row.id}`)}>
              <Eye className="w-4 h-4 mr-2" /> View Detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/items/${row.id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  ]

  return (
    <div>
      <PageHeader
        title="Items"
        subtitle={`${filteredItems.length} items total`}
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Item
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Choose Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/items/create')}>
                <FilePlus className="w-4 h-4 mr-2" /> Create New Item
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setAddExistingOpen(true)}>
                <PackagePlus className="w-4 h-4 mr-2" /> Add Existing Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <DataTable
        data={filteredItems}
        columns={columns}
        searchPlaceholder="Search by name, SKU, part number..."
        searchKeys={['name', 'sku', 'part_number', 'barcode']}
        onClearAll={hasActiveFilters ? handleClearAll : undefined}
        filters={
          <>
            <Select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-40">
              <option value="">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </Select>
            <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-40">
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-32">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </>
        }
      />

      {/* Add Existing Item Dialog */}
      <Dialog open={addExistingOpen} onOpenChange={setAddExistingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Existing Item to Stock</DialogTitle>
            <DialogDescription>Select an existing item and assign it to a warehouse with initial quantity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Item *</label>
              <Select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>{item.sku} — {item.name}</option>
                ))}
              </Select>
            </div>
            {selectedItem && (
              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                <p className="font-medium text-blue-900">
                  {items.find(i => i.id === Number(selectedItem))?.name}
                </p>
                <p className="text-blue-700 text-xs mt-0.5">
                  Brand: {getBrandName(items.find(i => i.id === Number(selectedItem))?.brand_id)} •
                  Category: {getCategoryName(items.find(i => i.id === Number(selectedItem))?.category_id)} •
                  Type: {items.find(i => i.id === Number(selectedItem))?.type}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Warehouse *</label>
                <Select value={selectedWarehouse} onChange={e => { setSelectedWarehouse(e.target.value); setSelectedLocation('') }}>
                  <option value="">Select Warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} disabled={!selectedWarehouse}>
                  <option value="">Select Location</option>
                  {filteredLocations.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity *</label>
                <Input type="number" min="1" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Min Stock</label>
                <Input type="number" min="0" placeholder="10" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Max Stock</label>
                <Input type="number" min="0" placeholder="100" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddExistingOpen(false); setSelectedItem(''); setSelectedWarehouse(''); setSelectedLocation('') }}>Cancel</Button>
            <Button onClick={() => { alert('Demo only - fitur ini akan tersedia pada program versi full.'); setAddExistingOpen(false); setSelectedItem(''); setSelectedWarehouse(''); setSelectedLocation('') }}>
              <PackagePlus className="w-4 h-4 mr-2" /> Add to Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
