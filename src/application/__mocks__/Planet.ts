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
    residents: [],
    films: [],
    url: 'https://swapi.dev/api/planets/1/',
    created: new Date('2014-12-09T13:50:49.641000Z'),
    edited: new Date('2014-12-20T20:58:18.411000Z'),
    id: '1',
  }

  return { ...defaultPlanet, ...overrides }
}
