export interface Resident {
  name: string
}

export interface ResidentsResponse {
  residents: Resident[]
}

export interface ResidentsState {
  residents: Resident[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}
