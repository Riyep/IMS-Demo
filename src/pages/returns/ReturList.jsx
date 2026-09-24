import { useState, useMemo } from 'react'
import { Plus, RotateCcw, Eye, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import PageHeader from '@/components/shared/PageHeader'
import DataTable from '@/components/shared/DataTable'
import { items, getItemById } from '@/data/mock'
import { formatDate } from '@/lib/utils'

const returnsData = [
  { id: 1, return_code: 'RTN-001', date: '2024-08-15', item_id: 1, quantity: 5, reason: 'Damaged', status: 'completed', notes: 'Kemasan rusak saat pengiriman' },
  { id: 2, return_code: 'RTN-002', date: '2024-08-18', item_id: 3, quantity: 10, reason: 'Defective', status: 'completed', notes: 'Rantai berkarat' },
  { id: 3, return_code: 'RTN-003', date: '2024-08-22', item_id: 5, quantity: 3, reason: 'Wrong Item', status: 'approved', notes: 'Salah kirim oli tipe berbeda' },
  { id: 4, return_code: 'RTN-004', date: '2024-09-01', item_id: 8, quantity: 2, reason: 'Defective', status: 'rejected', notes: 'Kerusakan akibat pemakaian' },
  { id: 5, return_code: 'RTN-005', date: '2024-09-05', item_id: 10, quantity: 1, reason: 'Damaged', status: 'pending', notes: 'Shock bocor saat diterima' },
  { id: 6, return_code: 'RTN-006', date: '2024-09-08', item_id: 12, quantity: 4, reason: 'Wrong Item', status: 'pending', notes: 'Ukuran ban tidak sesuai pesanan' },
  { id: 7, return_code: 'RTN-007', date: '2024-09-10', item_id: 15, quantity: 2, reason: 'Defective', status: 'approved', notes: 'Kampas kopling aus tidak sesuai standar' },
  { id: 8, return_code: 'RTN-008', date: '2024-09-12', item_id: 2, quantity: 20, reason: 'Wrong Item', status: 'completed', notes: 'Busi tipe salah' },
  { id: 9, return_code: 'RTN-009', date: '2024-09-14', item_id: 18, quantity: 1, reason: 'Damaged', status: 'pending', notes: 'Piston tergores dalam kemasan' },
  { id: 10, return_code: 'RTN-010', date: '2024-09-15', item_id: 22, quantity: 6, reason: 'Defective', status: 'approved', notes: 'Roller CVT tidak bulat sempurna' },
  { id: 11, return_code: 'RTN-011', date: '2024-09-16', item_id: 9, quantity: 1, reason: 'Defective', status: 'pending', notes: 'CDI mati saat ditest' },
  { id: 12, return_code: 'RTN-012', date: '2024-09-17', item_id: 26, quantity: 1, reason: 'Damaged', status: 'rejected', notes: 'Velg lecet minor, masih layak pakai' },
  { id: 13, return_code: 'RTN-013', date: '2024-09-18', item_id: 6, quantity: 8, reason: 'Wrong Item', status: 'approved', notes: 'Filter udara tipe lama, bukan tipe baru' },
  { id: 14, return_code: 'RTN-014', date: '2024-09-19', item_id: 28, quantity: 3, reason: 'Defective', status: 'pending', notes: 'Koil tidak menghasilkan percikan' },
  { id: 15, return_code: 'RTN-015', date: '2024-09-20', item_id: 11, quantity: 1, reason: 'Damaged', status: 'pending', notes: 'Knalpot penyok saat pengiriman' },
]

const statusVariant = {
  pending: 'warning',
  approved: 'info',
  rejected: 'destructive',
  completed: 'success',
}

export default function ReturList() {
  const [statusFilter, setStatusFilter] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [viewReturn, setViewReturn] = useState(null)

  // Enrich with item info
  const enriched = useMemo(() =>
    returnsData.map(r => {
      const item = getItemById(r.item_id)
      return { ...r, itemName: item?.name || 'Unknown', itemSku: item?.sku || '-' }
    }),
    []
  )

  let filtered = enriched
  if (statusFilter) filtered = filtered.filter(r => r.status === statusFilter)

  const columns = [
    {
      key: 'return_code', header: 'Return ID', sortable: true,
      render: (row) => <span className="font-mono text-sm font-medium">{row.return_code}</span>
    },
    {
      key: 'date', header: 'Date', sortable: true,
      render: (row) => formatDate(row.date)
    },
    {
      key: 'itemName', header: 'Item', sortable: true,
      render: (row) => (
        <div>
          <Link to={`/items/${row.item_id}`} className="font-medium text-blue-600 hover:underline">{row.itemName}</Link>
          <p className="text-xs text-muted-foreground">{row.itemSku}</p>
        </div>
      )
    },
    {
      key: 'quantity', header: 'Qty', sortable: true,
      render: (row) => <span className="font-semibold">{row.quantity}</span>
    },
    {
      key: 'reason', header: 'Reason',
      render: (row) => (
        <Badge variant={row.reason === 'Damaged' ? 'destructive' : row.reason === 'Defective' ? 'warning' : 'info'}>
          {row.reason}
        </Badge>
      )
    },
    {
      key: 'status', header: 'Status',
      render: (row) => (
        <Badge variant={statusVariant[row.status] || 'secondary'} className="capitalize">
          {row.status}
        </Badge>
      )
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
            <DropdownMenuItem onClick={() => setViewReturn(row)}>
              <Eye className="w-4 h-4 mr-2" /> View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  ]

  return (
    <div>
      <PageHeader
        title="Returns"
        subtitle={`${filtered.length} returns`}
        actions={
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> New Return
          </Button>
        }
      />

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search by return ID, item name, SKU..."
        searchKeys={['return_code', 'itemName', 'itemSku']}
        filters={
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-36">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </Select>
        }
      />

      {/* Create Return Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Return</DialogTitle>
            <DialogDescription>Submit a new item return request.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Item *</label>
              <Select>
                <option value="">Select Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>{item.sku} — {item.name}</option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity *</label>
                <Input type="number" min="1" placeholder="1" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Reason *</label>
                <Select>
                  <option value="">Select Reason</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Defective">Defective</option>
                  <option value="Wrong Item">Wrong Item</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea placeholder="Describe the issue..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => { alert('Demo only - fitur ini akan tersedia pada program versi full.'); setIsCreateOpen(false) }}>Submit Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Return Dialog */}
      <Dialog open={!!viewReturn} onOpenChange={() => setViewReturn(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Details</DialogTitle>
            <DialogDescription>{viewReturn?.return_code}</DialogDescription>
          </DialogHeader>
          {viewReturn && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Return ID</p>
                  <p className="text-sm font-medium">{viewReturn.return_code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">{formatDate(viewReturn.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Item</p>
                  <p className="text-sm font-medium">{viewReturn.itemName}</p>
                  <p className="text-xs text-muted-foreground">{viewReturn.itemSku}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Quantity</p>
                  <p className="text-sm font-semibold">{viewReturn.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reason</p>
                  <Badge variant={viewReturn.reason === 'Damaged' ? 'destructive' : viewReturn.reason === 'Defective' ? 'warning' : 'info'} className="mt-0.5">
                    {viewReturn.reason}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={statusVariant[viewReturn.status]} className="capitalize mt-0.5">
                    {viewReturn.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Notes</p>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">{viewReturn.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
