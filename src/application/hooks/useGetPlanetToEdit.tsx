import { useMemo } from 'react'
import { getPlanetToEdit } from '@/application/helpers/planetHelpers'
import { Planet } from '@/domain/models/Planet'

interface UseGetPlanetToEditOptions {
  id: string | undefined
  newPlanets: Planet[]
  planetsByPage: Record<string, Planet[]>
}

export const useGetPlanetToEdit = ({
  id,
  newPlanets,
  planetsByPage,
}: UseGetPlanetToEditOptions) => {
  const { planet, isApiPlanet } = useMemo(() => {
    return id
      ? getPlanetToEdit(id, newPlanets, planetsByPage)
      : { planet: null, isApiPlanet: false }
  }, [id, newPlanets, planetsByPage])

  return { planet, isApiPlanet }
}
