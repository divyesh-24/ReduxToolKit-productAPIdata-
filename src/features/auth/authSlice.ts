import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
// import { RootState } from '../../app/Store'
import { UserType, createUser, getAllUsers, getUserByEmail } from './authApi'
import { LogInData } from './components/AuthForm'

// Define a type for the slice state

interface AuthState {
  status: 'loading' | 'succeeded' | 'failed'
  users: UserType[]
  user: UserType
  error: SerializedError | string | null
}

// Define the initial state using that type
const initialState: AuthState = {
  status: 'loading',
  users: [],
  user: {} as UserType,
  error: null,
}

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (productData: UserType) => {
    const response = await createUser(productData)
    return response.data
  },
)

export const getAllUsersAsync = createAsyncThunk(
  'auth/getAllUsers',
  async () => {
    const response = await getAllUsers()
    if (response) return response.data
  },
)
export const getUserByEmailAsync = createAsyncThunk(
  'auth/getUserByEmail',
  async (loginData: LogInData) => {
    const response = await getUserByEmail(loginData)
    // if (response.massge) {
    //   throw new Error(response.massge)
    // }
    if (response) return response.data
  },
)
// export const updateCartProductAsync = createAsyncThunk(
//     'product/updateCartProduct',
//     async (productData: CartProduct) => {
//       const response = await updateCartProduct(productData)
//       return response.data
//     },
//   )
// export const deleteCartProductAsync = createAsyncThunk(
//   'product/deleteCartProduct',
//   async (id: string) => {
//     const response = await deleteCartProduct(id)
//     if (response) return response.message
//   },
// )

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users.push(action.payload)
      })

      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getUserByEmailAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUserByEmailAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(getUserByEmailAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })

    //   .addCase(deleteCartProductAsync.pending, (state) => {
    //     state.status = 'loading'
    //   })
    //   .addCase(deleteCartProductAsync.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     const index = state.cartProducts.findIndex(
    //       (item) => item.id === action.payload,
    //     )
    //     state.cartProducts.splice(index, 1)
    //   })
    //   .addCase(updateCartProductAsync.pending, (state) => {
    //     state.status = 'loading'
    //   })
    //   .addCase(updateCartProductAsync.fulfilled, (state, action) => {
    //     state.status = 'succeeded'
    //     const index = state.cartProducts.findIndex(
    //       (product) => product.id == action.payload.id,
    //     )
    //     state.cartProducts[index] = action.payload
    //   })
  },
})

// export const {} = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCart = (state: RootState) => {
//   state.carts.cartProducts
// }

export default authSlice.reducer
