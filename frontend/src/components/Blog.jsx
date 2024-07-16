import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: white;
    color: #333;
  }
`;

const PageContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  padding-top:6rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const AuthorName = styled.span`
  font-weight: bold;
  margin-right: 1rem;
`;

const PostDate = styled.span`
  color: #666;
`;

const Content = styled.p`
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background: linear-gradient(to right, #007bff, #00bcd4);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background: ${props => props.delete ? 'linear-gradient(to right, #ff3030, #ff0000)' : 'linear-gradient(to right, #007bff, #00bcd4)'};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s ease;
  font-size: 15px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentTitle = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const CommentForm = styled.form`
  margin-top: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const BlogPostPage = () => {
  const { userId, isAdmin } = useAuth();
  const [editUser, setEditUser] = useState(false);
  const [postData, setPostData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.post) {
      setPostData(location.state.post);
      setEditUser(location.state.post.email === userId);
    } else {
      console.log("No post data found");
      navigate('/');
    }
  }, [location.state, userId, navigate]);

  const handleEdit = () => {
    navigate('/addBlog', { state: { post: postData, isEditing: true } });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5050/deleteBlog/${postData._id}`);
      navigate('/profile');
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (!postData) return null;

  return (
    <>
      <GlobalStyle />
      <PageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>{postData.title}</Title>
        <AuthorInfo>
          <Avatar src={postData.avatar || "https://source.unsplash.com/random?portrait"} alt="Author" />
          <AuthorName>{`${postData.firstName} ${postData.lastName}`}</AuthorName>
          <PostDate>{new Date(postData.created_at).toLocaleDateString()}</PostDate>
        </AuthorInfo>
        <Content>{postData.content}</Content>
        <TagContainer>
          {postData.tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagContainer>
        {editUser && <Button onClick={handleEdit}>Edit Blog</Button>}
        {(editUser || isAdmin) && <Button delete onClick={handleDelete}>Delete</Button>}
        <CommentSection>
          <CommentTitle>Comments</CommentTitle>
          <CommentList>
            {postData.comments?.map((comment, index) => (
              <CommentItem key={index}>
                <CommentAuthor>{comment.author}: </CommentAuthor>
                {comment.content}
              </CommentItem>
            ))}
          </CommentList>
          <CommentForm>
            <CommentInput rows="4" placeholder="Add a comment" />
            <Button type="submit">Post Comment</Button>
          </CommentForm>
        </CommentSection>
      </PageContainer>
    </>
  );
};

export default BlogPostPage;