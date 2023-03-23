import { Resident } from '@/domain/models/Resident'

export function createMockResident(
  overrides: Partial<Resident> = {}
): Resident {
  const defaultResident: Resident = {
    name: 'Sly Moore',
  }

  return { ...defaultResident, ...overrides }
}
