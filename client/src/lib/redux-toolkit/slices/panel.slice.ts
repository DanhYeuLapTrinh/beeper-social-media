import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PanelSize {
  size: number
}

const initialState: PanelSize = {
  size: 50
}

const PanelSlice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    setPanelSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload
    }
  }
})

export const { setPanelSize } = PanelSlice.actions
export default PanelSlice.reducer
