import { Planet } from '@/domain/models/Planet'

interface GetPlanetProps {
  planet: Planet | null
  isApiPlanet: boolean
}

export const getPlanet = (
  id: string,
  newPlanets: Planet[],
  planetsByPage: Record<string, Planet[]>
): GetPlanetProps => {
  for (const planet of newPlanets) {
    if (planet.id === id) {
      return { planet, isApiPlanet: false }
    }
  }

  for (const pageIndex in planetsByPage) {
    const planet = planetsByPage[pageIndex].find((planet) => planet.id === id)
    if (planet) {
      return { planet, isApiPlanet: true }
    }
  }

  return { planet: null, isApiPlanet: false }
}
