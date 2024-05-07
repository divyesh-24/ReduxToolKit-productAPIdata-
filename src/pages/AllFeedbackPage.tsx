import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getFeedbacksByUserAsync } from '../features/Feedback/feedbackSlice'
import withProtectedRoute from '../HOC/withProtectedRoute'

const AllFeedbackPage = () => {
  const dispatch = useAppDispatch()

  const feedbacks = useAppSelector((s) => s.feedBack.feedbacks)

  const user = useAppSelector((s) => s.auth.user)
  const totalItems = useAppSelector((s) => s.feedBack.totalItems)
  const totalPages = useAppSelector((s) => s.feedBack.totalPages)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getFeedbacksByUserAsync({ id: user.id as string, page }))
  }, [dispatch, user.id, page])

  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 ">
      {/* <div className="flex justify-end">
          <div
            className="bg-indigo-600 hover:bg-indigo-500 hover:scale-110 hover:transition-transform text-white cursor-pointer uppercase px-3 py-2 my-2 w-fit  rounded-lg "
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen
              ? `ADD ${pathname == '/admin/users' ? 'User' : 'Product'}`
              : 'CLOSE'}
          </div>
        </div> */}
      <div className=" overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {feedbacks.length > 0 &&
                Object.keys(feedbacks[0]).map((key, index) => (
                  <th key={index} scope="col" className="px-6 py-3 text-center">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {feedbacks?.map((item, index) => (
              <tr key={index} className="bg-white border-b  hover:bg-gray-50 ">
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    className="px-6 py-3 text-center break-words text-wrap"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
              onClick={() => setPage(1 < page ? page - 1 : page)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  "
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => setPage(index + 1)}
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
              onClick={() => setPage(totalPages > page ? page + 1 : page)}
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
