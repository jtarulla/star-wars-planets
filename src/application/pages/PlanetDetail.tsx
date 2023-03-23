import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Typography, Box, CircularProgress } from '@mui/material'

import PlanetInfo from '@/application/components/PlanetInfo'
import BackHomeButton from '@/application/components/BackHomeButton'
import { fetchPlanetByIdAsync } from '@/infrastructure/store/features/planetThunks'
import { fetchResidentsAsync } from '@/infrastructure/store/features/residentThunks'
import { setCurrentPlanet } from '@/infrastructure/store/features/planetSlice'
import { RootState, AppDispatch } from '@/infrastructure/store'

const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [isNewPlanet, setIsNewPlanet] = useState(false)
  const {
    currentPlanet: planet,
    status: planetStatus,
    newPlanets,
  } = useSelector((state: RootState) => state.planets)
  const { residents, status: residentsStatus } = useSelector(
    (state: RootState) => state.residents
  )
  const dispatch = useDispatch<AppDispatch>()

  const boxStyles = {
    maxWidth: '800px',
    minWidth: '300px',
    minHeight: '85px',
    borderRadius: '8px',
    color: 'white',
    padding: '10px 12px',
    backgroundColor: 'primary.main',
  }

  useEffect(() => {
    if (id) {
      const newPlanet = newPlanets.find((planet) => planet.id === id)

      if (newPlanet) {
        dispatch(setCurrentPlanet(newPlanet))
        setIsNewPlanet(true)
        return
      }

      dispatch(fetchPlanetByIdAsync(id)).then(() =>
        dispatch(fetchResidentsAsync())
      )
    }
  }, [dispatch])

  return (
    <Container disableGutters maxWidth="lg">
      <BackHomeButton />
      {planetStatus === 'loading' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...boxStyles,
          }}
        >
          <CircularProgress
            data-testid="planet-detail-loading"
            color="inherit"
          />
        </Box>
      ) : (
        planet && (
          <>
            <h1>{planet.name}</h1>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems="center"
              sx={{
                marginBottom: '20px',
                ...boxStyles,
              }}
            >
              <PlanetInfo planet={planet} />
            </Box>
            {planet.residents && planet.residents.length !== 0 && (
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                sx={boxStyles}
              >
                <Typography variant="h4" component="h3">
                  <b>RESIDENTS</b>
                </Typography>

                {residentsStatus === 'loading' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      ...boxStyles,
                    }}
                  >
                    <CircularProgress
                      data-testid="residents-loading"
                      color="inherit"
                    />
                  </Box>
                ) : isNewPlanet ? (
                  planet.residents.map((resident, index) => (
                    <Typography key={index}>{resident}</Typography>
                  ))
                ) : (
                  residents.map((resident, index) => (
                    <Typography key={index}>{resident.name}</Typography>
                  ))
                )}
              </Box>
            )}
          </>
        )
      )}
    </Container>
  )
}

export default PlanetDetail
