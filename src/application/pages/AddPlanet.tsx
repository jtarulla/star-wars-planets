import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Grid, Box } from '@mui/material'

import BackHomeButton from '../components/BackHomeButton'
import { addPlanet } from '@/infrastructure/store/features/planetSlice'
import { baseURL } from '@/infrastructure/api'
import { Planet } from '@/domain/models/Planet'

const AddPlanet = () => {
  const [name, setName] = useState('')
  const [terrain, setTerrain] = useState('')
  const [residentsInput, setResidentsInput] = useState('')
  const [climate, setClimate] = useState('')
  const [population, setPopulation] = useState('')
  const [diameter, setDiameter] = useState('')
  const dispatch = useDispatch()
  const id = Date.now().toString()

  const navigate = useNavigate()

  const newPlanet: Planet = {
    id,
    url: `${baseURL}/planets/${id}`,
    name,
    terrain,
    climate,
    population,
    diameter,
    residents: [],
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const residentsArray = residentsInput
      ? residentsInput.split(',').map((resident) => resident.trim())
      : []

    const updatedPlanet = {
      ...newPlanet,
      residents: residentsArray,
    }

    dispatch(addPlanet(updatedPlanet))
    navigate('/')
  }

  return (
    <Container>
      <h1>New Planet</h1>
      <BackHomeButton />
      <Box
        sx={{
          borderRadius: '8px',
          padding: '25px',
          backgroundColor: 'white',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Terrain"
                variant="outlined"
                value={terrain}
                onChange={(e) => setTerrain(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Climate"
                variant="outlined"
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                fullWidth
                label="Population"
                variant="outlined"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                fullWidth
                label="Diameter"
                variant="outlined"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Add residents separated by a comma"
                label="Residents"
                variant="outlined"
                value={residentsInput}
                onChange={(e) => setResidentsInput(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add Planet
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default AddPlanet
