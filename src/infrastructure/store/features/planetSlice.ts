import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { PlanetsResponse, Planet, PlanetsState } from '@/domain/models/Planet'
import {
  fetchPlanetsAsync,
  fetchPlanetByIdAsync,
} from '@/infrastructure/store/features/planetThunks'
import { loadState } from '@/infrastructure/store/localStorage'

interface EditPlanetPayload {
  planet: Planet
  isApiPlanet: boolean
}

const initialState: PlanetsState = {
  planetsByPage: {},
  newPlanets: loadState()?.planets || [],
  currentPlanet: null,
  status: 'idle',
  error: undefined,
  count: 0,
  currentPage: 1,
}

export const planetSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    addPlanet: (state, action: PayloadAction<Planet>) => {
      const { name } = action.payload
      state.newPlanets.push(action.payload)
      toast.success(`Planet ${name} has been added successfully`)
    },
    setCurrentPlanet: (state, action: PayloadAction<Planet>) => {
      state.currentPlanet = action.payload
    },
    editPlanet: (state, action: PayloadAction<EditPlanetPayload>) => {
      const { isApiPlanet, planet } = action.payload

      if (!isApiPlanet) {
        const planetIndex = state.newPlanets.findIndex(
          (newPlanet) => newPlanet.id === planet.id
        )
        if (planetIndex !== -1) {
          state.newPlanets[planetIndex] = planet
        }
      } else {
        const page = state.currentPage
        const planetIndex = state.planetsByPage[page].findIndex(
          (p) => p.id === planet.id
        )

        if (planetIndex !== -1) {
          state.planetsByPage[page][planetIndex] = planet
        }
      }
      toast.success(`Planet ${planet.name} has been updated successfully`)
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
          state.currentPage = action.payload.page
          state.planetsByPage[action.payload.page] = action.payload.results
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

export const { addPlanet, setCurrentPlanet, editPlanet } = planetSlice.actions

export default planetSlice.reducer
