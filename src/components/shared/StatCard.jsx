import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, className, iconColor = 'text-blue-600', iconBg = 'bg-blue-50' }) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trendLabel && (
              <p className={cn('text-xs mt-1', trend > 0 ? 'text-emerald-600' : 'text-red-600')}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
              </p>
            )}
          </div>
          {Icon && (
            <div className={cn('p-3 rounded-lg', iconBg)}>
              <Icon className={cn('w-5 h-5', iconColor)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
