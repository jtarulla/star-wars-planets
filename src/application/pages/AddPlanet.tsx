import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Box } from '@mui/material'

import BackHomeButton from '../components/BackHomeButton'
import PlanetForm from '../components/PlanetForm'
import { addPlanet } from '@/infrastructure/store/features/planetSlice'
import { Planet } from '@/domain/models/Planet'

const AddPlanet = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddPlanet = (event: FormEvent, planet: Planet) => {
    dispatch(addPlanet(planet))
    navigate('/')
  }

  return (
    <Container>
      <h1>ADD Planet</h1>
      <BackHomeButton />
      <Box
        sx={{
          borderRadius: '8px',
          padding: '25px',
          backgroundColor: 'white',
        }}
      >
        <PlanetForm onSubmit={handleAddPlanet} />
      </Box>
    </Container>
  )
}

export default AddPlanet
