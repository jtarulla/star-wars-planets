import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchPlanets, fetchPlanetById } from '@/infrastructure/api/planets'
import { RootState } from '@/infrastructure/store'
import { PlanetsResponse } from '@/domain/models/Planet'

export const fetchPlanetsAsync = createAsyncThunk<
  PlanetsResponse,
  number,
  { state: RootState }
>('planets/fetch', async (page: number, { getState, rejectWithValue }) => {
  const { planetsByPage, newPlanets } = getState().planets

  if (planetsByPage[page]) {
    return {
      results: planetsByPage[page],
      count: newPlanets.length,
      next: null,
      previous: null,
      page,
    }
  }

  try {
    const response = await fetchPlanets(page)
    const results = [...response.results, ...newPlanets]
    return {
      results,
      count: response.count,
      next: response.next,
      previous: response.previous,
      page,
    }
  } catch (error) {
    return rejectWithValue('Error fetching planets')
  }
})

export const fetchPlanetByIdAsync = createAsyncThunk(
  'planets/fetchPlanetById',
  async (planetId: string, { rejectWithValue }) => {
    try {
      const planetResponse = await fetchPlanetById(planetId)

      return planetResponse
    } catch (error) {
      return rejectWithValue(`Error fetching planet id:${planetId}`)
    }
  }
)
