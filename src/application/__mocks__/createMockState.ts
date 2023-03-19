import { RootState } from '@/infrastructure/store'
import { Planet } from '@/domain/models/Planet'
import { Resident } from '@/domain/models/Resident'

export interface MockStateOptions {
  currentPlanet?: Planet | null
  planetStatus?: 'idle' | 'loading' | 'succeeded' | 'failed'
  planets?: Planet[]
  planetError?: string | null
  planetCount?: number
  residents?: Resident[]
  residentsStatus?: 'idle' | 'loading' | 'succeeded' | 'failed'
  residentsError?: string | null
}

export function createMockState(options: MockStateOptions): RootState {
  return {
    planets: {
      planets: options.planets || [],
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
