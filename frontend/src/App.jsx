import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProfilePage from './components/Profile'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import BlogPostPage from './components/Blog'
import AddBlogPage from './components/AddBlogPage'
import { AuthProvider } from './AuthContext'
import AdminDashboard from './components/AdminDashboard'
import EditProfileForm from './components/EditProfileForm'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  const location = useLocation();

  const isAdminPage = location.pathname === '/admin';

  return (
    <AuthProvider>
      {!isAdminPage && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addBlog" element={<AddBlogPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/editProfile" element={<EditProfileForm />} />
      </Routes>
    </AuthProvider>
  )
}

export default App