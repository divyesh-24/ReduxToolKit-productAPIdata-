import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import feedBackReducer from '../features/Feedback/feedbackSlice'
import feedBackFormReducer from '../features/Feedback form/feedBackFormSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
    user: userReducer,
    feedBack: feedBackReducer,
    feedBackForm: feedBackFormReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
