import { AppBar, Button, Toolbar, Typography, ThemeProvider,  createTheme, IconButton,  } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../AuthContext';


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

  const navigate = useNavigate()

  const { authenticated, setAuthenticated, setUserId } = useAuth();
  
  const handleLogout = () => {
    setAuthenticated(false)
    setUserId('')
    navigate('/')
    
    console.log("logging out")
  }

  return (
    
    <div>
        <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
          <Button color="inherit"><Link to={'/'} className="custom-link">Home</Link></Button>
          <Button color="inherit"><Link to={'/blog'} className="custom-link">BLOGS</Link></Button>

          {authenticated && ( <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>)}
          {!authenticated && (<Link to={'/login'} className='custom-link'>&nbsp;LOGIN</Link>)}
          {authenticated && (
            <div>
              <IconButton onClick={() => navigate('/profile')}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </div>
             )} 
        </Toolbar>
      </AppBar>
      </ThemeProvider>

    </div>
  )
}

export default Navbar