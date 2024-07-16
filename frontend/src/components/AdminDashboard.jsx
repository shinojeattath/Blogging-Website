import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People as PeopleIcon, 
  Book as BookIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();

  const [activePage, setActivePage] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('page') || 'dashboard';
  });

  useEffect(() => {
    navigate(`?page=${activePage}`, { replace: true });
  }, [activePage, navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    console.log("admin logging out");
    logout();
  };

  const handleHomeClick = () => {
    navigate('/');  // Navigate to the home page
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem button onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {['Dashboard', 'Users', 'Blogs'].map((text, index) => (
          <ListItem button key={text} onClick={() => handlePageChange(text.toLowerCase())}>
            <ListItemIcon>
              {index === 0 ? <DashboardIcon /> : 
               index === 1 ? <PeopleIcon /> : 
               <BookIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'blogs':
        return <BlogsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const DashboardContent = () => {
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [noOfPosts, setNoOfPosts] = useState(0);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getUser')
      .then((response) => {
        console.log("dashboard data", response.data);
        setNoOfUsers(response.data.length);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getBlog')
      .then((response) => {
        console.log("dashboard data", response.data);
        setNoOfPosts(response.data.length);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{noOfUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Total Blogs</Typography>
            <Typography variant="h3">{noOfPosts}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </motion.div>
  );
};

const UsersContent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getUser')
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Implement delete functionality 
    axios.delete(`http://127.0.0.1:5050/deleteUser/${userId}`)
      .then((response) => {
        console.log("user deleted");
        // Remove the deleted user from the state
        window.location.reload();
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Box display="flex">
        <TableContainer component={Paper} sx={{ flexGrow: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link className='custom-link' to={'/profile'}>
                      {user.firstName}&nbsp;{user.lastName}
                    </Link>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </motion.div>
  );
};

const BlogsContent = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getBlog')
      .then((response) => {
        console.log("dashboard data", response.data);
        setAdminBlogs(response.data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);

  const handleDelete = (blogId) => {
    axios.delete(`http://127.0.0.1:5050/deleteBlog/${blogId}`)
      .then((response) => {
        console.log("blog deleted");
        // Remove the deleted blog from the state
        window.location.reload();
      })
      .catch((error) => {
        console.log("error" + error);
      });
  };

  const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Blog Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminBlogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{truncate(blog.firstName, 20)} {blog.lastName}</TableCell>
                <TableCell>{truncate(blog.email, 20)}</TableCell>
                <TableCell>
                  <Link className='custom-link' to={`/blog/${blog._id}`} state={{ post: blog }}>
                    {truncate(blog.title, 30)}
                  </Link>
                </TableCell>
                <TableCell>{truncate(blog.content, 50)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default AdminDashboard;