import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar,
  Grid,
  Paper,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';


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

const ProfilePage = () => {

  const { userId } = useAuth();
  const [profileData, setProfileData] = useState(null)
  const editing = false

  useEffect(() => {
    if(userId){
        axios.get(`http://localhost:5050/get`, {params:{email: userId}})
            .then(response => {
                console.log("got userid")
                console.log(response.data)
            setProfileData(response.data);
            console.log("profiledata" + profileData)
            })
            .catch(error => console.error('Error fetching profile:', error));
    }
  },[userId])

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5050/user/${user.id}`, profileData)
      .then(response => {
        setUser({
          ...user,
          ...response.data
        });
        setEditing(false);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      sx={{ width: 120, height: 120, mb: 2 }}
                      src='/default-avatar.png'
                    />
                    <Typography variant="h5">djlkv</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  {editing ? (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        margin="normal"
                        name="name"
                        label="Name"
                        value='blss'
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="Email"
                        value={profileData.email}
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        name="bio"
                        label="Bio"
                        multiline
                        rows={4}
                        value={profileData.bio}
                        onChange={handleChange}
                      />
                      <Box sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
                          Save
                        </Button>
                        <Button variant="outlined" onClick={() => setEditing(false)}>
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  ) : (
                    <>
                      <Typography variant="body1"><strong>Email:</strong> email</Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1"><strong>Bio:</strong></Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>No bio provided.</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
                          Edit Profile
                        </Button>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;