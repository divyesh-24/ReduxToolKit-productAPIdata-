import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
// import { RootState } from '../../app/Store'
import {
  UserType,
  checkUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  logoutUser,
  updateUserData,
} from './authApi'
import { LogInData } from './components/AuthForm'

// Define a type for the slice state

interface AuthState {
  status: 'loading' | 'succeeded' | 'failed'
  users: UserType[]
  user: UserType
  error: SerializedError | string | null
  userChecked: boolean
  totalPages: number
  totalItems: number
}

// Define the initial state using that type
const initialState: AuthState = {
  status: 'loading',
  users: [],
  totalPages: 0,
  totalItems: 0,
  user: {} as UserType,
  error: null,
  userChecked: false,
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
  async (page: number) => {
    const response = await getAllUsers(page)
    if (response) return response
  },
)
export const checkUserAsync = createAsyncThunk('auth/checkUsers', async () => {
  const response = await checkUser()
  if (response) return response.data
})
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
export const logoutUserAsync = createAsyncThunk('auth/logoutUser', async () => {
  const response = await logoutUser()
  if (response) return response.data
})
export const updateUserDataAsync = createAsyncThunk(
  'auth/updateUserData',
  async (userData: UserType) => {
    const response = await updateUserData(userData)
    return response.data
  },
)
export const deleteUserAsync = createAsyncThunk(
  'auth/deleteUser',
  async (id: string) => {
    const response = await deleteUser(id)
    if (response) return response
  },
)

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
        state.users.unshift(action.payload)
      })

      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload?.data
        state.totalItems = action.payload?.totalItems
        state.totalPages = action.payload?.totalPages
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userChecked = true
        state.user = action.payload
      })
      .addCase(checkUserAsync.rejected, (state) => {
        state.status = 'succeeded'
        state.userChecked = true
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
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.status = 'succeeded'
        state.userChecked = false
        state.user = {} as UserType
      })

      .addCase(deleteUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.users.findIndex(
          (item) => item.id === action.payload?.id,
        )
        state.users.splice(index, 1)
      })
      .addCase(updateUserDataAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.users.findIndex(
          (product) => product.id == action.payload.id,
        )
        state.users[index] = action.payload
        // state.user = action.payload
      })
  },
})

// export const {} = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCart = (state: RootState) => {
//   state.carts.cartProducts
// }

export default authSlice.reducer
