import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'
import {
  createFeedbackFormField,
  deleteFeedbackFormField,
  getFeedbackForm,
  updateAllFeedbackFormField,
  updateFeedbackForm,
} from './feedBackFormApi'
import { Field } from './components/FormBuilder'

interface FeedbackFormState {
  status: 'loading' | 'succeeded' | 'failed'
  feedbacksForm: Field[]
  deletedField: Field[]
}

const initialState: FeedbackFormState = {
  status: 'loading',
  feedbacksForm: [],
  deletedField: [],
}

export const getFeedbackFormAsync = createAsyncThunk(
  'feedback/getFeedbackForm',
  async () => {
    const response = await getFeedbackForm()
    return response.data
  },
)

export const createFeedbackFormFieldAsync = createAsyncThunk(
  'feedback/createFeedbackFormField',
  async (feedbackData: Field[]) => {
    const response = await createFeedbackFormField(feedbackData)
    return response
  },
)
export const deleteFeedbackFormFieldLocalAsync = createAsyncThunk(
  'feedback/deleteFeedbackFormFieldLocal',
  async (feedbackData: Field[]) => {
    return feedbackData
  },
)
export const updateAllFeedbackFormFieldAsync = createAsyncThunk(
  'feedback/updateAllFeedbackFormField',
  async ({
    fields,
    deletedField,
  }: {
    fields: Field[]
    deletedField: Field[]
  }) => {
    const response = await updateAllFeedbackFormField(fields, deletedField)
    return response
  },
)

export const updateFeedbackFormAsync = createAsyncThunk(
  'feedback/updateFeedbackForm',
  async (feedbackData: Field) => {
    const response = await updateFeedbackForm(feedbackData)
    return response.data
  },
)

export const deleteFeedbackFormFieldAsync = createAsyncThunk(
  'feedback/deleteFeedbackFormField',
  async (id: string) => {
    const response = await deleteFeedbackFormField(id)
    return response.message
  },
)

export const feedBackFormSlice = createSlice({
  name: 'feedBackForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbackFormAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getFeedbackFormAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacksForm = action.payload
      })
      .addCase(createFeedbackFormFieldAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createFeedbackFormFieldAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacksForm = action.payload
      })
      .addCase(deleteFeedbackFormFieldLocalAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteFeedbackFormFieldLocalAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.deletedField = action.payload
      })
      .addCase(updateAllFeedbackFormFieldAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateAllFeedbackFormFieldAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.feedbacksForm = action.payload
      })
      .addCase(updateFeedbackFormAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateFeedbackFormAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.feedbacksForm.findIndex(
          (feedback) => feedback.id === action.payload.id,
        )
        state.feedbacksForm[index] = action.payload
      })
      .addCase(deleteFeedbackFormFieldAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteFeedbackFormFieldAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.feedbacksForm.findIndex(
          (feedback) => feedback.id === action.payload,
        )
        state.feedbacksForm.splice(index, 1)
      })
  },
})

export const selectFeedbacks = (state: RootState) => state.feedBack.feedbacks

export default feedBackFormSlice.reducer
