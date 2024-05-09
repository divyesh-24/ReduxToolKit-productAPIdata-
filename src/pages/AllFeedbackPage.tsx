import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  Feedback,
  getFeedbacksByUserAsync,
} from '../features/Feedback/feedbackSlice'
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
  // createColumnHelper,
} from '@tanstack/react-table'
import { Paper } from '@mui/material'

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

const AllFeedbackPage = () => {
  const dispatch = useAppDispatch()
  const feedbacks = useAppSelector((s) => s.feedBack.feedbacks)
  const user = useAppSelector((s) => s.auth.user)
  const totalItems = useAppSelector((s) => s.feedBack.totalItems)
  const totalPages = useAppSelector((s) => s.feedBack.totalPages)
  const [page, setPage] = useState(1)
  const data = [...feedbacks]

  const [columns, setColumns] = useState<ColumnDef<Feedback, unknown>[]>([])

  useEffect(() => {
    if (data.length > 0) {
      const newColumns = Object.keys(data[data.length - 1]).map((key) => ({
        header: key.toUpperCase(),
        accessorKey: key.toString(),
      }))
      setColumns(newColumns)
    }
    console.log(columns)
  }, [])

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
    dispatch(getFeedbacksByUserAsync({ id: user.id as string, page }))
  }, [dispatch, user.id, page])

  const table = useReactTable({
    data,
    columns: React.useMemo(() => columns, [columns]),
    getCoreRowModel: getCoreRowModel(),
  })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 cpa">
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table className=" text-center min-w-full" sx={{ minWidth: 650 }}>
            <TableHead className="h-10" sx={{ textTransform: 'capitalize' }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      sx={{
                        fontWeight: '700',
                        textAlign: 'center',
                        backgroundColor: '#ddd6fe',
                      }}
                      key={header.id}
                      className=" font-bold text-center"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
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
                  {row.getVisibleCells().map((cell) => (
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
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <nav
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
      </nav>
    </div>
  )
}

const ProtectedAllFeedbackPage = withProtectedRoute(AllFeedbackPage)

export default ProtectedAllFeedbackPage
