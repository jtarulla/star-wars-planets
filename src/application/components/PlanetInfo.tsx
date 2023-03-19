import Typography from '@mui/material/Typography'
import StraightenIcon from '@mui/icons-material/Straighten'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import TerrainIcon from '@mui/icons-material/Terrain'
import Groups3Icon from '@mui/icons-material/Group'

import { Planet } from '@/domain/models/Planet'

interface PlanetInfoProps {
  planet: Planet
}

const PlanetInfo = ({ planet }: PlanetInfoProps) => {
  return (
    <>
      <Typography display={'flex'} gap={1} data-testid="diameter">
        <StraightenIcon color="inherit" />
        <b>Diameter:</b> {planet.diameter} Km
      </Typography>
      <Typography display={'flex'} gap={1} data-testid="climate">
        <ThermostatIcon color="inherit" />
        <b>Climate:</b> {planet.climate}
      </Typography>
      <Typography display={'flex'} gap={1} data-testid="terrain">
        <TerrainIcon color="inherit" />
        <b>Terrain:</b> {planet.terrain}
      </Typography>
      <Typography display={'flex'} gap={1} data-testid="population">
        <Groups3Icon color="inherit" />
        <b>Population:</b> {planet.population}
      </Typography>
    </>
  )
}

export default PlanetInfo
