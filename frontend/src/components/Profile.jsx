import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    margin: 0;
    padding: 0;
    color: #333;
  }
`;

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: calc(20vh); // Add top padding to account for navbar
  min-height: calc(80vh); // Ensure the container takes up the full height minus navbar
  box-sizing: border-box;
`;

const ProfileHeader = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const ProfileContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BlogImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const ProfilePage = () => {
  const { userId } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5050/get`, { params: { email: userId } });
          setProfileData(response.data);
        } catch (error) {
          console.log("Error fetching profile data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (userId) {
        try {
          const response = await axios.get('http://localhost:5050/getUserBlog', { params: { email: userId } });
          setUserBlogs(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.log("Error fetching blogs:", error);
          setUserBlogs([]);
        }
      }
    };
    fetchUserBlogs();
  }, [userId]);

  return (
    <>
      <GlobalStyle />
      <ProfileContainer>
        <ProfileHeader
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar>
            <PersonIcon style={{ fontSize: 60, color: 'white' }} />
          </Avatar>
          <UserInfo>
            <Typography variant="h4">{profileData?.firstName} {profileData?.lastName}</Typography>
            <Typography variant="body1">{userId}</Typography>
          </UserInfo>
        </ProfileHeader>

        <ProfileContent {...fadeIn}>
          <Typography variant="h6">Bio</Typography>
          <Typography variant="body1">No bio provided.</Typography>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit Profile
          </Button>

          <Typography variant="h5" style={{ marginTop: '2rem', marginBottom: '1rem' }}>Posts</Typography>
          <BlogGrid>
            {userBlogs.length > 0 ? (
              userBlogs.map((post, index) => (
                <StyledLink to={`/blog/${post._id}`} state={{ post: post }} key={index}>
                  <BlogCard
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BlogImage src='https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg' alt={post.title} />
                    <BlogContent>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography variant="body2" color="textSecondary">{post.date}</Typography>
                    </BlogContent>
                  </BlogCard>
                </StyledLink>
              ))
            ) : (
              <Typography>No blogs found</Typography>
            )}
          </BlogGrid>
        </ProfileContent>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;