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
      
  </Routes>
  </AuthProvider>
    </>
  )
}

export default App