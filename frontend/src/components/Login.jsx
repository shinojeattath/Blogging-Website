// Imports
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { TextField,  Button, Typography,  Container,  Box, ThemeProvider, createTheme, CssBaseline, styled } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios'
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';
// End Imports

// Theme

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

// End Theme



const SignIn = () => {
  // variables
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [input,setInput] = useState({email:'',password:''})
  const { setAuthenticated, setUserId, userId, login } = useAuth();  
  

  // End variables
  
  // useEffect(() => {
  //   console.log("useeffect")
  //   if(submitted){
  //     axios.get('http://localhost:5050/get', {params:{email:input.email}})
  //     .then((response) => {
  //       const email = response.data.email
  //       console.log(response.data)
  //       console.log(email)

  //       if(email == input.email){
  //         console.log("email matched")
  //         if(response.data.password == input.password){
  //           console.log("password matched")
  //           setAuthenticated(true)
  //           setUserId(response.data.email)
  //           console.log("user id: " + userId)
  //           navigate('/')
  //         }
  //         else{
  //           console.log("password not matched")
  //         }
  //       }
  //       else{
  //         console.log("email not matched")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error" + error)
  //     })
  //     .finally(() => {
  //       setSubmitted(false)
  //     })
  //   }
  // },[submitted])
  

  const handleChange = (e) =>{
    setInput({...input,[e.target.name]:e.target.value})
    console.log(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
  };

//   Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #121212 30%, #2C2C2C 90%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        }}
      >
        <Container component="main" maxWidth="xs">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <LockOutlinedIcon sx={{ m: 1, bgcolor: 'secondary.main', p: 2, borderRadius: '50%', color: 'background.paper' }} />
              </motion.div>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={ (e) =>{e.preventDefault(); login(input.email, input.password)}} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth 
                  id="email"
                  label="Email Address"
                  type='email'
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={input.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={input.password}
                  onChange={handleChange}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </motion.div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  
                  <Link to={'/signup' } className='custom-link' >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;