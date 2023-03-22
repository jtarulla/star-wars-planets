import { createAsyncThunk } from '@reduxjs/toolkit'

import { ResidentsResponse } from '@/domain/models/Resident'
import { fetchResidents } from '@/infrastructure/api/residents'
import { RootState } from '@/infrastructure/store'

export const fetchResidentsAsync = createAsyncThunk<
  ResidentsResponse,
  void,
  { state: RootState }
>('residents/fetch', async (_, { getState, rejectWithValue }) => {
  try {
    const urls = getState().planets!.currentPlanet!.residents
    const ResidentsResponse = await fetchResidents(urls)

    return ResidentsResponse
  } catch (error) {
    return rejectWithValue(`Error fetching residents:${error}`)
  }
})
