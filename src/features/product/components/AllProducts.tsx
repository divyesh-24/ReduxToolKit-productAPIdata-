import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { Product } from '../productApi'

const AllProducts = () => {
  const products = useAppSelector((s) => s.products.AllProducts)

  const [sorting, setSorting] = useState<SortingState>([])
  const data = React.useMemo(() => [...products], [products])

  const [columns, setColumns] = useState<ColumnDef<Product, unknown>[]>([])

  useEffect(() => {
    if (data.length > 0) {
      const newColumns = Object.keys(data[data.length - 1]).map((key) =>
        createColumn(key),
      )
      setColumns(newColumns as ColumnDef<Product, unknown>[])
    }
  }, [data])

  const createColumn = (key: string) => {
    switch (key) {
      case 'image':
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
          cell: ({ getValue }: { getValue: () => string }) => (
            <img
              src={getValue()}
              alt=""
              className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
            />
          ),
        }
      case 'bgColor':
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
          cell: ({ getValue }: { getValue: () => string }) => (
            <div
              className="px-2 py-1 text-white inline-block rounded-full border border-indigo-600"
              style={{ backgroundColor: getValue() }}
            >
              {getValue()}
            </div>
          ),
        }
      case 'inStock':
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
          cell: ({ getValue }: { getValue: () => string }) => (
            <div className="px-6 py-4 text-center">
              {getValue() ? 'Yes' : 'No'}
            </div>
          ),
        }
      case 'price':
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
          cell: ({ getValue }: { getValue: () => string }) => (
            <div className="px-6 py-4 text-center">$ {getValue()}</div>
          ),
        }

      default:
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
          cell: ({ getValue }: { getValue: () => string }) => (
            <div className="px-6 py-4 text-center capitalize">{getValue()}</div>
          ),
        }
    }
  }

  //   useEffect(() => {
  //     if (data.length > 0) {
  //       const newColumns = Object.keys(data[data.length - 1]).map((key) =>
  //         key != 'image'
  //           ? {
  //               header: key.toUpperCase(),
  //               accessorKey: key.toString(),
  //             }
  //           : {
  //               header: key.toUpperCase(),
  //               accessorKey: key.toString(),
  //               cell:
  //                 key === 'image'
  //                   ? ({ getValue }: { getValue: () => string }) => (
  //                       <img
  //                         src={getValue()}
  //                         alt=""
  //                         className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
  //                       />
  //                     )
  //                   : ('' as unknown),
  //             },
  //       )
  //       setColumns(newColumns)
  //     }
  //   }, [data])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })

  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 cpa">
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table className=" text-center min-w-full" sx={{ minWidth: 650 }}>
            <TableHead className="h-10" sx={{ textTransform: 'capitalize' }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableCell
                    sx={{
                      fontWeight: '700',
                      textAlign: 'left',
                      backgroundColor: '#ddd6fe',
                    }}
                  >
                    No
                  </TableCell>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      colSpan={header.colSpan}
                      sx={{
                        fontWeight: '700',
                        textAlign: 'center',
                        backgroundColor: '#ddd6fe',
                      }}
                      key={header.id}
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ' font-bold text-center'
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {
                        { asc: '⬆️', desc: '⬇️' }[
                          (header.column.getIsSorted() as string) ?? null
                        ]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#f5f3ff',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: '#eef2ff',
                    },
                    // '&:hover': {
                    //   backgroundColor: '#ede9fe',
                    // },
                  }}
                >
                  <TableCell>{Number(row.id) + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id != 'image') {
                      return (
                        <TableCell
                          key={cell.id}
                          className=" text-center"
                          sx={{
                            textAlign: 'center',
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell
                          key={cell.id}
                          className=" text-center"
                          sx={{
                            textAlign: 'center',
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{' '}
          <span className="font-semibold text-gray-900 ">
            {(page - 1) * 10 + 1}-
            {page * 10 > totalItems ? totalItems : page * 10}
          </span>{' '}
          of <span className="font-semibold text-gray-900 ">{totalPages}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => handlePageChange(1 < page ? page - 1 : page)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  "
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => handlePageChange(index + 1)}
              aria-current="page"
              className={`flex items-center justify-center px-3 h-8 ${
                index + 1 !== page
                  ? 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
                  : 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
              } `}
            >
              {index + 1}
            </div>
          ))}

          <li>
            <button
              onClick={() =>
                handlePageChange(totalPages > page ? page + 1 : page)
              }
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </button>
          </li>
        </ul>
      </nav> */}
      <div>
        <button onClick={() => table.setPageIndex(0)}>First page</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </button>
      </div>
      {/* <TablePagination
        component="div"
        count={100}
        page={table.getPageOptions()}
        onPageChange={() => table.setPageIndex(table.getPageCount() - 1)}
        rowsPerPage={table.getRowCount()}
        onRowsPerPageChange={() => table.setPageIndex(table.getPageCount() - 1)}
      /> */}
    </div>
  )
}

export default AllProducts
