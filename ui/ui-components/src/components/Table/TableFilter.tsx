import React from 'react'
import type { FilterConfig } from './types'

export interface TableFilterProps {
  config?: FilterConfig
}

export const TableFilter: React.FC<TableFilterProps> = ({ config }) => {
  if (!config || !config.customFilters) {
    return null
  }

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-md">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Filters</h3>
      {config.customFilters}
    </div>
  )
}

