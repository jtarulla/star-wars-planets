import { Planet } from '@/domain/models/Planet'

export function createMockPlanet(overrides: Partial<Planet> = {}): Planet {
  const defaultPlanet: Planet = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
    films: [],
    url: 'https://swapi.dev/api/planets/1/',
    created: '2014-12-09T13:50:49.641000Z',
    edited: '2014-12-20T20:58:18.411000Z',
    id: '1',
  }

  return { ...defaultPlanet, ...overrides }
}
