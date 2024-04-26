// import React from 'react'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  deleteCartProductAsync,
  getAllCartProductsAsync,
  updateCartProductAsync,
} from '../cartSlice'
import Modal from '../../../components/Modal'
import { CartProduct } from '../cartApi'

const CartList: React.FC = () => {
  const cartProducts = useAppSelector((state) => state.carts.cartProducts)
  const dispatch = useAppDispatch()
  const [openShowModal, setOpenShowModal] = useState(-1)

  const total = cartProducts.reduce(
    (amount, item) => item?.product?.price * item.quantity + amount,
    0,
  )

  const handleDelete = (product1: string | undefined) => {
    dispatch(deleteCartProductAsync(product1 as string))
  }
  const handleQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: CartProduct,
  ) => {
    dispatch(
      updateCartProductAsync({
        ...item,
        quantity: +e.target.value,
      }),
    )
  }

  useEffect(() => {
    dispatch(getAllCartProductsAsync())
  }, [dispatch])

  if (cartProducts.length < 1) {
    return (
      <div className=" min-h-[50vh] flex justify-center items-center">
        ADD ITEM TO CARTS
      </div>
    )
  }
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold   sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {cartProducts.map((cartItem, indexNumber) => (
                  <li className="flex items-center bg-white p-3 rounded-lg shadow-md gap-4" key={indexNumber}>
                    <img
                      src={`data:image/png;base64,${cartItem.product?.image}`}
                      alt=""
                      className="size-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">
                        {cartItem.product.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">${cartItem.product.price}</dd>
                        </div>

                        <div>
                          <dt className="inline">Color:</dt>
                          <dd className="inline">
                            <div
                              className="h-2 w-2 mx-1 inline-block rounded-full"
                              style={{
                                backgroundColor: cartItem.product.bgColor,
                              }}
                            ></div>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div>
                        <label htmlFor="Line1Qty" className="sr-only">
                          {' '}
                          Quantity
                        </label>
                        {/* {cartItem.quantity} */}
                        <div className="text-gray-500">
                          <label
                            htmlFor="Qty"
                            className="inline mx-2 text-sm  leading-6 text-gray-900"
                          >
                            Quantity
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, cartItem)}
                            value={cartItem?.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        {/* <input
                        type="number"
                        min="1"
                        value="1"
                        id="Line1Qty"
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      /> */}
                      </div>

                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => setOpenShowModal(indexNumber)}
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <Modal
                        title={'Remove'}
                        massage={`Are you sure Remove ${cartItem.product?.name} from your cart?`}
                        dangerAction={() => handleDelete(cartItem.id)}
                        dangerOption={'Remove'}
                        showModal={openShowModal === indexNumber}
                        cancelAction={() => setOpenShowModal(-1)}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-900 pt-8">
                <div className="w-screen max-w-lg space-y-4 text-[20px]">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${total}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>charges</dt>
                      <dd>$25</dd>
                    </div>

                    {/* <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-£20</dd>
                    </div> */}

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${total + 25}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-indigo-700 px-5 py-3 text-sm text-white transition hover:bg-indigo-400"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartList
