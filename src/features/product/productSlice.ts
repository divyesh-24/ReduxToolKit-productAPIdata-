import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import {
  Product,
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsWithPage,
  getProductsById,
  updateProduct,
} from './productApi'

// Define a type for the slice state

interface CounterState {
  status: 'loading' | 'succeeded' | 'failed'
  products: Product[]
  AllProducts: Product[]
  totalPages: number
  totalItems: number
  // {
  //   data: Product[]
  //   first: number
  //   items: number
  //   last: number
  //   next: number | null
  //   pages: number
  //   prev: number | null
  // }
  selectedProduct: Product
}

// Define the initial state using that type
const initialState: CounterState = {
  status: 'loading',
  products: [],
  AllProducts: [],
  totalPages: 0,
  totalItems: 0,
  // {
  //   data: [],
  //   first: 1,
  //   items: 10,
  //   last: 5,
  //   next: 2,
  //   pages: 5,
  //   prev: null,
  // },
  selectedProduct: {} as Product,
}

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (productData: Product) => {
    const response = await createProduct(productData)
    return response.data
  },
)

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (productData: Product) => {
    const response = await updateProduct(productData)
    return response.data
  },
)
export const getAllProductsAsync = createAsyncThunk(
  'product/getAllProducts',
  async () => {
    const response = await getAllProducts()
    return response.data
  },
)
export const getAllProductsWithPageAsync = createAsyncThunk(
  'product/getAllProductsWithPage',
  async (page: number) => {
    const response = await getAllProductsWithPage(page)
    if (response) return response
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
    if (response) return response
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
        state.products.unshift(action.payload)
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
        state.AllProducts = action.payload
      })
      .addCase(getAllProductsWithPageAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllProductsWithPageAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload?.data
        state.totalItems = action.payload?.totalItems
        state.totalPages = action.payload?.totalPages
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
          (item) => item.id === action.payload?.id,
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
