// import React from 'react'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getAllProductsAsync } from '../cartSlice'

const CartList: React.FC = () => {
  const products = useAppSelector((state) => state.products.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllProductsAsync())
  }, [dispatch])

  return (
    <div>
      <h1>Product lists</h1>
      {products?.length > 0 &&
        products?.map((e, i) => <h1 key={i}>{e?.name}</h1>)}
    </div>
  )
}

export default CartList
