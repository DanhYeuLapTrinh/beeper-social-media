import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PasswordState {
  successfulCreation: boolean
  successfulFirstFactor: boolean
}

const initialState: PasswordState = {
  successfulCreation: false,
  successfulFirstFactor: false
}

const PasswordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setSuccessfulCreation: (state, action: PayloadAction<boolean>) => {
      state.successfulCreation = action.payload
    },
    setSuccessfulFirstFactor: (state, action: PayloadAction<boolean>) => {
      state.successfulFirstFactor = action.payload
    }
  }
})

export const { setSuccessfulCreation, setSuccessfulFirstFactor } = PasswordSlice.actions
export default PasswordSlice.reducer
