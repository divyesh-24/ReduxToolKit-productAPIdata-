import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
//@ts-expect-error hash password from backend
import * as jwt from 'jsonwebtoken'
import {
  CartProduct,
  addToCartProduct,
  deleteAllCartProducts,
  deleteCartProduct,
  getCartProductsByUser,
  syncToCartProduct,
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

export const addToCartProductLocalAsync = createAsyncThunk(
  'product/addToCartLocalProduct',
  (productData: CartProduct) => {
    return productData
  },
)
export const CheckCartProductAsync = createAsyncThunk(
  'product/CheckCartProduct',
  async () => {
    const localCart = localStorage.getItem('Cart')
    const decoded = await jwt.verify(localCart, 'your-secret-key')
    delete decoded.exp
    delete decoded.iat
    const data = Object.values(decoded)
    return data
  },
)
export const addToCartProductAsync = createAsyncThunk(
  'product/addToCartProduct',
  async (productData: CartProduct) => {
    const response = await addToCartProduct(productData)
    return response.data
  },
)
export const syncToCartProductAsync = createAsyncThunk(
  'product/syncToCartProduct',
  async (productData: { cart: CartProduct[]; userId: string }) => {
    const response = await syncToCartProduct(
      productData.cart,
      productData.userId,
    )
    console.log(response)

    return response ?? 'empty'
  },
)

export const updateCartProductAsync = createAsyncThunk(
  'product/updateCartProduct',
  async (productData: CartProduct) => {
    const response = await updateCartProduct(productData)
    return response.data
  },
)
export const updateCartProductLocalAsync = createAsyncThunk(
  'product/updateCartProductLocal',
  async (product: { productData: CartProduct; index: number }) => {
    return product
  },
)
export const getCartProductsByUserAsync = createAsyncThunk(
  'product/getCartProductsByUser',
  async (id: string) => {
    const response = await getCartProductsByUser(id)
    if (response) return response.data
  },
)
export const deleteAllCartProductsAsync = createAsyncThunk(
  'product/deleteAllCartProducts',
  async (productData: CartProduct[]) => {
    const response = await deleteAllCartProducts(productData)
    if (response) return response.message
  },
)
export const deleteCartProductAsync = createAsyncThunk(
  'product/deleteCartProduct',
  async (id: string) => {
    const response = await deleteCartProduct(id)
    if (response) return response.message
  },
)
export const deleteCartProductLocalAsync = createAsyncThunk(
  'product/deleteCartProductLocal',
  (id: number) => {
    return id
  },
)
export const ClearCartProductLocalAsync = createAsyncThunk(
  'product/ClearCartProductLocal',
  () => {
    return []
  },
)

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CheckCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(CheckCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // state.cartProducts.push(action.payload)
        if (action.payload) {
          action.payload.map((e) => {
            state.cartProducts.push(e as CartProduct)
          })
        }
      })
      .addCase(addToCartProductLocalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addToCartProductLocalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts.push(action.payload)
      })
      .addCase(addToCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addToCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts.push(action.payload)
      })
      .addCase(syncToCartProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(syncToCartProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload !== 'empty') {
          state.cartProducts = action.payload
        }
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
      .addCase(updateCartProductLocalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateCartProductLocalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.cartProducts.findIndex(
          (_, index) => index == action.payload.index,
        )
        state.cartProducts[index] = action.payload.productData
      })
      .addCase(getCartProductsByUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCartProductsByUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts = action.payload
      })
      .addCase(deleteAllCartProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteAllCartProductsAsync.fulfilled, (state) => {
        state.status = 'succeeded'
        state.cartProducts = []
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
      .addCase(deleteCartProductLocalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteCartProductLocalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.cartProducts.findIndex(
          (_, index) => index === action.payload,
        )
        state.cartProducts.splice(index, 1)
        const token = jwt.sign({ ...state.cartProducts }, 'your-secret-key', {
          expiresIn: '1h',
        })
        localStorage.setItem('Cart', token)
      })
      .addCase(ClearCartProductLocalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(ClearCartProductLocalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cartProducts = action.payload
      })
  },
})

// export const {} = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => {
  state.carts.cartProducts
}

export default cartSlice.reducer
