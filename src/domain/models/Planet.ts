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
  edited: Date
  created: Date
  url: string
}

export interface PlanetsResponse {
  count: number
  next: string | null
  previous: string | null
  results: Planet[]
}
