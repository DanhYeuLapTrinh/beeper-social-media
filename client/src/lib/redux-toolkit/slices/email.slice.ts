import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EmailState {
  successfulCreation: boolean
}

const initialState: EmailState = {
  successfulCreation: false
}

const EmailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSuccessfulCreation: (state, action: PayloadAction<boolean>) => {
      state.successfulCreation = action.payload
    }
  }
})

export const { setSuccessfulCreation } = EmailSlice.actions
export default EmailSlice.reducer
