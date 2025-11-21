import React from 'react'

export interface TableTitleProps {
  title: string
}

export const TableTitle: React.FC<TableTitleProps> = ({ title }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  )
}

