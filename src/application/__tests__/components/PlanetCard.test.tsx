import '@testing-library/jest-dom'

import { render, screen } from '@/test-utils'
import PlanetCard from '@/application/components/PlanetCard'
import { createMockPlanet } from '@/application/__mocks__/createMockPlanet'

describe('PlanetCard', () => {
  test('renders planet name, population, climate, and terrain', () => {
    const samplePlanet = createMockPlanet()

    render(<PlanetCard planet={samplePlanet} />)

    const propertiesToTest = [
      { id: 'population', label: 'Population' },
      { id: 'diameter', label: 'Diameter' },
      { id: 'climate', label: 'Climate' },
      { id: 'terrain', label: 'Terrain' },
    ]

    propertiesToTest.forEach(({ id, label }) => {
      const element = screen.getByTestId(id)
      expect(element).toHaveTextContent(
        `${label}: ${(samplePlanet as any)[id]}`
      )
    })
  })
})
