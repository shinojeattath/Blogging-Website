import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '../AuthContext';
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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  display: flex;
  height: 100vh;
  padding: 2rem;
  align-items: center;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.primary ? '#3498db' : 'transparent'};
  border: 2px solid ${props => props.primary ? '#3498db' : '#3498db'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#3498db'};
    color: #fff;
  }
`;

const RecentPostsSection = styled.section`
  padding: 120px 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

const PostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.4rem;
  color: #2c3e50;
`;

const PostDate = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
`;

const HomeButton = styled.button`
  font-size: 17px;
  background: transparent;
  border: none;
  font-style:roboto;
  padding: 1em 1.5em;
  color: #00ADDF;
  text-transform: uppercase;
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: #00ADDF;
    transition: 0.5s ease;
  }

  &:hover {
    color: #ffffff;
    transition-delay: 0.5s;
  }

  &:hover::before {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #00ADDF;
    transition: 0.4s ease;
    z-index: -1;
  }

  &:hover::after {
    height: 100%;
    transition-delay: 0.4s;
  }
`;

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { authenticated } = useAuth();
  const recentPostsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrollToRecentPosts = () => {
    recentPostsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5050/getBlog');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <LoadingOverlay>
        <DotSpinner size={40} speed={0.9} color="black" />
      </LoadingOverlay>
    );
  }

  return (
    <>
      <GlobalStyle />
      <HomeContainer>
        <HeroSection>
          <Section>
            <LogoContainer>
              <Logo><img src="blogcast.png" alt="logo" /></Logo>
              <Subtitle>Your Voice, Your Story</Subtitle>
            </LogoContainer>
            <ButtonContainer>
              <HomeButton onClick={() =>{if (!authenticated){navigate('signup')} else {scrollToRecentPosts()}}}>Get Started</HomeButton>
              <HomeButton onClick={scrollToRecentPosts}>Explore</HomeButton>
            </ButtonContainer>
          </Section>
        </HeroSection>
        <RecentPostsSection ref={recentPostsRef}>
          <SectionTitle>Recent Posts</SectionTitle>
          <PostsGrid>
            {posts.map((post) => (
              <PostCard
                key={post._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/blog/${post._id}`} state={{ post: post }} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <PostImage src='cat.jpg' alt={post.title} />
                  <PostContent>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{post.created_at}</PostDate>
                  </PostContent>
                </Link>
              </PostCard>
            ))}
          </PostsGrid>
        </RecentPostsSection>
      </HomeContainer>
    </>
  );
};

export default HomePage;