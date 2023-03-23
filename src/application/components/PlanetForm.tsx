import { FormEvent, useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'

import { baseURL } from '@/infrastructure/api'
import { Planet } from '@/domain/models/Planet'

interface PlanetFormProps {
  onSubmit: (event: FormEvent, planet: Planet) => void
  defaultValues?: Planet
}

const PlanetForm = ({ onSubmit, defaultValues }: PlanetFormProps) => {
  const [name, setName] = useState(defaultValues?.name || '')
  const [terrain, setTerrain] = useState(defaultValues?.terrain || '')
  const [residentsInput, setResidentsInput] = useState(
    defaultValues?.residents.join(', ') || ''
  )
  const [climate, setClimate] = useState(defaultValues?.climate || '')
  const [population, setPopulation] = useState(defaultValues?.population || '')
  const [diameter, setDiameter] = useState(defaultValues?.diameter || '')
  const id = defaultValues?.id || Date.now().toString()
  const url = defaultValues?.url || `${baseURL}/planets/${id}`

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const residentsArray = residentsInput
      ? residentsInput.split(',').map((resident) => resident.trim())
      : []

    const planet: Planet = {
      id,
      url,
      name,
      terrain,
      climate,
      population,
      diameter,
      residents: residentsArray,
    }

    onSubmit(event, planet)
  }

  return (
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
  )
}

export default PlanetForm
