import { RootState } from '@/infrastructure/store'
import { Planet } from '@/domain/models/Planet'
import { Resident } from '@/domain/models/Resident'

export interface MockStateOptions {
  planetsByPage?: { [page: number]: Planet[] }
  currentPlanet?: Planet | null
  planetStatus?: 'idle' | 'loading' | 'succeeded' | 'failed'
  newPlanets?: Planet[]
  planetError?: string | null
  planetCount?: number
  residents?: Resident[]
  residentsStatus?: 'idle' | 'loading' | 'succeeded' | 'failed'
  residentsError?: string | null
}

export function createMockState(options: MockStateOptions): RootState {
  return {
    planets: {
      newPlanets: options.newPlanets || [],
      planetsByPage: options.planetsByPage || {},
      currentPlanet: options.currentPlanet || null,
      status: options.planetStatus || 'idle',
      error: options.planetError || undefined,
      count: options.planetCount || 0,
    },
    residents: {
      residents: options.residents || [],
      status: options.residentsStatus || 'idle',
      error: options.residentsError || undefined,
    },
  }
}
