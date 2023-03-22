import { AxiosError } from 'axios'

import apiClient from '@/infrastructure/api'
import { Planet, PlanetsResponse } from '@/domain/models/Planet'
import { handleError } from '@/infrastructure/api/handleError'

const addIdToPlanet = (planet: Planet): Planet => {
  const id = planet.url.match(/\/(\d+)\/$/)?.[1] || ''
  return { ...planet, id }
}

export const fetchPlanets = async (page: number): Promise<PlanetsResponse> => {
  try {
    const response = await apiClient.get(`planets/?page=${page}`)
    const planetsWithId = response.data.results.map(addIdToPlanet)

    return {
      ...response.data,
      results: planetsWithId,
    }
  } catch (error) {
    handleError(error as AxiosError, `Error fetching planets: ${error}`)
    throw error
  }
}

export const fetchPlanetById = async (id: string): Promise<Planet> => {
  try {
    const response = await apiClient.get(`planets/${id}`)
    return response.data
  } catch (error) {
    handleError(
      error as AxiosError,
      `Error fetching planet with id ${id}: ${error}`
    )
    throw error
  }
}
