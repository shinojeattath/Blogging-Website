import React from 'react';
import { useEffect, useState } from 'react';

import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  ThemeProvider, 
  createTheme,
  CssBaseline
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios'; 
import {format} from 'date-fns'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#121212',
    },
  },
});

const AddBlogPage = () => {

  const { userId } = useAuth();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [created_at, setCreated_at] = useState(null);
  const[newBlog, setNewBlog] = useState({firstName:firstName,lastName:lastName, email:email, created_at:created_at, title:'', content:''})


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5050/get', { params: { email: userId } });
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        const now = new Date();
        const date = format(now, 'yyyy-MM-dd');
        setCreated_at(date);
        console.log("Data recieved", response.data)
        console.log("name: " + response.data.firstName)
        setNewBlog({
          ...newBlog,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          created_at: date
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
      console.log("Loggged in as : " + userId)
    }
    else{
      console.error('User not logged in');
    }
  }, [userId]);

    
    
  

  const handlePublish = async (e) => {
    e.preventDefault()
      axios.post('http://127.0.0.1:5050/postBlog', newBlog)
      .then((response) => {
        console.log(response.data)
    console.log("blog data added", newBlog)
  
        // navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (e) =>{
    setNewBlog(() =>( {...newBlog,[e.target.name]:e.target.value}))
    console.log(newBlog)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: '#121212', minHeight: '100vh' } } 
      >
        <Container component="main" maxWidth="md" >
          <Box
            sx={{
              paddingTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography component="h1" variant="h4" gutterBottom>
                Add New Blog
              </Typography>
            </motion.div>
            <Box component="form" noValidate sx={{ mt: 3, width: '100%' }} onSubmit={handlePublish}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Blog Title"
                  name="title"
                  autoFocus
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '15px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                />


                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="First name"
                  name="firstName"
                  autoFocus
                  onChange={handleChange}
                  value={firstName}
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '15px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                  // style={{ display: 'none' }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Last name"
                  name="lastName"
                  autoFocus
                  onChange={handleChange}
                  value={lastName}
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '15px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                  // style={{ display: 'none' }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  autoFocus
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: '1.2rem', padding: '15px' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                  // style={{ display: 'none' }}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Time"
                name="created_at"
                value={created_at}
                onChange={handleChange}
                autoFocus
                variant="outlined"
                InputProps={{
                  style: { fontSize: '1.2rem', padding: '15px' }
                }}
                InputLabelProps={{
                  style: { fontSize: '1.2rem' }
                }}
                // style={{ display: 'none' }}
              />


              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="content"
                  label="Blog Content"
                  id="content"
                  multiline
                  onChange={handleChange}
                  rows={15}
                  variant="outlined"
                  InputProps={{
                    style: { fontSize: '1rem', lineHeight: '1.5' }
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' }
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontSize: '1.1rem', py: 1.5 }}
                >
                  Publish Blog
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AddBlogPage;