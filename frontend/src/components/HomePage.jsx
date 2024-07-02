import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box
} from '@mui/material';
import { motion } from 'framer-motion';

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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const HomePage = () => {
  const featuredPost = {
    title: "The Future of AI in Blogging",
    description: "Explore how artificial intelligence is shaping the future of content creation and blogging.",
    image: "https://source.unsplash.com/random?ai",
    date: "June 15, 2024"
  };

  const recentPosts = [
    { title: "10 Tips for Better Writing", image: "https://source.unsplash.com/random?writing", date: "June 10, 2024" },
    { title: "The Rise of Video Blogging", image: "https://source.unsplash.com/random?vlog", date: "June 5, 2024" },
    { title: "Monetizing Your Blog in 2024", image: "https://source.unsplash.com/random?money", date: "May 30, 2024" },
  ];

  // recent posts
  const [data,setData] =useState([])
  useEffect(() =>{
    const fetchData = async () =>{

      const response = await axios.get('http://127.0.0.1:5050/getBlog')
      .then((response) => {
        console.log("Starting data fetch...");
          console.log("Response received:", response);
          console.log("Response data:", response.data);
          setData(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
      fetchData()
    },[])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <motion.div {...fadeIn}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Welcome to BlogApp
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Discover insightful articles on technology, lifestyle, and more. Join our community of passionate writers and readers.
              </Typography>
            </motion.div>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <motion.div {...fadeIn}>
            <Typography variant="h4" gutterBottom>
              Featured Post
            </Typography>
            <Card sx={{ display: 'flex', mb: 4 }}>
              <CardMedia
                component="img"
                sx={{ width: 300 }}
                image={featuredPost.image}
                alt={featuredPost.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="h5" variant="h5">
                    {featuredPost.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {featuredPost.date}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {featuredPost.description}
                  </Typography>
                  <Button variant="outlined" color="primary">
                    Read More
                  </Button>
                </CardContent>
              </Box>
            </Card>
          </motion.div>
          <motion.div {...fadeIn}>
            <Typography variant="h4" gutterBottom>
              Recent Posts
            </Typography>
            <Grid container spacing={4}>
              {data.map((post, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Link to={`/blog/${post._id}`} state={{ post: post }}>
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
                  </Link>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default HomePage;