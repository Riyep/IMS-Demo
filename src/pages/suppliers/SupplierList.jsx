import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Eye, Edit, MoreHorizontal, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DataTable from '@/components/shared/DataTable'
import PageHeader from '@/components/shared/PageHeader'
import StatusBadge from '@/components/shared/StatusBadge'
import { suppliers } from '@/data/mock'

export default function SupplierList() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  let filtered = suppliers
  if (statusFilter) filtered = filtered.filter(s => s.status === statusFilter)

  const columns = [
    { key: 'supplier_code', header: 'Code', sortable: true },
    {
      key: 'supplier_name', header: 'Supplier Name', sortable: true,
      render: (row) => (
        <Link to={`/suppliers/${row.id}`} className="font-medium text-blue-600 hover:underline">
          {row.supplier_name}
        </Link>
      )
    },
    {
      key: 'phone', header: 'Phone',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-sm">{row.phone}</span>
        </div>
      )
    },
    {
      key: 'email', header: 'Email',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-sm">{row.email}</span>
        </div>
      )
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
            <DropdownMenuItem onClick={() => navigate(`/suppliers/${row.id}`)}>
              <Eye className="w-4 h-4 mr-2" /> View Detail
            </DropdownMenuItem>
            <DropdownMenuItem>
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
        title="Suppliers"
        subtitle={`${filtered.length} suppliers`}
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Supplier
          </Button>
        }
      />

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search suppliers..."
        searchKeys={['supplier_name', 'supplier_code', 'email', 'phone']}
        filters={
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-32">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        }
      />

      {/* Add Supplier Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>Fill in supplier details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Supplier Code *</label>
                <Input placeholder="SUP-009" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select defaultValue="active">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Supplier Name *</label>
              <Input placeholder="PT Example Motor" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input placeholder="021-12345678" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" placeholder="info@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Address</label>
              <Textarea placeholder="Full address..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => { alert('Demo only'); setDialogOpen(false) }}>Save Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
