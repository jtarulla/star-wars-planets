import { createBrowserRouter } from 'react-router-dom'
import PlanetList from '@/application/pages/PlanetList'
import PlanetDetail from '@/application/pages/PlanetDetail'
import AddPlanet from '@/application/pages/AddPlanet'
import EditPlanet from '@/application/pages/EditPlanet'

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
    path: '/planets/:id/edit',
    element: <EditPlanet />,
  },
  {
    path: '/planets/new',
    element: <AddPlanet />,
  },
])

export default router
