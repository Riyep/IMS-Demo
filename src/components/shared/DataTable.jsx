import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, XCircle } from 'lucide-react'

export default function DataTable({
  data,
  columns,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  pageSize = 10,
  filters,
  onClearAll,
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortId, setSortId] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  // Build a stable map of column key -> sort accessor function
  const sortAccessors = useMemo(() => {
    const map = {}
    columns.forEach(col => {
      if (col.sortable) {
        const id = col.key
        if (typeof col.sortKey === 'function') {
          map[id] = col.sortKey
        } else if (col.sortKey) {
          map[id] = (row) => row[col.sortKey]
        } else {
          map[id] = (row) => row[col.key]
        }
      }
    })
    return map
  }, [columns])

  const filtered = useMemo(() => {
    let result = data
    if (search && searchKeys.length > 0) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        searchKeys.some(key => {
          const val = typeof key === 'function' ? key(row) : row[key]
          return String(val || '').toLowerCase().includes(q)
        })
      )
    }
    if (sortId && sortAccessors[sortId]) {
      const accessor = sortAccessors[sortId]
      result = [...result].sort((a, b) => {
        const aVal = accessor(a)
        const bVal = accessor(b)
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  }, [data, search, searchKeys, sortId, sortDir, sortAccessors])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  function handleSort(colKey) {
    if (sortId === colKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortId(colKey)
      setSortDir('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="pl-10"
          />
        </div>
        {filters}
        {onClearAll && (
          <Button variant="ghost" size="sm" onClick={() => { onClearAll(); setSearch(''); setSortId(null); setPage(1) }} className="text-gray-500 hover:text-red-600">
            <XCircle className="w-4 h-4 mr-1" /> Clear All
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key || col.header}>
                  {col.sortable ? (
                    <button
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.header}
                      {sortId === col.key ? (
                        sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-30" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, i) => (
                <TableRow key={row.id || i}>
                  {columns.map((col) => (
                    <TableCell key={col.key || col.header}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(1)} disabled={page === 1}>
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm px-2">Page {page} of {totalPages || 1}</span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(totalPages)} disabled={page >= totalPages}>
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
