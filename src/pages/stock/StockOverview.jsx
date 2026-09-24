import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Warehouse, AlertTriangle, ArrowDownUp, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DataTable from '@/components/shared/DataTable'
import PageHeader from '@/components/shared/PageHeader'
import StatCard from '@/components/shared/StatCard'
import StatusBadge from '@/components/shared/StatusBadge'
import {
  stocks, items, warehouses, locations, getItemById, getWarehouseName,
  getLocationName, getStockStatus
} from '@/data/mock'

export default function StockOverview() {
  const [warehouseFilter, setWarehouseFilter] = useState('')
  const [statusFilterVal, setStatusFilterVal] = useState('')
  const [adjustDialog, setAdjustDialog] = useState(null)
  const [transferOpen, setTransferOpen] = useState(false)
  const [transferFrom, setTransferFrom] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [transferItem, setTransferItem] = useState('')
  const [transferLocationTo, setTransferLocationTo] = useState('')

  // Enrich stock data
  const enriched = stocks.map(s => {
    const item = getItemById(s.item_id)
    const status = getStockStatus(s.quantity, s.minimum_stock, s.maximum_stock)
    return { ...s, item, status, itemName: item?.name || '', warehouseName: getWarehouseName(s.warehouse_id) }
  })

  let filtered = enriched
  if (warehouseFilter) filtered = filtered.filter(s => s.warehouse_id === Number(warehouseFilter))
  if (statusFilterVal) filtered = filtered.filter(s => s.status === statusFilterVal)

  // Summary stats
  const totalEntries = stocks.length
  const criticalCount = enriched.filter(s => s.status === 'critical' || s.status === 'out').length
  const lowCount = enriched.filter(s => s.status === 'low').length
  const overCount = enriched.filter(s => s.status === 'over').length

  // Items available in the selected source warehouse
  const itemsInSource = transferFrom
    ? [...new Set(stocks.filter(s => s.warehouse_id === Number(transferFrom)).map(s => s.item_id))]
        .map(id => {
          const item = getItemById(id)
          const stock = stocks.find(s => s.item_id === id && s.warehouse_id === Number(transferFrom))
          return item ? { ...item, availableQty: stock?.quantity || 0 } : null
        })
        .filter(Boolean)
    : []

  // Destination locations filtered
  const destLocations = transferTo
    ? locations.filter(l => l.warehouse_id === Number(transferTo))
    : []

  // Selected item info for transfer
  const transferItemInfo = transferItem
    ? itemsInSource.find(i => i.id === Number(transferItem))
    : null

  const resetTransfer = () => {
    setTransferOpen(false)
    setTransferFrom('')
    setTransferTo('')
    setTransferItem('')
    setTransferLocationTo('')
  }

  const columns = [
    {
      key: 'itemName', header: 'Item', sortable: true,
      render: (row) => (
        <div>
          <Link to={`/items/${row.item_id}`} className="font-medium text-blue-600 hover:underline">
            {row.item?.name}
          </Link>
          <p className="text-xs text-muted-foreground">{row.item?.sku}</p>
        </div>
      )
    },
    { key: 'warehouseName', header: 'Warehouse', sortable: true },
    {
      key: 'location', header: 'Location',
      render: (row) => <span className="font-mono text-xs">{getLocationName(row.location_id)}</span>
    },
    {
      key: 'quantity', header: 'Qty', sortable: true,
      render: (row) => (
        <span className={`font-semibold ${
          row.status === 'out' ? 'text-red-600' :
          row.status === 'critical' ? 'text-red-500' :
          row.status === 'low' ? 'text-amber-500' :
          row.status === 'over' ? 'text-blue-500' : ''
        }`}>
          {row.quantity}
        </span>
      )
    },
    {
      key: 'range', header: 'Min / Max',
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.minimum_stock} / {row.maximum_stock}</span>
      )
    },
    {
      key: 'status', header: 'Status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      key: 'actions', header: '',
      render: (row) => (
        <Button variant="outline" size="sm" onClick={() => setAdjustDialog(row)}>
          <ArrowDownUp className="w-3.5 h-3.5 mr-1" /> Adjust
        </Button>
      )
    },
  ]

  return (
    <div>
      <PageHeader
        title="Stock Management"
        subtitle="Monitor and manage inventory levels"
        actions={
          <Button onClick={() => setTransferOpen(true)}>
            <ArrowRightLeft className="w-4 h-4 mr-2" /> Transfer Stock
          </Button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Entries" value={totalEntries} icon={Warehouse} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard title="Critical / Out" value={criticalCount} icon={AlertTriangle} iconColor="text-red-600" iconBg="bg-red-50" />
        <StatCard title="Low Stock" value={lowCount} icon={AlertTriangle} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Overstock" value={overCount} icon={Warehouse} iconColor="text-blue-500" iconBg="bg-blue-50" />
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by item name, SKU..."
        searchKeys={['itemName', (row) => row.item?.sku]}
        filters={
          <>
            <Select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="w-48">
              <option value="">All Warehouses</option>
              {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </Select>
            <Select value={statusFilterVal} onChange={e => setStatusFilterVal(e.target.value)} className="w-36">
              <option value="">All Status</option>
              <option value="ok">OK</option>
              <option value="low">Low</option>
              <option value="critical">Critical</option>
              <option value="out">Out of Stock</option>
              <option value="over">Overstock</option>
            </Select>
          </>
        }
      />

      {/* Adjust Stock Dialog */}
      <Dialog open={!!adjustDialog} onOpenChange={() => setAdjustDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
            <DialogDescription>{adjustDialog?.item?.name} — {adjustDialog?.warehouseName}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-2xl font-bold">{adjustDialog?.quantity}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Min</p>
                <p className="text-sm font-medium">{adjustDialog?.minimum_stock}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Max</p>
                <p className="text-sm font-medium">{adjustDialog?.maximum_stock}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Adjustment Type</label>
                <Select defaultValue="add">
                  <option value="add">Add Stock (+)</option>
                  <option value="remove">Remove Stock (-)</option>
                  <option value="set">Set Exact Quantity</option>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity</label>
                <Input type="number" min="0" placeholder="0" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Reason</label>
              <Textarea placeholder="Reason for adjustment..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustDialog(null)}>Cancel</Button>
            <Button onClick={() => { alert('Demo only'); setAdjustDialog(null) }}>Save Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Stock Dialog */}
      <Dialog open={transferOpen} onOpenChange={resetTransfer}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-blue-600" />
              Transfer Stock
            </DialogTitle>
            <DialogDescription>Move items from one warehouse to another.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Source & Destination Warehouses */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
              <div>
                <label className="text-sm font-medium mb-1 block">From Warehouse *</label>
                <Select value={transferFrom} onChange={e => { setTransferFrom(e.target.value); setTransferItem(''); setTransferTo('') }}>
                  <option value="">Select Source</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </Select>
              </div>
              <div className="pb-2">
                <ArrowRightLeft className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">To Warehouse *</label>
                <Select value={transferTo} onChange={e => { setTransferTo(e.target.value); setTransferLocationTo('') }}>
                  <option value="">Select Destination</option>
                  {warehouses
                    .filter(w => w.id !== Number(transferFrom))
                    .map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </Select>
              </div>
            </div>

            {/* Item Selection */}
            <div>
              <label className="text-sm font-medium mb-1 block">Item to Transfer *</label>
              <Select value={transferItem} onChange={e => setTransferItem(e.target.value)} disabled={!transferFrom}>
                <option value="">{transferFrom ? 'Select Item' : 'Select source warehouse first'}</option>
                {itemsInSource.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.sku} — {item.name} (Qty: {item.availableQty})
                  </option>
                ))}
              </Select>
            </div>

            {/* Item Info Preview */}
            {transferItemInfo && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">{transferItemInfo.name}</p>
                    <p className="text-xs text-blue-700">{transferItemInfo.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-700">Available</p>
                    <p className="text-lg font-bold text-blue-900">{transferItemInfo.availableQty}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Transfer Quantity *</label>
                <Input
                  type="number"
                  min="1"
                  max={transferItemInfo?.availableQty || 999}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Destination Location</label>
                <Select value={transferLocationTo} onChange={e => setTransferLocationTo(e.target.value)} disabled={!transferTo}>
                  <option value="">{transferTo ? 'Select Location' : 'Select destination first'}</option>
                  {destLocations.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea placeholder="Reason for transfer..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetTransfer}>Cancel</Button>
            <Button onClick={() => { alert('Demo only — fitur ini akan tersedia pada program versi full.'); resetTransfer() }}>
              <ArrowRightLeft className="w-4 h-4 mr-2" /> Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
