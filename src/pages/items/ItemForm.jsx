import { useParams, useNavigate } from 'react-router-dom'
import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/shared/PageHeader'
import { brands, categories, getItemById } from '@/data/mock'
import { useState } from 'react'

export default function ItemForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const existingItem = isEdit ? getItemById(Number(id)) : null

  const [form, setForm] = useState({
    sku: existingItem?.sku || '',
    esbn: existingItem?.esbn || '',
    part_number: existingItem?.part_number || '',
    name: existingItem?.name || '',
    brand_id: existingItem?.brand_id || '',
    category_id: existingItem?.category_id || '',
    type: existingItem?.type || 'OEM',
    size: existingItem?.size || '',
    unit: existingItem?.unit || 'Pcs',
    product_type: existingItem?.product_type || 'Sparepart',
    weight: existingItem?.weight || '',
    barcode: existingItem?.barcode || '',
    description: existingItem?.description || '',
    status: existingItem?.status || 'active',
  })

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Demo only - fitur ini akan tersedia pada program versi full.')
    console.log('Form data:', form)
    navigate('/items')
  }

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Item' : 'Create New Item'}
        subtitle={isEdit ? existingItem?.name : 'Fill in item details'}
        backTo="/items"
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <Card>
          <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">SKU *</label>
              <Input value={form.sku} onChange={handleChange('sku')} placeholder="SKU-0001" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">ESBN</label>
              <Input value={form.esbn} onChange={handleChange('esbn')} placeholder="ESBN-10001" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Part Number</label>
              <Input value={form.part_number} onChange={handleChange('part_number')} placeholder="KVB-F2110" />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Item Name *</label>
              <Input value={form.name} onChange={handleChange('name')} placeholder="Kampas Rem Depan Honda Beat" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Brand *</label>
              <Select value={form.brand_id} onChange={handleChange('brand_id')} required>
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
              <Select value={form.category_id} onChange={handleChange('category_id')} required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader><CardTitle className="text-base">Product Details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
              <Select value={form.type} onChange={handleChange('type')}>
                <option value="OEM">OEM</option>
                <option value="Aftermarket">Aftermarket</option>
                <option value="Racing">Racing</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Size</label>
              <Input value={form.size} onChange={handleChange('size')} placeholder="e.g. 428H-118L" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Unit</label>
              <Select value={form.unit} onChange={handleChange('unit')}>
                <option value="Pcs">Pcs</option>
                <option value="Set">Set</option>
                <option value="Botol">Botol</option>
                <option value="Liter">Liter</option>
                <option value="Box">Box</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Product Type</label>
              <Select value={form.product_type} onChange={handleChange('product_type')}>
                <option value="Sparepart">Sparepart</option>
                <option value="Consumable">Consumable</option>
                <option value="Accessories">Accessories</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Weight (kg)</label>
              <Input type="number" step="0.01" value={form.weight} onChange={handleChange('weight')} placeholder="0.00" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Barcode</label>
              <Input value={form.barcode} onChange={handleChange('barcode')} placeholder="8991011001" />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader><CardTitle className="text-base">Description</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Item description..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Status + Actions */}
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <Select value={form.status} onChange={handleChange('status')} className="w-32">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/items')}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" /> {isEdit ? 'Update Item' : 'Create Item'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
