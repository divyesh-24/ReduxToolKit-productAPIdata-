// import React from 'react'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getAllProductsWithPageAsync } from '../productSlice'
import ProductCard from './ProductCard'

const ProductsList: React.FC = () => {
  const products = useAppSelector((state) => state.products.products)
  const totalItems = useAppSelector((s) => s.products.totalItems)
  const totalPages = useAppSelector((s) => s.products.totalPages)
  const [page, setPage] = useState(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProductsWithPageAsync(page))
  }, [dispatch, page])

  return (
    <div className="">
      <div className="min-h-screen  overflow-y-auto bg-gradient-to-br from-indigo-400 to-indigo-100 flex justify-center items-center py-10 sm:py-20">
        <div className="md:px-4  mx-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex flex-col gap-5 md:gap-10 space-y-4 md:space-y-0">
          {products?.length > 0 ? (
            products?.map((e, i) => (
              <ProductCard product={e} key={i} indexNumber={i} />
            ))
          ) : (
            <h1>Error</h1>
          )}
        </div>
      </div>
      <nav className="flex w-[75%] items-center mx-auto -mt-6 md:-mt-10 flex-column flex-wrap md:flex-row justify-between">
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

export default ProductsList
