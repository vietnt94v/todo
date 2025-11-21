import React from 'react';
import { ActionDropdown } from './ActionDropdown';
import type { ColumnDefinition, ActionOption } from './types';

export interface TableBodyProps {
  columns: ColumnDefinition[];
  data: any[];
  actions?: ActionOption[];
}

export const TableBody: React.FC<TableBodyProps> = ({
  columns,
  data,
  actions,
}) => {
  const getValue = (row: any, field: string) => {
    return field.split('.').reduce((obj, key) => obj?.[key], row);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {actions && actions.length > 0 && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Action
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {actions && actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ActionDropdown actions={actions} row={row} />
                  </td>
                )}
                {columns.map((column) => {
                  const value = getValue(row, column.field);
                  return (
                    <td
                      key={column.field}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render ? column.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
