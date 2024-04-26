import { RiDeleteBin5Line } from 'react-icons/ri'
import { Product } from '../productApi'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from '../../../components/Modal'
import { useEffect, useState } from 'react'
import { deleteProductAsync } from '../productSlice'
import { useAppDispatch } from '../../../app/hooks'
import { addToCartProductAsync } from '../../cart/cartSlice'
import { BiDollar } from 'react-icons/bi'

type Props = {
  product: Product
  indexNumber: number
}

const ProductCard = ({ product, indexNumber }: Props) => {
  const dispatch = useAppDispatch()
  const [openShowModal, setOpenShowModal] = useState(-1)
  const handleDelete = (product1: string | undefined) => {
    dispatch(deleteProductAsync(product1 as string))
  }
  const handleAddToCart = () => {
    const cartProduct = {
      product: { ...product },
      quantity: 1,
    }
    dispatch(addToCartProductAsync(cartProduct))
  }
  useEffect(() => {}, [dispatch])

  return (
    <>
      <div className="max-w-sm relative bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
        <h3 className="mb-3 text-xl font-bold text-indigo-600">
          {product.name ?? 'Beginner Friendly'}
        </h3>
        <div className="relative">
          <img
            className="w-full rounded-xl"
            alt={product?.name}
            src={`data:image/png;base64,${product?.image}`}
          />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            New
          </p>
        </div>
        <h1 className="mt-4 h-20 text-gray-800 text-2xl font-bold cursor-pointer">
          {product.desc ?? 'Javascript Bootcamp for Absolute Beginners'}
        </h1>
        <div className="my-4 ">
          <div className="flex space-x-1 items-center">
            <span>
              <BiDollar className="h-5 w-5 text-indigo-600" />
            </span>
            <p>{product.price}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <div
                className="h-5 w-5 rounded-full border border-indigo-600"
                style={{ backgroundColor: product.bgColor }}
              ></div>
            </span>
            <p>Color</p>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600 mb-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </span>
            <p>Vanilla JS</p>
          </div>
          <div className="mx-4 my-6">
            <div className="flex justify-between">
              <Link to={`/edit/${product.id}`}>
                <FaRegEdit className="h-5 w-5 text-black" />
              </Link>
              <RiDeleteBin5Line
                className="h-5 w-5 text-black cursor-pointer"
                onClick={() => setOpenShowModal(indexNumber)}
              />
            </div>
            <Modal
              title={'Remove'}
              massage={`Are you sure Remove ${product?.name} ?`}
              dangerAction={() => handleDelete(product.id)}
              dangerOption={'Remove'}
              showModal={openShowModal === indexNumber}
              cancelAction={() => setOpenShowModal(-1)}
            />
          </div>

          {!product.inStock && (
            <div className="absolute top-36 left-4 flex items-center justify-center w-full h-14 border border-red-400 -ml-4  bg-red-400/65 ">
              OUT OF STOCK
            </div>
          )}
        </div>
        {product.inStock && (
          <button
            className="mt-4 relative bottom-4 text-xl w-full mx-auto text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </>
  )
}

export default ProductCard
