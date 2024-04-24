import { RiDeleteBin5Line } from 'react-icons/ri'
import { Product } from '../productApi'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import { deleteProductAsync } from '../productSlice'
import { useAppDispatch } from '../../../app/hooks'
import { addToCartProductAsync } from '../../cart/cartSlice'

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
  return (
    <div className="size-1/4 rounded-lg p-4  relative shadow-md shadow-indigo-100 bg-green-100">
      <div
        // href="#"
        className={`block   ${product.inStock ? '' : 'opacity-50'}`}
      >
        {product?.image && (
          <img
            alt={product?.name}
            src={`data:image/png;base64,${product?.image}`}
            className="h-56 w-full rounded-md object-cover border"
          />
        )}

        <div className="mt-2">
          <div className="flex justify-between">
            <div className="pl-2">
              <dt className="sr-only">Price</dt>
              <dd className="">${product.price}</dd>
            </div>
            <div
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: product.bgColor }}
            ></div>
          </div>

          <div className="mt-6 flex gap-4 flex-col ">
            <h1>{product?.name}</h1>
            <div className="min-h-[3rem] ">{product?.desc}</div>
          </div>
          <div className="flex justify-center items-center py-2">
            {product.inStock && (
              <h1
                className="px-3 py-2 border bg-blue-400 rounded-lg hover:shadow-md cursor-pointer"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </h1>
            )}
          </div>
        </div>
      </div>
      {!product.inStock && (
        <div className="absolute top-28 flex items-center justify-center w-full h-8 border border-red-400 -ml-4 bg-red-400/65 ">
          OUT OF STOCK
        </div>
      )}
      <div className="m-4">
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
    </div>
  )
}

export default ProductCard
