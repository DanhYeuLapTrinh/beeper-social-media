import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false
}

const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { setIsLoading } = LoadingSlice.actions
export default LoadingSlice.reducer
