import React from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {  Routes, Route  } from 'react-router-dom'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import BlogPostPage from './components/Blog'
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
      <Route path="/blog" element={<BlogPostPage/>} />
  </Routes>
  </AuthProvider>
    </>
  )
}

export default App