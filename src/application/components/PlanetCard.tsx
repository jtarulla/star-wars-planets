import { useState, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { deletePlanet } from '@/infrastructure/store/features/planetSlice'
import { AppDispatch } from '@/infrastructure/store'
import { RootState } from '@/infrastructure/store'
import PlanetInfo from '@/application/components/PlanetInfo'
import { useGetPlanet } from '../hooks/useGetPlanet'
import { Planet } from '@/domain/models/Planet'

interface PlanetCardProps {
  planet: Planet
}

const PlanetCard = ({ planet }: PlanetCardProps) => {
  const { newPlanets, planetsByPage } = useSelector(
    (state: RootState) => state.planets
  )
  const { id, name } = planet
  const { isApiPlanet } = useGetPlanet({
    id,
    newPlanets,
    planetsByPage,
  })

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOptionsClose = (actionType: string | null = null) => {
    setAnchorEl(null)

    if (actionType === 'edit') {
      handleEditClick()
    }

    if (actionType === 'delete') {
      dispatch(deletePlanet({ name, id, isApiPlanet }))
    }
  }

  const handleEditClick = () => {
    navigate(`/planets/${planet.id}/edit`)
  }

  const handleLearnMoreClick = () => {
    navigate(`/planets/${planet.id}`)
  }

  return (
    <Card className={'planet-card'} variant="outlined">
      <CardContent>
        <CardHeader
          avatar={
            <Typography variant="h4" component="h2">
              {planet.name}
            </Typography>
          }
          action={
            <>
              <IconButton
                aria-label="settings"
                color="inherit"
                onClick={handleOptionsClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleOptionsClose()}
              >
                <MenuItem
                  onClick={() => handleOptionsClose('edit')}
                  disableRipple
                >
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => handleOptionsClose('delete')}
                  disableRipple
                >
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
        />
        <PlanetInfo planet={planet} />
      </CardContent>
      <CardActions>
        <Button
          className="learn-more-btn"
          onClick={handleLearnMoreClick}
          variant="contained"
          color="info"
          size="small"
          sx={{ display: 'flex' }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default PlanetCard
