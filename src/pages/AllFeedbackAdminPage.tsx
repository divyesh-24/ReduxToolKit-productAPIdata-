import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Feedback, getFeedbacksAsync } from '../features/Feedback/feedbackSlice'
import withProtectedRoute from '../HOC/withProtectedRoute'
// import { DynamicFormProps } from '../features/Feedback/components/DynamicForm'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {
  useReactTable,
  // createColumnHelper,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  // createColumnHelper,
} from '@tanstack/react-table'
import { Paper, TablePagination, Typography } from '@mui/material'
import TablePaginationActions from '../features/product/components/actions'
import { FaArrowDownLong, FaArrowUpLong, FaSort } from 'react-icons/fa6'

// const columnHelper = createColumnHelper<DynamicFormProps>()

// const columns = [
//   columnHelper.accessor('id', {
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor((row) => row.userId, {
//     id: 'lastName',
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <span>User Id</span>,
//   }),
//   columnHelper.accessor('category', {
//     header: () => 'category',
//     cell: (info) => info.renderValue(),
//   }),
//   columnHelper.accessor('experience', {
//     header: () => <span>experience</span>,
//   }),
//   columnHelper.accessor('feedback', {
//     header: 'feedback',
//   }),
// ]

// const columns: any = []

const AllFeedbackAdminPage = () => {
  const dispatch = useAppDispatch()
  const feedbacks = useAppSelector((s) => s.feedBack.feedbacksAdmin)
  const data = React.useMemo(() => [...feedbacks], [feedbacks])

  const [columns, setColumns] = useState<ColumnDef<Feedback, unknown>[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  useEffect(() => {
    if (data.length > 0) {
      const newColumns = Object.keys(data[data.length - 1]).map((key) => {
        // if (key == 'userId') {
        //   return {
        //     header: key.toUpperCase(),
        //     accessorKey: key.toString(),
        //   }
        // }
        return {
          header: key.toUpperCase(),
          accessorKey: key.toString(),
        }
      })
      setColumns(newColumns)
    }
  }, [data])

  // useEffect(() => {
  //   if (data.length > 0) {
  //     Object.keys(data[0]).map((key) => {
  //       columns.push({
  //         header: key.toUpperCase(),
  //         accessorKey: key.toString(),
  //       })
  //     })
  //   }
  //   console.log(columns)
  // },[])

  // {
  //   feedbacks.length > 0 &&
  //     Object.keys(feedbacks[0]).map((key, index) => {
  //       console.log(key)

  //       return (
  //         <th key={index} scope="col" className="px-6 py-3 text-center">
  //           {key}
  //         </th>
  //       )
  //     })
  // }
  useEffect(() => {
    dispatch(getFeedbacksAsync())
  }, [dispatch])

  // columns: React.useMemo(() => columns, [columns]),
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

  const { pageSize, pageIndex } = table.getState().pagination

  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 ">
      <div className="bg-white/15 px-4 shadow-md md:px-8 border border-black/10 lg:py-4 rounded-lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: 'center', paddingY: '14px' }}
        >
          {'All Feedbacks Table'}
        </Typography>
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
                      NO
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
                        <div className="flex justify-center items-center ">
                          <FaSort />{' '}
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {
                            {
                              asc: <FaArrowUpLong />,
                              desc: <FaArrowDownLong />,
                            }[(header.column.getIsSorted() as string) ?? null]
                          }
                        </div>
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
                      if (cell.column.id == 'userId') {
                        return (
                          <TableCell
                            key={cell.id}
                            className=" text-center"
                            sx={{
                              textAlign: 'center',
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
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
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
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
            const size = e.target.value ? Number(e.target.value) : 5
            table.setPageSize(size)
          }}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    </div>
  )
}

const ProtectedAllFeedbackAdminPage = withProtectedRoute(AllFeedbackAdminPage)

export default ProtectedAllFeedbackAdminPage
