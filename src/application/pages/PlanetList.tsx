import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Skeleton, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Pagination from '@mui/material/Pagination'

import { fetchPlanetsAsync } from '@/infrastructure/store/features/planetThunks'
import { RootState, AppDispatch } from '@/infrastructure/store'
import PlanetCard from '@/application/components/PlanetCard'
import { useNavigate } from 'react-router'

const PlanetList = () => {
  const [page, setPage] = useState(1)
  const { planetsByPage, newPlanets, status, count } = useSelector(
    (state: RootState) => state.planets
  )

  const numberOfPages = Math.ceil(count / 10)
  const planetsFromAPI = planetsByPage[page] || []
  const planets =
    page === numberOfPages ? planetsFromAPI.concat(newPlanets) : planetsFromAPI

  const navigate = useNavigate()

  const loading = status === 'loading'

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!planetsByPage[page]) {
      dispatch(fetchPlanetsAsync(page))
    }
  }, [dispatch, page, planetsByPage])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page)
  }

  const navigateToAddPlanet = () => {
    navigate('/planets/new')
  }

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <Skeleton
          className="planet-card"
          data-testid="planet-skeleton"
          variant="rounded"
          width={290}
          height={224}
        />
      </Grid>
    ))
  }

  return (
    <>
      <h1>Star Wars Planets</h1>
      <Button
        onClick={navigateToAddPlanet}
        variant="contained"
        color="primary"
        sx={{
          marginBottom: '25px',
        }}
      >
        <AddIcon /> Add new planet
      </Button>
      <Grid container spacing={4}>
        {loading
          ? renderSkeletons(12)
          : planets.map((planet) => (
              <Grid key={planet.id} item xs={12} sm={6} md={4} lg={3}>
                <PlanetCard planet={planet} />
              </Grid>
            ))}
      </Grid>
      {loading ? (
        ''
      ) : (
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          className="pagination"
        />
      )}
    </>
  )
}

export default PlanetList
