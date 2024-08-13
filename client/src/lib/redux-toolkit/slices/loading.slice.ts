import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setIsLoading } = LoadingSlice.actions
export default LoadingSlice.reducer
