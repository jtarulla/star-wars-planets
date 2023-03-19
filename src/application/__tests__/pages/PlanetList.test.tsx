import { render, screen, fireEvent, act } from '@/test-utils'
import PlanetList from '@/application/pages/PlanetList'
import { createMockPlanet, createMockState } from '@/application/__mocks__'
import { RootState } from '@/infrastructure/store'

let preloadedState: RootState

describe('PlanetList', () => {
  test('renders planets', async () => {
    const mockedPlanets = createMockPlanet()
    preloadedState = createMockState({ planets: [mockedPlanets] })

    render(<PlanetList />, { preloadedState })

    expect(await screen.findByText(mockedPlanets.name)).toBeInTheDocument()
  })

  test('shows loading state while fetching data', async () => {
    const loadingState = createMockState({
      planetStatus: 'loading',
    })

    render(<PlanetList />, { preloadedState: loadingState })

    const skeletons = await screen.findAllByTestId('planet-skeleton')
    expect(skeletons.length).toEqual(10)
  })
})
