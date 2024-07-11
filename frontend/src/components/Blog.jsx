import React from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider,   createTheme,   CssBaseline,  Container,  Typography,  Box,  Avatar, Divider,  Chip,  TextField,  Button,  List,  ListItem,  ListItemText,  ListItemAvatar} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../AuthContext'
import { useEffect } from 'react';

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

const BlogPostPage = (props) => {
  
  const { userId } = useAuth()
  // Mock data for the blog post 
  const post = {
    title: "The Future of AI in Blogging",
    author: {
      name: "Jane Doe",
      avatar: "https://source.unsplash.com/random?portrait",
    },
    date: "June 15, 2024",
    content: `
    Artificial Intelligence is revolutionizing the way we create and consume content. In the realm of blogging, AI is opening up new possibilities and challenges.
    
    One of the most significant impacts of AI on blogging is in content creation. AI-powered tools can now generate entire blog posts, suggest topics, and even optimize content for SEO. This has led to increased productivity for bloggers, allowing them to focus more on strategy and less on the nitty-gritty of writing.
    
    However, the rise of AI in blogging also raises important questions about authenticity and the value of human creativity. While AI can produce grammatically correct and informative content, it often lacks the personal touch and unique insights that human writers bring to their work.
    
    As we move forward, the key will be finding the right balance between leveraging AI tools to enhance our work and maintaining the human element that makes blogs engaging and relatable. The future of blogging will likely involve a symbiotic relationship between human creativity and AI assistance, rather than a complete takeover by machines.
    
    What are your thoughts on the role of AI in blogging? How do you see it shaping the future of content creation?
    `,
    tags: ["AI", "Blogging", "Technology", "Content Creation"],
    comments: [
      { author: "John Smith", content: "Great insights! I'm excited to see how AI will continue to evolve in the blogging world.", avatar: "https://source.unsplash.com/random?man" },
      { author: "Emily Brown", content: "I agree that maintaining the human element is crucial. AI should enhance, not replace human creativity.", avatar: "https://source.unsplash.com/random?woman" }
    ]
  };
  
  // End dummy data
  
  const [editUser, setEditUser] = useState(false)

  const location = useLocation();

  if(location.state){
    console.log("blogpage data",location.state.post);
  }
  else{
    console.log("No post data found");
  }

  
  useEffect(() => {
    if(location.state){
      console.log("blogpage data",location.state.post);
    }
    else{
      console.log("No post data found");
    }
  
    if(location.state.post.email == userId){
      setEditUser(true)
      console.log("Auther of the post")
    }
    
  },[ userId])

  const currentUserBlog = true
 
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div {...fadeIn}>
          <Typography variant="h2" component="h1" gutterBottom>
            {location.state.post.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar src={post.author.avatar} sx={{ mr: 2 }} />
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              {location.state.post.firstName} {location.state.post.lastName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {location.state.post.created_at}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {location.state.post.content}
          </Typography>
          <Box sx={{ mb: 4 }}>
            {post.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
           {(editUser && <Button variant="contained" color="primary">
              Edit Blog
            </Button>)}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {post.comments.map((comment, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={comment.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author}
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
          {currentUserBlog && (
          <Box component="form" noValidate sx={{ mt: 4 }}>
            <TextField
              fullWidth
              id="comment"
              label="Add a comment"
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary">
              Post Comment
            </Button>
          </Box>
          )}

        </motion.div>
      </Container>
    </ThemeProvider>
  );
};

export default BlogPostPage;