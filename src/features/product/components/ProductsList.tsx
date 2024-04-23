// import React from 'react'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getAllProductsAsync } from '../productSlice'
import ProductCard from './ProductCard'

const ProductsList: React.FC = () => {
  const products = useAppSelector((state) => state.products.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [dispatch])

  return (
    <div className="m-6">
      <h1>Product lists</h1>
      <div className='flex gap-5 '>
        {products?.length > 0 ? (
          products?.map((e, i) => (
            <ProductCard product={e} key={i} />
            // <div
            //   key={i}
            //   className={`border size-2/12 min-h-32 p-3 `}
            //   style={{ backgroundColor: e.bgColor }}
            // >
            //   <h1>{e?.name}</h1>
            //   <h1>{e?.desc}</h1>
            //   <img src={`data:image/png;base64,${e.image}`} alt={e?.name} />
            //   <h1>${e?.price}</h1>
            // </div>
          ))
        ) : (
          <h1>Error</h1>
        )}
      </div>
    </div>
  )
}

export default ProductsList
