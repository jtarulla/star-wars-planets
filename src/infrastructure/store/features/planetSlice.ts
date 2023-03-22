import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { PlanetsResponse, Planet, PlanetsState } from '@/domain/models/Planet'
import {
  fetchPlanetsAsync,
  fetchPlanetByIdAsync,
} from '@/infrastructure/store/features/planetThunks'

const initialState: PlanetsState = {
  planets: [],
  currentPlanet: null,
  status: 'idle',
  error: undefined,
  count: 0,
}

export const planetSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    addPlanet: (state, action: PayloadAction<Planet>) => {
      state.planets.push(action.payload)
    },
    editPlanet: (state, action: PayloadAction<Planet>) => {
      const index = state.planets.findIndex(
        (planet) => planet.id === action.payload.id
      )
      if (index !== -1) {
        state.planets[index] = action.payload
      }
    },
    removePlanet: (state, action: PayloadAction<string>) => {
      state.planets = state.planets.filter(
        (planet) => planet.id !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanetsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchPlanetsAsync.fulfilled,
        (state, action: PayloadAction<PlanetsResponse>) => {
          state.status = 'succeeded'
          state.planets = action.payload.results
          state.count = action.payload.count
          state.error = undefined
        }
      )
      .addCase(
        fetchPlanetsAsync.rejected,
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
      .addCase(fetchPlanetByIdAsync.pending, (state) => {
        state.status = 'loading'
        state.currentPlanet = null
      })
      .addCase(
        fetchPlanetByIdAsync.fulfilled,
        (state, action: PayloadAction<Planet>) => {
          state.status = 'succeeded'
          state.currentPlanet = action.payload
          state.error = undefined
        }
      )
      .addCase(fetchPlanetByIdAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { addPlanet, editPlanet, removePlanet } = planetSlice.actions

export default planetSlice.reducer
