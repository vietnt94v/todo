import type { ReactNode } from 'react'

export interface ActionOption {
  label: string
  onClick: (row: any) => void
  icon?: ReactNode
}

export interface ColumnDefinition<T = any> {
  field: string
  header: string
  render?: (value: any, row: T) => ReactNode
  sortable?: boolean
}

export interface PaginationConfig {
  itemsPerPageOptions?: number[]
  defaultItemsPerPage?: number
}

export interface FilterConfig {
  fields?: string[]
  customFilters?: ReactNode
}

export type DataFetchMode = 'client' | 'server'

export interface ServerSideCallbacks {
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  onSearch?: (searchTerm: string) => void
  onSort?: (field: string, direction: 'asc' | 'desc') => void
}

export interface TableConfig<T = any> {
  columns: ColumnDefinition<T>[]
  actions?: ActionOption[]
  pagination?: PaginationConfig
  searchConfig?: {
    enabled?: boolean
    placeholder?: string
  }
  filterConfig?: FilterConfig
  mode?: DataFetchMode
  serverSideCallbacks?: ServerSideCallbacks
}

export interface TableProps<T = any> {
  title?: string
  config: TableConfig<T>
  data: T[]
  loading?: boolean
  totalItems?: number
  currentPage?: number
  itemsPerPage?: number
}

