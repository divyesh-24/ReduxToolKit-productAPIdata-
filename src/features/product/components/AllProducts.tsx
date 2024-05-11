import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import {
  AccessorKeyColumnDef,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { Product } from '../productApi'
import TablePaginationActions from './actions'
import AddTableData from '../../../components/AddTableData'
import { useLocation } from 'react-router-dom'
import Modal from '../../../components/Modal'
import { UserType } from '../../auth/authApi'
import { MdClose } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'

interface AllProductsProps {
  data: Product[] | UserType[]
  deleteFunction: (id: string) => void
  getAllData: () => void
  columns:
    | ColumnDef<Product | UserType, unknown>[]
    | AccessorKeyColumnDef<Product | UserType, string>[]
}
const AllProducts: React.FC<AllProductsProps> = ({
  data,
  columns,
  getAllData,
  deleteFunction,
}) => {
  // const products = useAppSelector((s) => s.products.AllProducts)
  const [isOpenEdit, setIsOpenEdit] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const [openShowModal, setOpenShowModal] = useState(-1)

  const { pathname } = useLocation()

  const [sorting, setSorting] = useState<SortingState>([])
  const [filtering, setFiltering] = useState('')

  const handleDelete = (product1: string | undefined) => {
    console.log(product1)
    deleteFunction(product1 as string)

    setOpenShowModal(-1)
  }

  useEffect(() => {
    getAllData()
  }, [getAllData, deleteFunction, openShowModal, isOpen])

  // useEffect(() => {
  //   if (data.length > 0) {
  //     const newColumns = Object.keys(data[data.length - 1]).map((key) =>
  //       createColumn(key),
  //     )
  //     setColumns(newColumns as ColumnDef<Product, unknown>[])
  //   }
  // }, [data])

  // const createColumn = (key: string) => {
  //   switch (key) {
  //     case 'image':
  //       return {
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //         cell: ({ getValue }: { getValue: () => string }) => (
  //           <img
  //             src={getValue()}
  //             alt=""
  //             className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
  //           />
  //         ),
  //       }
  //     case 'bgColor':
  //       return {
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //         cell: ({ getValue }: { getValue: () => string }) => (
  //           <div
  //             className="px-2 py-1 text-white inline-block rounded-full border border-indigo-600"
  //             style={{ backgroundColor: getValue() }}
  //           >
  //             {getValue()}
  //           </div>
  //         ),
  //       }
  //     case 'inStock':
  //       return {
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //         cell: ({ getValue }: { getValue: () => string }) => (
  //           <div className="px-6 py-4 text-center">
  //             {getValue() ? 'Yes' : 'No'}
  //           </div>
  //         ),
  //       }
  //     case 'price':
  //       return {
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //         cell: ({ getValue }: { getValue: () => string }) => (
  //           <div className="px-6 py-4 text-center">$ {getValue()}</div>
  //         ),
  //       }

  //     default:
  //       return {
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //         cell: ({ getValue }: { getValue: () => string }) => (
  //           <div className="px-6 py-4 text-center capitalize">{getValue()}</div>
  //         ),
  //       }
  //   }
  // }

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
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  const { pageSize, pageIndex } = table.getState().pagination
  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 cpa">
      <div className="flex justify-between items-center w-full mb-2">
        <div className="w-2/5 flex items-center">
          <input
            type="text"
            className={`rounded-md px-2 py-1.5 w-full`}
            placeholder="Search here"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
          {filtering != '' && (
            <button onClick={() => setFiltering('')}>
              <MdClose className="w-8 h-8 bg-white rounded-md mx-4 px-1" />
            </button>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? `ADD ${pathname == '/admin/users' ? 'User' : 'Product'}`
            : 'CLOSE'}
        </Button>
      </div>
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
                  <TableCell
                    scope="col"
                    className="px-6 py-3 text-center"
                    sx={{
                      fontWeight: '700',
                      textAlign: 'left',
                      backgroundColor: '#ddd6fe',
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              ))}
              {isOpen && (
                <AddTableData
                  pathname={pathname}
                  setIsOpen={setIsOpen}
                  setIsOpenEdit={setIsOpenEdit}
                />
              )}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row, indexNumber) => {
                if (isOpenEdit == indexNumber) {
                  return (
                    <>
                      <AddTableData
                        key={row.id}
                        pathname={pathname}
                        setIsOpen={setIsOpen}
                        product={row.original}
                        setIsOpenEdit={setIsOpenEdit}
                        no={Number(row.id) + 1}
                      />
                    </>
                  )
                }
                return (
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
                    <TableCell className="px-6 py-4 text-center ">
                      <div className="flex justify-evenly gap-5">
                        <div
                          // to={`/profile/${product.id}`}
                          onClick={() => setIsOpenEdit(indexNumber)}
                          className="font-medium text-blue-600  hover:underline"
                        >
                          <FaRegEdit className="w-5 h-5 cursor-pointer" />
                        </div>

                        <RiDeleteBin5Line
                          className="h-5 w-5 text-red-400 cursor-pointer"
                          onClick={() => setOpenShowModal(indexNumber)}
                        />
                      </div>
                    </TableCell>
                    <Modal
                      title={'Remove'}
                      massage={`Are you sure Remove ${row?.original?.name} ?`}
                      dangerAction={() => handleDelete(row?.original?.id)}
                      dangerOption={'Remove'}
                      showModal={openShowModal === indexNumber}
                      cancelAction={() => setOpenShowModal(-1)}
                    />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        slotProps={{
          select: {
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          },
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10
          table.setPageSize(size)
        }}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  )
}

export default AllProducts
