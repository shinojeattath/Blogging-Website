import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import { Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { DotSpinner } from '@uiball/loaders';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    margin: 0;
    padding: 0;
    color: #333;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 0;
`;

const SignUpBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const FullWidthInput = styled(Input)`
  grid-column: 1 / -1;
`;

const Button = styled(motion.button)`
  grid-column: 1 / -1;
  padding: 0.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ErrorList = styled.ul`
  color: #e74c3c;
  font-size: 0.9rem;
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-type: none;
`;

const ErrorItem = styled.li`
  margin-bottom: 0.5rem;
  &:before {
    content: "•";
    color: #e74c3c;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;


const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    phone: '',
    role: 'user',
    profilePhoto: null
  });
  const [errors, setErrors] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      const file = e.target.files[0];
      setInput(prev => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const validateForm = () => {
    let newErrors = [];
    
    if (!input.firstName.trim()) newErrors.push('First name is required');
    if (!input.lastName.trim()) newErrors.push('Last name is required');
    if (!input.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) newErrors.push('Valid email is required');
    if (input.password.length < 8) newErrors.push('Password must be at least 8 characters long');
    if (!input.age || isNaN(input.age) || input.age < 18 || input.age > 120) newErrors.push('Age must be above 18');
    if (!input.gender.trim()) newErrors.push('Gender is required');
    if (!input.phone.trim() || !/^\d{10}$/.test(input.phone)) newErrors.push('Valid 10-digit phone number is required');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const addData = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      const formData = new FormData();
      Object.keys(input).forEach(key => {
        if (key === 'age') {
          formData.append(key, parseInt(input[key]));
        } else if (key === 'phone') {
          formData.append(key, input[key].toString());
        } else if (key !== 'profilePhoto') {
          formData.append(key, input[key]);
        }
      });
      if (input.profilePhoto) {
        formData.append('profilePhoto', input.profilePhoto);
      }
  
      try {
        const response = await axios.post('http://localhost:5050/post', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Response:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error:', error.response ? error.message.data : error.message);
        setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data]);
      }
      finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <GlobalStyle />
      {isLoading && (
        <LoadingOverlay>
          <DotSpinner size={40} speed={0.9} color="black" />
        </LoadingOverlay>
      )}
      <SignUpContainer>
        <SignUpBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconWrapper
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <PersonAddIcon style={{ fontSize: 48, color: '#3498db' }} />
          </IconWrapper>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Sign up
          </Typography>
          <Form onSubmit={addData}>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={input.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={input.lastName}
              onChange={handleChange}
            />
            <FullWidthInput
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={input.email}
              onChange={handleChange}
            />
            <FullWidthInput
              type="password"
              name="password"
              placeholder="Password"
              required
              value={input.password}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="age"
              placeholder="Age"
              required
              value={input.age}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="gender"
              placeholder="Gender"
              required
              value={input.gender}
              onChange={handleChange}
            />
            <FullWidthInput
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={input.phone}
              onChange={handleChange}
            />
            {/* {previewUrl && <ImagePreview src={previewUrl} alt="Profile Preview" />}
            <FileInputLabel>
              <FileInput
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
              />
              Choose Profile Photo
            </FileInputLabel> */}
            {errors.length > 0 && (
              <ErrorList>
                {errors.map((error, index) => (
                  <ErrorItem key={index}>{error}</ErrorItem>
                ))}
              </ErrorList>
            )}
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </Button>
          </Form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
              Already have an account? <StyledLink to="/login">Sign In</StyledLink>
            </Typography>
          </motion.div>
        </SignUpBox>
      </SignUpContainer>
    </>
  );
};

export default SignUp;