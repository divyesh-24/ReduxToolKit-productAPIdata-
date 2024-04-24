import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import {
  Product,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
} from './productApi'

// Define a type for the slice state

interface CounterState {
  status: 'loading' | 'succeeded' | 'failed'
  products: Product[]
  selectedProduct: Product
}

// Define the initial state using that type
const initialState: CounterState = {
  status: 'loading',
  products: [],
  selectedProduct: {} as Product,
}

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (productData: Product) => {
    const response = await createProduct(productData)
    console.log(response)
    return response.data
  },
)

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (productData: Product) => {
    const response = await updateProduct(productData)
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
export const getProductsByIdAsync = createAsyncThunk(
  'product/getProductsById',
  async (id: string) => {
    const response = await getProductsById(id)
    if (response) return response.data
  },
)
export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (id: string) => {
    const response = await deleteProduct(id)
    if (response) return response.message
  },
)

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.products.findIndex(
          (product) => product.id == action.payload.id,
        )
        state.products[index] = action.payload
      })
      .addCase(getAllProductsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload
      })
      .addCase(getProductsByIdAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProductsByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.products.findIndex(
          (item) => item.id === action.payload,
        )
        state.products.splice(index, 1)
      })
  },
})

// export const {} = productSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => {
  state.products.products
}

export default productSlice.reducer
