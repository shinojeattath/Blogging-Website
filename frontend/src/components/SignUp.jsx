import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import { Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

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
    role: 'user'
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const addData = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5050/post', input)
      .then((response) => {
        console.log(response.data);
        console.log("data added");
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <GlobalStyle />
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