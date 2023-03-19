import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StraightenIcon from '@mui/icons-material/Straighten'
import TerrainIcon from '@mui/icons-material/Terrain'
import Groups3Icon from '@mui/icons-material/Groups3'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import { useState } from 'react'

import { Planet } from '@/domain/models/Planet'

interface PlanetCardProps {
  planet: Planet
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="options-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
        />
        <Typography display={'flex'} gap={1} data-testid="diameter">
          <StraightenIcon color="primary" />
          <b>Diameter:</b> {planet.diameter} Km
        </Typography>
        <Typography display={'flex'} gap={1} data-testid="climate">
          <ThermostatIcon color="primary" />
          <b>Climate:</b> {planet.climate}
        </Typography>
        <Typography display={'flex'} gap={1} data-testid="terrain">
          <TerrainIcon color="primary" />
          <b>Terrain:</b> {planet.terrain}
        </Typography>
        <Typography display={'flex'} gap={1} data-testid="population">
          <Groups3Icon color="primary" />
          <b>Population:</b> {planet.population}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PlanetCard
