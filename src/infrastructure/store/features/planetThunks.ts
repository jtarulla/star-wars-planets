import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPlanets } from '@/infrastructure/api/planets'
import { PlanetsResponse } from '@/domain/models/Planet'

export const fetchPlanetsAsync = createAsyncThunk<PlanetsResponse, number>(
  'planets/fetch',
  async (page: number, { rejectWithValue }) => {
    try {
      const planetsResponse = await fetchPlanets(page)

      return planetsResponse
    } catch (error) {
      return rejectWithValue('Error fetching planets')
    }
  }
)
