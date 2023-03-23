import { createBrowserRouter } from 'react-router-dom'
// import AddPlanet from '@/pages/AddPlanet'
// import EditPlanet from '@/pages/EditPlanet'
import PlanetDetail from '@/application/pages/PlanetDetail'
import PlanetList from '@/application/pages/PlanetList'
import AddPlanet from '@/application/pages/AddPlanet'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetList />,
  },
  {
    path: '/planets/:id',
    element: <PlanetDetail />,
  },
  {
    path: '/planets/new',
    element: <AddPlanet />,
  },
])

export default router
