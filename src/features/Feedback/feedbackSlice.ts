import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  getFeedbacksByUser,
  updateFeedback,
} from './feedbackApi'
import { DynamicFormProps } from './components/DynamicForm'

export interface Feedback extends DynamicFormProps {}

interface FeedbackState {
  status: 'loading' | 'succeeded' | 'failed'
  feedbacks: Feedback[]
  feedbacksAdmin: Feedback[]
  totalPages: number
  totalItems: number
}

const initialState: FeedbackState = {
  status: 'loading',
  feedbacks: [],
  feedbacksAdmin: [],
  totalPages: 0,
  totalItems: 0,
}

export const getFeedbacksByUserAsync = createAsyncThunk(
  'feedback/getFeedbacksByUser',
  async ({ id }: { id: string }) => {
    const response = await getFeedbacksByUser(id)
    return response
  },
)
export const getFeedbacksAsync = createAsyncThunk(
  'feedback/getFeedbacks',
  async () => {
    const response = await getFeedbacks()
    return response.data
  },
)

export const createFeedbackAsync = createAsyncThunk(
  'feedback/createFeedback',
  async (feedbackData: Feedback) => {
    const response = await createFeedback(feedbackData)
    return response.data
  },
)

export const updateFeedbackAsync = createAsyncThunk(
  'feedback/updateFeedback',
  async (feedbackData: Feedback) => {
    const response = await updateFeedback(feedbackData)
    return response.data
  },
)

export const deleteFeedbackAsync = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id: string) => {
    const response = await deleteFeedback(id)
    return response.message
  },
)

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbacksByUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFeedbacksByUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacks = action.payload.data
      })
      .addCase(getFeedbacksAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFeedbacksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacksAdmin = action.payload
      })
      .addCase(createFeedbackAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacks.push(action.payload)
      })
      .addCase(updateFeedbackAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.feedbacks.findIndex(
          (feedback) => feedback.id === action.payload.id,
        )
        state.feedbacks[index] = action.payload
      })
      .addCase(deleteFeedbackAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.feedbacks.findIndex(
          (feedback) => feedback.id === action.payload,
        )
        state.feedbacks.splice(index, 1)
      })
  },
})

export const selectFeedbacks = (state: RootState) => state.feedBack.feedbacks

export default feedbackSlice.reducer
