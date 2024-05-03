import { Product } from '../productApi'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addToCartProductAsync,
  addToCartProductLocalAsync,
} from '../../cart/cartSlice'
import { BiDollar } from 'react-icons/bi'
//@ts-expect-error hash password from backend
import * as jwt from 'jsonwebtoken'

type Props = {
  product: Product
  indexNumber: number
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const cartItems = useAppSelector((s) => s.carts.cartProducts)
  // const [openShowModal, setOpenShowModal] = useState(-1)
  // const handleDelete = (product1: string | undefined) => {
  //   dispatch(deleteProductAsync(product1 as string))
  // }
  const handleAddToCart = () => {
    const cartProduct = {
      product: { ...product },
      quantity: 1,
    }
    if (Object.keys(user).length == 0) {
      const token = jwt.sign({ ...cartItems, cartProduct }, 'your-secret-key', {
        expiresIn: '1h',
      })
      localStorage.setItem('Cart', token)
      dispatch(addToCartProductLocalAsync(cartProduct))
    } else {
      dispatch(addToCartProductAsync({ ...cartProduct, userId: user.id }))
    }
  }
  useEffect(() => {}, [dispatch])

  return (
    <div className="md:max-w-sm mx-6  flex flex-col justify-between sm:mx-0 relative bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform lg:hover:scale-105 transition duration-500">
      <h3 className="mb-3 sm:text-xl font-bold text-indigo-600">
        {product.name ?? 'Beginner Friendly'}
      </h3>
      <div className="flex gap-5">
        <div className="relative w-[50%] sm:w-full sm:h-48 aspect-video ">
          <img
            className="w-full h-full rounded-xl"
            alt={product?.name}
            src={`${product?.image}`}
          />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 sm:font-semibold py-0.5 px-1.5 text-[12px] sm:py-1 sm:px-3 rounded-br-lg rounded-tl-lg">
            New
          </p>
        </div>
        <div className="sm:hidden my-2 text-[12px] flex flex-col justify-between  gap-1">
          <div className="flex space-x-1 items-center">
            <span>
              <BiDollar className="h-5 w-5 text-indigo-600" />
            </span>
            <p>{product.price}</p>
          </div>
          <div className="flex space-x-1 items-center justify-start">
            <span>
              <div
                className="h-5 w-5 rounded-full border border-indigo-600"
                style={{ backgroundColor: product.bgColor }}
              ></div>
            </span>
            <p>Color</p>
          </div>
          <div className="flex space-x-1 items-center justify-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
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
            <p className="capitalize">{product.category}</p>
          </div>

          {!product.inStock && (
            <div className="absolute font-extrabold top-20 h-10 sm:top-36 left-4 flex items-center justify-center w-full sm:h-14 border border-red-400 -ml-4  bg-red-400/85 ">
              OUT OF STOCK
            </div>
          )}
        </div>
      </div>

      <h1 className="mt-3 mb-1.5 h-8 sm:mt-4 md:h-14 lg:h-20 text-gray-800 text-[12px] lg:text-[20px] xl:text-2xl font-bold cursor-pointer">
        {product.desc ?? 'Javascript Bootcamp for Absolute Beginners'}
      </h1>
      <div className="hidden sm:block md:flex md:justify-between md:items-center md:flex-wrap mb-4 px-1.5">
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
              className="h-6 w-6 text-indigo-600 "
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
          <p className="capitalize">{product.category}</p>
        </div>

        {!product.inStock && (
          <div className="absolute top-36 left-4 flex items-center justify-center w-full h-14 border border-red-400 -ml-4  bg-red-400/65 ">
            OUT OF STOCK
          </div>
        )}
      </div>
      {product.inStock ? (
        <button
          className="mt-4  relative bottom-4 text-xl w-full mx-auto text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="mt-4  relative bottom-4 text-xl w-full mx-auto text-transparent py-2 ">
          ADD TO CART
        </div>
      )}
    </div>
  )
}

export default ProductCard
