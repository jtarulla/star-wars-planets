import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { ResidentsResponse, ResidentsState } from '@/domain/models/Resident'
import { fetchResidentsAsync } from '@/infrastructure/store/features/residentThunks'

const initialState: ResidentsState = {
  residents: [],
  status: 'idle',
  error: undefined,
}

const residentSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResidentsAsync.pending, (state) => {
        state.status = 'loading'
        state.residents = []
      })
      .addCase(
        fetchResidentsAsync.fulfilled,
        (state, action: PayloadAction<ResidentsResponse>) => {
          state.status = 'idle'
          state.residents = action.payload.residents
        }
      )
      .addCase(
        fetchResidentsAsync.rejected,
        (
          state,
          action: PayloadAction<
            unknown,
            string,
            { rejectedWithValue: boolean },
            SerializedError
          >
        ) => {
          state.status = 'failed'
          state.error = action.error.message
        }
      )
  },
})

export default residentSlice.reducer
