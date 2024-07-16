import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import { Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../AuthContext';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    margin: 0;
    padding: 0;
    color: #333;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
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

const SignInButton = styled.button`
  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #3d3a4e;
  background-size: 400%;
  color: #fff;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: all 0.475s;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const ButtonContent = styled.span`
  position: relative;
  z-index: 1;
`;

const SignIn = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <LoginBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <IconWrapper
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <LockOutlinedIcon style={{ fontSize: 48, color: '#3498db' }} />
          </IconWrapper>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Sign in
          </Typography>
          <Form onSubmit={(e) => { e.preventDefault(); login(input.email, input.password); }}>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={input.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={input.password}
              onChange={handleChange}
            />
            <SignInButton>
              Sign In
            </SignInButton>
          </Form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
              Don't have an account? <StyledLink to="/signup" className='custom-link'>Sign Up</StyledLink>
            </Typography>
          </motion.div>
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default SignIn;