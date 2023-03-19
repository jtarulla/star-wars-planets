export interface Planet {
  name: string
  id: string
  rotation_period: string
  orbital_period: string
  climate: string
  diameter: string
  gravity: string
  terrain: string
  population: string
  films: string[]
  residents: string[]
  surface_water: string
  edited: string
  created: string
  url: string
}

export interface PlanetsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Planet[]
}

export interface PlanetsState {
  planets: Planet[]
  currentPlanet: Planet | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
  count: number
}
