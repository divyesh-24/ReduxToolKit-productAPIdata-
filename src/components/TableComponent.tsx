import { FaRegEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Modal from './Modal'
import { Product } from '../features/product/productApi'
import { UserType } from '../features/auth/authApi'
import AddTableData from './AddTableData'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

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

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(-1)
  const [page, setPage] = useState(1)
  const [openShowModal, setOpenShowModal] = useState(-1)
  const handleDelete = (product1: string | undefined) => {
    deleteFunction(product1 as string)
    setOpenShowModal(-1)
  }
  useEffect(() => {
    getAllData(page)
  }, [page, getAllData, deleteFunction, openShowModal, isOpen])

  return (
    <div className="sm:rounded-lg max-w-[90%] mx-auto lg:p-10 lg:pt-20 pt-8 ">
      <div className="flex justify-end">
        <div
          className="bg-indigo-600 hover:bg-indigo-500 hover:scale-110 hover:transition-transform text-white cursor-pointer uppercase px-3 py-2 my-2 w-fit  rounded-lg "
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen
            ? `ADD ${pathname == '/admin/users' ? 'User' : 'Product'}`
            : 'CLOSE'}
        </div>
      </div>
      <div className=" overflow-x-auto">
        <Table className="w-full text-sm text-left text-gray-500">
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <TableRow>
              <TableCell scope="col" className="p-4">
                <div className="flex items-center">
                  <h1 className="">ID</h1>
                </div>
              </TableCell>
              {pathname == '/admin/products' ? (
                <>
                  <TableCell scope="col" className="px-6 py-3 w-1/6">
                    Product name
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Pic
                  </TableCell>
                  <TableCell
                    scope="col"
                    className="px-6 py-3 text-center w-1/6"
                  >
                    Description
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Color
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Category
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Price
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Available Stocks
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell scope="col" className="px-6 py-3 w-1/6">
                    User
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Pic
                  </TableCell>
                  <TableCell
                    scope="col"
                    className="px-6 py-3 text-center w-1/6 break-words text-wrap"
                  >
                    Email
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Mobile
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Profession
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Cover Color
                  </TableCell>
                  <TableCell scope="col" className="px-6 py-3 text-center">
                    Admin
                  </TableCell>
                </>
              )}
              <TableCell scope="col" className="px-6 py-3 text-center">
                Action
              </TableCell>
            </TableRow>
            {isOpen && (
              <AddTableData
                pathname={pathname}
                setIsOpen={setIsOpen}
                setIsOpenEdit={setIsOpenEdit}
              />
            )}
          </TableHead>
          <TableBody>
            {products
              .map((product, indexNumber) => {
                if (isOpenEdit == indexNumber) {
                  return (
                    <AddTableData
                      key={product.id}
                      pathname={pathname}
                      setIsOpen={setIsOpen}
                      product={product}
                      setIsOpenEdit={setIsOpenEdit}
                    />
                  )
                }
                return (
                  <TableRow
                    key={product.id}
                    className="bg-white border-b  hover:bg-gray-50 "
                  >
                    <>
                      <TableCell className="w-4 p-4">
                        <div className="flex items-center text-center">
                          {product.id}
                        </div>
                      </TableCell>
                      <TableCell
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {product.name}
                      </TableCell>
                      <TableCell
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap "
                      >
                        {'image' in product ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                          />
                        ) : (
                          <img
                            src={product.profile}
                            alt={product.name}
                            className="inline-flex items-center min-w-10 text-white justify-center h-10 w-10  font-medium tracking-wide  transition duration-200 rounded-full  shadow-md bg-indigo-200 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                          />
                        )}
                      </TableCell>
                      {'desc' in product && (
                        <TableCell className="px-6 py-4 text-center text-wrap">
                          {product.desc}
                        </TableCell>
                      )}
                      {'bgColor' in product ? (
                        <TableCell className="px-6 py-4 text-center">
                          <div
                            className="px-2 py-1 text-white inline-block rounded-full border border-indigo-600"
                            style={{ backgroundColor: product.bgColor }}
                          >
                            {product.bgColor}
                          </div>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell className="px-6 py-4 text-center">
                            {product.email}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-center">
                            {product.mobileNo}
                          </TableCell>
                        </>
                      )}
                      {'category' in product ? (
                        <TableCell className="px-6 py-4 capitalize text-center">
                          {product.category}
                        </TableCell>
                      ) : (
                        <TableCell className="px-6 py-4 capitalize text-center">
                          {product.profession}
                        </TableCell>
                      )}
                      {'price' in product ? (
                        <TableCell className="px-6 py-4 text-center">
                          ${product.price}
                        </TableCell>
                      ) : (
                        <TableCell className="px-6 py-4 justify-center flex items-center">
                          <div
                            className="px-2 py-1 text-white inline-block rounded-full  border border-indigo-600"
                            style={{ backgroundColor: product.coverColor }}
                          >
                            {product.coverColor}
                          </div>
                        </TableCell>
                      )}
                      {'inStock' in product ? (
                        <TableCell className="px-6 py-4 text-center">
                          {product.inStock ? 'Yes' : 'No'}
                        </TableCell>
                      ) : (
                        <TableCell className="px-6 py-4 text-center">
                          {product.isAdmin ? 'Yes' : 'No'}
                        </TableCell>
                      )}

                      <TableCell className="px-6 py-4 text-center ">
                        <div className="flex justify-evenly gap-5">
                          {'price' in product ? (
                            <div
                              // to={`/edit/${product.id}`}
                              onClick={() => setIsOpenEdit(indexNumber)}
                              className="font-medium text-blue-600  hover:underline"
                            >
                              <FaRegEdit className="w-5 h-5 cursor-pointer" />
                            </div>
                          ) : (
                            <div
                              // to={`/profile/${product.id}`}
                              onClick={() => setIsOpenEdit(indexNumber)}
                              className="font-medium text-blue-600  hover:underline"
                            >
                              <FaRegEdit className="w-5 h-5 cursor-pointer" />
                            </div>
                          )}
                          <RiDeleteBin5Line
                            className="h-5 w-5 text-red-400 cursor-pointer"
                            onClick={() => setOpenShowModal(indexNumber)}
                          />
                        </div>
                      </TableCell>
                      <Modal
                        title={'Remove'}
                        massage={`Are you sure Remove ${product?.name} ?`}
                        dangerAction={() => handleDelete(product.id)}
                        dangerOption={'Remove'}
                        showModal={openShowModal === indexNumber}
                        cancelAction={() => setOpenShowModal(-1)}
                      />
                    </>
                  </TableRow>
                )
              })
              .reverse()}
          </TableBody>
        </Table>
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

export default TableComponent
