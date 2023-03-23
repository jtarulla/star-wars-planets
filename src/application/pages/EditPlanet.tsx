import { FormEvent, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Box } from '@mui/material'
import { toast } from 'react-toastify'

import BackHomeButton from '@/application/components/BackHomeButton'
import PlanetForm from '@/application/components/PlanetForm'
import { editPlanet } from '@/infrastructure/store/features/planetSlice'
import { useGetPlanetToEdit } from '@/application/hooks/useGetPlanetToEdit'
import { RootState } from '@/infrastructure/store'
import { Planet } from '@/domain/models/Planet'

const EditPlanet = () => {
  const { id } = useParams<{ id: string }>()
  const { newPlanets, planetsByPage } = useSelector(
    (state: RootState) => state.planets
  )
  const { planet, isApiPlanet } = useGetPlanetToEdit({
    id,
    newPlanets,
    planetsByPage,
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!planet) {
      toast.error('Planet edit page not found')
      navigate('/')
    }
  }, [planet, navigate])

  const handleEditPlanet = (e: FormEvent, updatedPlanet: Planet) => {
    e.preventDefault()

    if (planet) {
      dispatch(editPlanet({ planet: updatedPlanet, isApiPlanet }))
      navigate('/')
    }
  }

  return (
    <Container>
      <h1>Edit Planet</h1>
      <BackHomeButton />
      <Box
        sx={{
          borderRadius: '8px',
          padding: '25px',
          backgroundColor: 'white',
        }}
      >
        {planet && (
          <PlanetForm
            defaultValues={planet}
            onSubmit={(e, updatedPlanet) => handleEditPlanet(e, updatedPlanet)}
          />
        )}
      </Box>
    </Container>
  )
}

export default EditPlanet
