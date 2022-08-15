
import { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { ThemeContext } from '../theme/theme';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@material-ui/core';
import { Paper } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = (props) => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();


  return (


    <Paper elevation={3} sx={{ backgroundColor: 'background.paper' }}>
      <div className='d-flex flex-row justify-content-between py-3 px-5'>
        <Typography variant="h6" style={{ fontWeight: '550' }}>
          Where in the world?
        </Typography>


        <Button className = "text-transform-none"  color="inherit" onClick={colorMode.toggleTheme}  startIcon={theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />} > {`${theme.palette.mode === 'light' ? 'Dark' : 'Light'} Mode`}</Button>

      </div>

    </Paper>

  )
}

export default Header