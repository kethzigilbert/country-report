
import { useEffect, useState , useContext} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeContext } from '../theme/theme';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@material-ui/core';
import { Paper } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
const useStyles = makeStyles({
    bold: {
      fontWeight: 600
    }
  })
 const Header = (props) => {
    const colorMode = useContext(ThemeContext);
    const theme = useTheme();
    
    const classes = useStyles();
      
  return (
    

    <Paper elevation={5}>
    <div className='d-flex flex-row justify-content-between py-3 px-5'>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>
        Where in the world?
        </Typography>
 
   
      <Button onClick={colorMode.toggleTheme}  color="primary" variant='text' startIcon={theme.palette.mode ==='dark' ?  <LightModeIcon /> : <DarkModeIcon/>} > {theme.palette.mode} Mode</Button>
      
    </div>

    </Paper>
 
  )
}

export default Header