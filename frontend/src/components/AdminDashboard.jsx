import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
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

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: hsla(0, 0%, 99%, 1);
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    background-attachment: fixed;
    margin: 0;
    padding: 0;
  }
`;

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  min-height: 10vh;
  width: 240px;
  background: linear-gradient(to bottom, #000424, #00bcd4);
  color: white;
  padding-top: 1px;  // Reduced from 60px to accommodate the logo
  z-index:1001;
`;

const SidebarItem = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarText = styled.span`
  margin-left: 10px;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
  padding-top: 80px;
`;

const Header = styled.header`
  background: linear-gradient(to right, #000430, #00bcd4);
  color: white;
  padding: 15px 250px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
`;

const StyledTh = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const StyledButton = styled.button`
  background: linear-gradient(to right, #ff3030, #ff0000);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 180px;  // Adjust size as needed
  height: auto;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActivePage(params.get('page') || 'dashboard');
  }, [location]);

  const handlePageChange = (page) => {
    setActivePage(page);
    navigate(`?page=${page}`, { replace: true });
  };

  const handleLogout = () => {
    console.log("admin logging out");
    logout();
  };

  const handleHomeClick = () => {
    navigate('/');
  };

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
    <>
      <GlobalStyle />
      <AdminContainer>
        <Sidebar>
          <SidebarItem>
            <Logo src="blogcast.png" alt="logo" />
          </SidebarItem>
          <SidebarItem onClick={handleHomeClick}>
            <HomeIcon />
            <SidebarText>Home</SidebarText>
          </SidebarItem>
          <SidebarItem onClick={() => handlePageChange('dashboard')}>
            <DashboardIcon />
            <SidebarText>Dashboard</SidebarText>
          </SidebarItem>
          <SidebarItem onClick={() => handlePageChange('users')}>
            <PeopleIcon />
            <SidebarText>Users</SidebarText>
          </SidebarItem>
          <SidebarItem onClick={() => handlePageChange('blogs')}>
            <BookIcon />
            <SidebarText>Blogs</SidebarText>
          </SidebarItem>
          <SidebarItem onClick={handleLogout}>
            <LogoutIcon />
            <SidebarText>Logout</SidebarText>
          </SidebarItem>
        </Sidebar>
        <Content>
          <Header>
            <HeaderTitle>Admin Dashboard</HeaderTitle>
          </Header>
          {renderContent()}
        </Content>
      </AdminContainer>
    </>
  );
};

const DashboardContent = () => {
  const [noOfUsers, setNoOfUsers] = useState(0);
  const [noOfPosts, setNoOfPosts] = useState(0);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getUser')
      .then((response) => {
        setNoOfUsers(response.data.length);
      })
      .catch((error) => {
        console.log("error" + error);
      });

    axios.get('http://127.0.0.1:5050/getBlog')
      .then((response) => {
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
      <h2>Dashboard Overview</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,.1)', flex: 1 }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{noOfUsers}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,.1)', flex: 1 }}>
          <h3>Total Blogs</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{noOfPosts}</p>
        </div>
      </div>
    </motion.div>
  );
};

const UsersContent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getUser')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("error" + error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`http://127.0.0.1:5050/deleteUser/${userId}`)
      .then((response) => {
        console.log("user deleted");
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
      <h2>User Management</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Actions</StyledTh>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id}>
              <StyledTd>
                <StyledLink to={'/profile'}>{user.firstName} {user.lastName}</StyledLink>
              </StyledTd>
              <StyledTd>{user.email}</StyledTd>
              <StyledTd>
                <StyledButton onClick={() => handleDelete(user._id)}>
                  <DeleteIcon /> Delete
                </StyledButton>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </motion.div>
  );
};

const BlogsContent = () => {
  const [adminBlogs, setAdminBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/getBlog')
      .then((response) => {
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
      <h2>Blog Management</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Title</StyledTh>
            <StyledTh>Content</StyledTh>
            <StyledTh>Actions</StyledTh>
          </tr>
        </thead>
        <tbody>
          {adminBlogs.map((blog) => (
            <tr key={blog._id}>
              <StyledTd>{truncate(`${blog.firstName} ${blog.lastName}`, 20)}</StyledTd>
              <StyledTd>{truncate(blog.email, 20)}</StyledTd>
              <StyledTd>
                <StyledLink to={`/blog/${blog._id}`} state={{ post: blog }}>
                  {truncate(blog.title, 30)}
                </StyledLink>
              </StyledTd>
              <StyledTd>{truncate(blog.content, 50)}</StyledTd>
              <StyledTd>
                <StyledButton onClick={() => handleDelete(blog._id)}>
                  <DeleteIcon /> Delete
                </StyledButton>
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </motion.div>
  );
};

export default AdminDashboard;