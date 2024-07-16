import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    
    background: hsla(0, 0%, 99%, 1);
    background: linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    background: -moz-linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    background: -webkit-linear-gradient(180deg, hsla(0, 0%, 99%, 1) 0%, hsla(186, 100%, 92%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#FCFCFC", endColorstr="#D8FBFF", GradientType=1 );
    opacity:100%;
  }
`;

const NavbarContainer = styled.nav`
  padding: 0.5rem 2rem;
  display: flex;
  radius:100px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
  position: fixed;
  width: 97%;
  webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

`;

const Logo = styled.div`
  height: 80px; // Adjust this value to match your navbar height
  display: flex;
  align-items: center;

  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    transition: transform 0.3s ease-in-out; // Add transition for smooth effect
  }

  img:hover {
    transform: scale(1.1); // Zoom in effect
  }
`;

const LogoutLogo = styled(Logo)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 400px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
`;

const NavLink = styled(Link)`
  color: #495057;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: linear-gradient(to right, #007bff, #00bcd4) border-box;
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to right, #007bff, #00bcd4);
    z-index: -1;
    transition: opacity 0.3s linear;
    opacity: 0;
    border-radius: 18px;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    color: white;
    background-position: 0 0;
    -webkit-background-clip: initial;
  }
`;

const LogoutButton = styled(NavLink)`
  background: linear-gradient(to right, #ff3030, #ff0000) border-box;
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  color: transparent;

  &::before {
    background: linear-gradient(to right, #ff3030, #ff0000);
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding:4rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  text-align: center;
  animation: ${props => props.isClosing ? 'zoomOut' : 'zoomIn'} 0.3s ease-in-out;

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;

const ModalTitle = styled.h2`
  color: #343a40;
  margin-bottom: 1rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;



const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onCancel();
    }, 300); // Match this with the animation duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <ModalOverlay>
      <ModalContent isClosing={isClosing}>
        <LogoutLogo><img src="blogcast.png" alt="logo" /></LogoutLogo>
        <ModalTitle>Confirm Logout</ModalTitle>
        <p>Are you sure you want to log out?</p>
        <ModalButtonContainer>
          <LogoutButton onClick={onConfirm}>Logout</LogoutButton>
          <NavLink onClick={handleClose}>Cancel</NavLink>
        </ModalButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};


const Navbar = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated, isAdmin, setIsAdmin, setUserId, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = (e) => {
    logout();
    setIsLogoutModalOpen(false);
    console.log("looged out")
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
    <GlobalStyle />
      <NavbarContainer>
        <Link to={'/'}><Logo><img src="blogcast.png" alt="logo" /></Logo></Link>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          {authenticated && <NavLink to="/addBlog">Add Blog</NavLink>}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {authenticated ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavLinks>
      </NavbarContainer>
      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};

export default Navbar;