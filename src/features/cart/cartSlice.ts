import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import {
  CartProduct,
  addToCartProduct,
  deleteCartProduct,
  getAllCartProducts,
  updateCartProduct,
} from './cartApi'

// Define a type for the slice state

interface CounterState {
  status: 'loading' | 'succeeded' | 'failed'
  cartProducts: CartProduct[]
}

// Define the initial state using that type
const initialState: CounterState = {
  status: 'loading',
  cartProducts: [],
}

export const addToCartProductAsync = createAsyncThunk(
  'product/addToCartProduct',
  async (productData: CartProduct) => {
    const response = await addToCartProduct(productData)
    console.log(response)
    return response.data
  },
)

export const updateCartProductAsync = createAsyncThunk(
  'product/updateCartProduct',
  async (productData: CartProduct) => {
    const response = await updateCartProduct(productData)
    return response.data
  },
)
export const getAllCartProductsAsync = createAsyncThunk(
  'product/getAllCartProducts',
  async () => {
    const response = await getAllCartProducts()
    if (response) return response.data
  },
)
export const deleteCartProductAsync = createAsyncThunk(
  'product/deleteCartProduct',
  async (id: string) => {
    const response = await deleteCartProduct(id)
    if (response) return response.message
  },
)

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addToCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts.push(action.payload)
      })
      .addCase(updateCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.cartProducts.findIndex(
          (product) => product.id == action.payload.id,
        )
        state.cartProducts[index] = action.payload
      })
      .addCase(getAllCartProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllCartProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts = action.payload
      })
      .addCase(deleteCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.cartProducts.findIndex(
          (item) => item.id === action.payload,
        )
        state.cartProducts.splice(index, 1)
      })
  },
})

// export const {} = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => {
  state.carts.cartProducts
}


export default cartSlice.reducer
