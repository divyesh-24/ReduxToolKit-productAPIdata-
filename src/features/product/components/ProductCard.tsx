import { RiDeleteBin5Line } from 'react-icons/ri'
import { Product } from '../productApi'
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="size-1/4">
      <div
        // href="#"
        className="block rounded-lg p-4 shadow-md shadow-indigo-100 bg-green-100 "
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
        </div>
        <div className="m-4">
          <div className="flex justify-between">
            <Link to={`/edit/${product.id}`}>
              <FaRegEdit className="h-5 w-5 text-black" />
            </Link>
            <RiDeleteBin5Line className="h-5 w-5 text-black" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
