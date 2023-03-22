import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import PlanetInfo from '@/application/components/PlanetInfo'
import { fetchPlanetByIdAsync } from '@/infrastructure/store/features/planetThunks'
import { fetchResidentsAsync } from '@/infrastructure/store/features/residentThunks'
import { RootState, AppDispatch } from '@/infrastructure/store'

const PlanetDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { currentPlanet: planet, status: planetStatus } = useSelector(
    (state: RootState) => state.planets
  )
  const { residents, status: residentsStatus } = useSelector(
    (state: RootState) => state.residents
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const boxStyles = {
    maxWidth: '800px',
    minWidth: '300px',
    borderRadius: '8px',
    color: 'white',
    padding: '10px 12px',
    backgroundColor: 'primary.main',
  }

  useEffect(() => {
    id &&
      dispatch(fetchPlanetByIdAsync(id)).then(() =>
        dispatch(fetchResidentsAsync())
      )
  }, [dispatch])

  const handleBackBtnClick = () => {
    navigate('/')
  }

  return (
    <Container className="planet-detail" disableGutters maxWidth="lg">
      <Button onClick={handleBackBtnClick} variant="contained">
        <HomeIcon /> Back
      </Button>

      {planetStatus === 'loading' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '85px',
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
            {planet.residents.length !== 0 && (
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
                      minHeight: '85px',
                      ...boxStyles,
                    }}
                  >
                    <CircularProgress
                      data-testid="residents-loading"
                      color="inherit"
                    />
                  </Box>
                ) : (
                  residents?.map((resident, index) => (
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
