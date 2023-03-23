export interface Planet {
  id: string
  name: string
  diameter: string
  climate: string
  terrain: string
  population: string
  url: string
  residents: string[]
  rotation_period?: string
  orbital_period?: string
  gravity?: string
  films?: string[]
  surface_water?: string
  edited?: string
  created?: string
}

export interface PlanetsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Planet[]
  page: number
}

export interface PlanetsState {
  planetsByPage: { [page: number]: Planet[] }
  newPlanets: Planet[]
  currentPage: number
  currentPlanet: Planet | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
  count: number
}
