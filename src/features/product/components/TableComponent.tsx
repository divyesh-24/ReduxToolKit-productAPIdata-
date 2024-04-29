import { FaRegEdit } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Modal from '../../../components/Modal'
import { Product } from '../productApi'
import { UserType } from '../../auth/authApi'

interface TableComponentProps {
  products: Product[] | UserType[]
  totalItems: number
  totalPages: number
  deleteFunction: (id: string) => void
  getAllData: (page: number) => void
}

const TableComponent: React.FC<TableComponentProps> = ({
  products,
  totalItems,
  totalPages,
  deleteFunction,
  getAllData,
}) => {
  const { pathname } = useLocation()
  console.log(pathname)

  const [page, setPage] = useState(1)
  const [openShowModal, setOpenShowModal] = useState(-1)
  const handleDelete = (product1: string | undefined) => {
    deleteFunction(product1 as string)
  }
  useEffect(() => {
    getAllData(page)
  }, [page, getAllData, totalItems])

  return (
    <div className=" overflow-x-auto  sm:rounded-lg max-w-[90%] mx-auto p-10 pt-20 my-10 ">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <h1 className="">ID</h1>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Color
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Available Stocks
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, indexNumber) => (
            <tr
              key={product.id}
              className="bg-white border-b  hover:bg-gray-50 "
            >
              <td className="w-4 p-4">
                <div className="flex items-center text-center">
                  {product.id}
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {product.name}
              </th>
              <td className="px-6 py-4 justify-center flex items-center">
                <div
                  className="h-4 w-4 mr-1  inline-block rounded-full border border-indigo-600"
                  style={{ backgroundColor: product.bgColor }}
                ></div>
                {product.bgColor}
              </td>
              <td className="px-6 py-4 capitalize text-center">
                {product.category}
              </td>
              <td className="px-6 py-4 text-center">${product.price}</td>
              <td className="px-6 py-4 text-center">
                {product.inStock ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4 text-center flex justify-evenly">
                <Link
                  to={`/edit/${product.id}`}
                  className="font-medium text-blue-600  hover:underline"
                >
                  <FaRegEdit className="w-5 h-5 cursor-pointer" />
                </Link>
                <RiDeleteBin5Line
                  className="h-5 w-5 text-red-400 cursor-pointer"
                  onClick={() => setOpenShowModal(indexNumber)}
                />
                <Modal
                  title={'Remove'}
                  massage={`Are you sure Remove ${product?.name} ?`}
                  dangerAction={() => handleDelete(product.id)}
                  dangerOption={'Remove'}
                  showModal={openShowModal === indexNumber}
                  cancelAction={() => setOpenShowModal(-1)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

          {Array.from({ length: totalPages }).map((e, index) => (
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

export default TableComponent
