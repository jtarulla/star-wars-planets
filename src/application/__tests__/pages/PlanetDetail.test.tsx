import { render, screen, fireEvent, waitFor, act } from '@/test-utils'
import PlanetDetail from '@/application/pages/PlanetDetail'
import {
  createMockState,
  createMockPlanet,
  createMockResident,
} from '@/application/__mocks__'
import { RootState } from '@/infrastructure/store'

let preloadedState: RootState

describe('PlanetDetail', () => {
  test('renders loading state for planet information', async () => {
    preloadedState = createMockState({ planetStatus: 'loading' })
    render(<PlanetDetail />, { route: '/planets/1', preloadedState })

    await act(async () => {
      expect(screen.getByTestId('planet-detail-loading')).toBeInTheDocument()
    })
  })

  test('renders loading state for residents information', async () => {
    preloadedState = createMockState({
      currentPlanet: createMockPlanet(),
      residentsStatus: 'loading',
    })

    render(<PlanetDetail />, { route: '/planets/1', preloadedState })

    await act(async () => {
      expect(screen.getByTestId('residents-loading')).toBeInTheDocument()
    })
  })

  test('renders planet information when available', async () => {
    const samplePlanet = createMockPlanet()
    preloadedState = createMockState({
      currentPlanet: samplePlanet,
    })

    render(<PlanetDetail />, { route: '/planets/1', preloadedState })

    const planetName = await screen.findByText(`${createMockPlanet().name}`)

    const propertiesToTest = [
      { id: 'population', label: 'Population' },
      { id: 'diameter', label: 'Diameter' },
      { id: 'climate', label: 'Climate' },
      { id: 'terrain', label: 'Terrain' },
    ]

    expect(planetName).toBeInTheDocument()

    propertiesToTest.forEach(({ id, label }) => {
      const element = screen.getByTestId(id)
      expect(element).toHaveTextContent(
        `${label}: ${(samplePlanet as any)[id]}`
      )
    })
  })

  test('renders residents information when available', async () => {
    const samplePlanet = createMockPlanet()
    const sampleResidents = [
      createMockResident(),
      createMockResident({ name: 'Jar Jar Binks' }),
    ]
    preloadedState = createMockState({
      currentPlanet: samplePlanet,
      residents: sampleResidents,
    })

    render(<PlanetDetail />, { route: '/planets/1', preloadedState })

    sampleResidents.forEach(async ({ name }) => {
      const residentName = await screen.findByText(`/${name}/`)

      expect(residentName).toBeInTheDocument()
    })
  })

  test('navigates back to the home page when "Back" button is clicked', async () => {
    render(<PlanetDetail />, { route: '/planets/1' })

    const backButton = screen.getByRole('button')
    fireEvent.click(backButton)

    await waitFor(() => {
      expect(document.location.pathname).toBe('/')
    })
  })
})
