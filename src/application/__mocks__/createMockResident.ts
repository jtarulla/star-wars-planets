import { Resident } from '@/domain/models/Resident'

export function createMockResident(
  overrides: Partial<Resident> = {}
): Resident {
  const defaultResident: Resident = {
    name: 'Sly Moore',
    birth_year: 'unknown',
    eye_color: 'white',
    films: ['https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/'],
    gender: 'female',
    hair_color: 'none',
    height: '178',
    homeworld: 'https://swapi.dev/api/planets/60/',
    mass: '48',
    skin_color: 'pale',
    created: '2014-12-20T20:18:37.619000Z',
    edited: '2014-12-20T21:17:50.496000Z',
    species: [],
    starships: [],
    url: 'https://swapi.dev/api/people/1/',
    vehicles: [],
  }

  return { ...defaultResident, ...overrides }
}
