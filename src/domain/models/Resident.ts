export interface Resident {
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: string
  edited: string
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export interface ResidentsResponse {
  residents: Resident[]
}

export interface ResidentsState {
  residents: Resident[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}
