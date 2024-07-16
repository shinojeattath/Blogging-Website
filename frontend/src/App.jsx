import React from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProfilePage from './components/Profile'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import BlogPostPage from './components/Blog'
import AddBlogPage from './components/AddBlogPage'

import {  Routes, Route  } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import AdminDashboard from './components/AdminDashboard'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    <>
    <AuthProvider>
  <Navbar/>
  
  <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/blog/:id" element={<BlogPostPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/addBlog" element={<AddBlogPage/>} />
      <Route path="/admin" element={<AdminDashboard/>} />
      
  </Routes>
  </AuthProvider>
    </>
  )
}

export default App