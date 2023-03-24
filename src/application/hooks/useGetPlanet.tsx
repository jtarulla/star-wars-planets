import { useMemo } from 'react'
import { getPlanet } from '@/application/helpers/planetHelpers'
import { Planet } from '@/domain/models/Planet'

interface UseGetPlanetOptions {
  id: string | undefined
  newPlanets: Planet[]
  planetsByPage: Record<string, Planet[]>
}

export const useGetPlanet = ({
  id,
  newPlanets,
  planetsByPage,
}: UseGetPlanetOptions) => {
  const { planet, isApiPlanet } = useMemo(() => {
    return id
      ? getPlanet(id, newPlanets, planetsByPage)
      : { planet: null, isApiPlanet: false }
  }, [id, newPlanets, planetsByPage])

  return { planet, isApiPlanet }
}
