import { createBrowserRouter } from 'react-router-dom'
import PlanetList from '@/application/pages/PlanetList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PlanetList />,
  },
])

export default router
