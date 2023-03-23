import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router'
import { Button } from '@mui/material'

const BackHomeButton = () => {
  const navigate = useNavigate()

  const handleBackBtnClick = () => {
    navigate('/')
  }

  return (
    <Button
      className="back-button"
      onClick={handleBackBtnClick}
      variant="contained"
    >
      <HomeIcon /> Back
    </Button>
  )
}

export default BackHomeButton
