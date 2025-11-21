import { useState, useEffect, useMemo } from 'react'
import { TableTitle } from './TableTitle'
import { TableSearch } from './TableSearch'
import { TableFilter } from './TableFilter'
import { TableBody } from './TableBody'
import { TablePagination } from './TablePagination'
import type { TableProps } from './types'

export const Table = <T extends Record<string, any>>({
  title,
  config,
  data,
  loading = false,
  totalItems: serverTotalItems,
  currentPage: serverCurrentPage,
  itemsPerPage: serverItemsPerPage,
}: TableProps<T>) => {
  const mode = config.mode || 'client'
  const isClientMode = mode === 'client'
  
  const defaultItemsPerPage = config.pagination?.defaultItemsPerPage || 25
  const itemsPerPageOptions = config.pagination?.itemsPerPageOptions || [25, 50, 75, 100]

  const [clientCurrentPage, setClientCurrentPage] = useState(1)
  const [clientItemsPerPage, setClientItemsPerPage] = useState(defaultItemsPerPage)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<T[]>(data)

  const currentPage = isClientMode ? clientCurrentPage : (serverCurrentPage || 1)
  const itemsPerPage = isClientMode ? clientItemsPerPage : (serverItemsPerPage || defaultItemsPerPage)

  useEffect(() => {
    if (isClientMode) {
      let filtered = [...data]

      if (searchTerm && config.searchConfig?.enabled) {
        filtered = filtered.filter((row) =>
          config.columns.some((column) => {
            const value = String(row[column.field] || '').toLowerCase()
            return value.includes(searchTerm.toLowerCase())
          })
        )
      }

      setFilteredData(filtered)
      setClientCurrentPage(1)
    } else {
      setFilteredData(data)
    }
  }, [data, searchTerm, isClientMode, config.columns, config.searchConfig?.enabled])

  const paginatedData = useMemo(() => {
    if (isClientMode) {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return filteredData.slice(startIndex, endIndex)
    }
    return filteredData
  }, [filteredData, currentPage, itemsPerPage, isClientMode])

  const totalItems = isClientMode ? filteredData.length : (serverTotalItems || 0)
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const handlePageChange = (page: number) => {
    if (isClientMode) {
      setClientCurrentPage(page)
    } else {
      config.serverSideCallbacks?.onPageChange?.(page)
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (isClientMode) {
      setClientItemsPerPage(newItemsPerPage)
      setClientCurrentPage(1)
    } else {
      config.serverSideCallbacks?.onItemsPerPageChange?.(newItemsPerPage)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!isClientMode) {
      config.serverSideCallbacks?.onSearch?.(term)
    }
  }

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="p-6">
        {title && <TableTitle title={title} />}
        
        {config.searchConfig?.enabled && (
          <TableSearch
            placeholder={config.searchConfig.placeholder}
            onSearch={handleSearch}
          />
        )}

        {config.filterConfig && <TableFilter config={config.filterConfig} />}

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
            <TableBody
              columns={config.columns}
              data={paginatedData}
              actions={config.actions}
            />

            {totalItems > 0 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={itemsPerPageOptions}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={totalItems}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

