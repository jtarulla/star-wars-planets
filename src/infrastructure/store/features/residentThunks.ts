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
    const currentPlanet = getState().planets.currentPlanet

    if (!currentPlanet) {
      throw new Error('No current planet selected')
    }

    const urls = currentPlanet.residents
    const ResidentsResponse = urls && (await fetchResidents(urls))

    return ResidentsResponse
  } catch (error) {
    return rejectWithValue(`Error fetching residents:${error}`)
  }
})
