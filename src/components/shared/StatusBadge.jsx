import { Badge } from '@/components/ui/badge'

const statusConfig = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'secondary', label: 'Inactive' },
  ok: { variant: 'success', label: 'OK' },
  low: { variant: 'warning', label: 'Low' },
  critical: { variant: 'destructive', label: 'Critical' },
  out: { variant: 'destructive', label: 'Out of Stock' },
  over: { variant: 'info', label: 'Overstock' },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || { variant: 'secondary', label: status }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
