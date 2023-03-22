import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPlanets, fetchPlanetById } from '@/infrastructure/api/planets'
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
