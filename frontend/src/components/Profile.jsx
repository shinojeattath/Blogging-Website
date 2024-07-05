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
  CssBaseline,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
  
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};


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
  const [firstName, setFirstName] = useState("Guest")
  const [lastName, setLastName] = useState("User")
  const [userBlogs, setUserBlogs] = useState([])


  useEffect(() => {
    const fetchData = async() =>{

      if(userId){
        const response = await axios.get(`http://localhost:5050/get`, {params:{email: userId}})
        try {
          
          console.log("got userid")
          console.log("Profile Data", response.data)
          setProfileData(response.data);
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          console.log("profiledata" + profileData)
        } catch (error) {
          console.log("error fetrching ",error)
        }
      }
    }
    fetchData()


  },[userId])

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        if (userId) {
          const response = await axios.get('http://localhost:5050/getUserBlog', { params: { email: userId } });
          console.log("got blogs");
          console.log("User Blogs", response.data);
          // Ensure we're setting an array
          setUserBlogs(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.log("error fetching blogs", error);
        setUserBlogs([]); // Set to empty array in case of error
      }
    };
  
    fetchUserBlogs();
  }, [userId]); // Add userId as a dependency




  console.log("Profile dataaaaa",profileData)
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
                    <Typography variant="h5">{firstName} {lastName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  
                  
                    <>
                      <Typography variant="body1"><strong>Email:</strong> {userId}</Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body1"><strong>Bio:</strong></Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>No bio provided.</Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => setEditing(true)}>
                          Edit Profile
                        </Button>
                      </Box>
                    </>
                  
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </motion.div>
        <motion.div {...fadeIn}>
          <br/>
            <Typography variant="h4" gutterBottom>
               Posts
            </Typography>

            <Grid container spacing={4}>
            {Array.isArray(userBlogs) && userBlogs.length > 0 ? (
  userBlogs.map((post, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image='https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg'
            alt={post.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))
) : (
  <Typography>No blogs found</Typography>
)}
            </Grid>


          
          </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;