import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: hsla(0, 0%, 99%, 1);
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    background: -moz-linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    background: -webkit-linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#FCFCFC", endColorstr="#D8FBFF", GradientType=1 );
    margin: 0;
    padding: 0;
  }
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 80px); // Subtracting navbar height
  padding: 2rem;
  padding-top:10rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const FormContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
`;

const Title = styled.h1`
  color: #007bff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 20px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #007bff, #00bcd4);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const AddBlogPage = () => {
  const { userId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newBlog, setNewBlog] = useState({
    firstName: '',
    lastName: '',
    email: '',
    created_at: '',
    title: '',
    content: ''
  });

  useEffect(() => {
    if (location.state && location.state.post) {
      setNewBlog(location.state.post);
      setIsEditing(location.state.isEditing);
    } else {
      fetchUserDetails();
    }
  }, [location.state]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5050/get', { params: { email: userId } });
      const { firstName, lastName, email } = response.data;
      const now = new Date();
      const date = format(now, 'yyyy-MM-dd');
      setNewBlog(prevState => ({
        ...prevState,
        firstName,
        lastName,
        email,
        created_at: date
      }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const url = isEditing ? `http://127.0.0.1:5050/updateBlog/${newBlog._id}` : 'http://127.0.0.1:5050/postBlog';
    const method = isEditing ? axios.put : axios.post;

    try {
      const response = await method(url, newBlog);
      console.log(response.data);
      console.log(isEditing ? "Blog updated" : "Blog data added", newBlog);
      isEditing ? navigate(`/blog/${newBlog._id}`) : navigate('/profile') 
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewBlog(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (

    <PageContainer>
      <GlobalStyle/>
      <FormContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>{isEditing ? 'Edit Your Blog' : 'Create a New Blog Post'}</Title>
        <form onSubmit={handlePublish}>
          <Input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleChange}
            required
          />
          <TextArea
            name="content"
            placeholder="Write your blog content here..."
            value={newBlog.content}
            onChange={handleChange}
            required
          />
          <Button type="submit">
            {isEditing ? 'Update Blog' : 'Publish Blog'}
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default AddBlogPage;