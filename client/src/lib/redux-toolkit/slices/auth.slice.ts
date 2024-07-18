import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  currentStep: number
}

const initialState: AuthState = {
  currentStep: 1
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep += action.payload
    }
  }
})

export const { goToStep } = AuthSlice.actions
export default AuthSlice.reducer
