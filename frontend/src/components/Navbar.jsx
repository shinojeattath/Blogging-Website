import { AppBar, Button, Toolbar, Typography, ThemeProvider,  createTheme,  } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react'

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#BB86FC',
      },
      secondary: {
        main: '#03DAC6',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
const Navbar = () => {

  let authenticated = true
  return (
    
    <div>
        <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Categories</Button>
          <Button color="inherit">About</Button>
          {authenticated? <Link to={'/logout'} className='custom-link'>&nbsp;PROFILE</Link>: null}
          {authenticated? <Link to={'/logout'} className='custom-link'>&nbsp;LOGOUT</Link>: null}
          <Link to={'/login'} className='custom-link'>&nbsp;LOGIN</Link>
        </Toolbar>
      </AppBar>
      </ThemeProvider>

    </div>
  )
}

export default Navbar