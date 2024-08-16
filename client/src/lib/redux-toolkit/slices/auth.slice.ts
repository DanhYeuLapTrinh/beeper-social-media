import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  currentStep: number
  state: 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword' | 'otpVerification'
  successfulCreation: boolean
  successfulFirstFactor: boolean
}

const initialState: AuthState = {
  currentStep: 1,
  state: 'signIn',
  successfulCreation: false,
  successfulFirstFactor: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    setState: (state, action: PayloadAction<AuthState['state']>) => {
      state.state = action.payload
    },
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep += action.payload
    },
    setSuccessfulCreation: (state, action: PayloadAction<boolean>) => {
      state.successfulCreation = action.payload
    },
    setSuccessfulFirstFactor: (state, action: PayloadAction<boolean>) => {
      state.successfulFirstFactor = action.payload
    }
  }
})

export const { setCurrentStep, goToStep, setState, setSuccessfulCreation, setSuccessfulFirstFactor } = AuthSlice.actions
export default AuthSlice.reducer
