import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import { Product, createProduct, getAllProducts } from './cartApi'

// Define a type for the slice state

interface CounterState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  products: Product[]
}

// Define the initial state using that type
const initialState: CounterState = {
  status: 'loading',
  products: [],
}

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (productData: Product) => {
    const response = await createProduct(productData)
    console.log(response)
    return response.data
  },
)
export const getAllProductsAsync = createAsyncThunk(
  'product/getAllProducts',
  async () => {
    const response = await getAllProducts()
    if (response) return response.data
  },
)

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products.push(action.payload)
      })
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
  },
})

// export const {} = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => {
  state.products.products
}

export default cartSlice.reducer
