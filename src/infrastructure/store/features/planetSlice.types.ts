import { Planet } from '@/domain/models/Planet'

export interface EditPlanetPayload {
  planet: Planet
  isApiPlanet: boolean
}

export interface DeletePlanetPayload {
  name: string
  id: string
  isApiPlanet: boolean
}
