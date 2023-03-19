import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import PlanetInfo from '@/application/components/PlanetInfo'
import { Planet } from '@/domain/models/Planet'

interface PlanetCardProps {
  planet: Planet
}

const PlanetCard = ({ planet }: PlanetCardProps) => {
  let navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOptionsClose = () => {
    setAnchorEl(null)
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
                onClose={handleOptionsClose}
              >
                <MenuItem onClick={handleOptionsClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleOptionsClose} disableRipple>
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
