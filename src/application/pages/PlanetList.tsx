import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Skeleton } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import { fetchPlanetsAsync } from '@/infrastructure/store/features/planetThunks'
import { RootState, AppDispatch } from '@/infrastructure/store'
import PlanetCard from '@/application/components/PlanetCard'

const PlanetList = () => {
  const [page, setPage] = useState(1)
  const { planets, status, count } = useSelector(
    (state: RootState) => state.planets
  )
  const numberOfPages = Math.ceil(count / 10)
  const loading = status === 'loading'
  const failed = status === 'failed'

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPlanetsAsync(page))
  }, [dispatch, page])

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page)
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
      <Grid container spacing={4}>
        {loading
          ? renderSkeletons(10)
          : planets.map((planet) => (
              <Grid key={planet.id} item xs={12} sm={6} md={4} lg={3}>
                <PlanetCard planet={planet} />
              </Grid>
            ))}
      </Grid>
      {loading || failed || numberOfPages < 1 ? (
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
