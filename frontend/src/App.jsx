import React from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {  Routes, Route  } from 'react-router-dom'
import HomePage from './components/HomePage'

const App = () => {
  return (
    <>
  <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
  </Routes>
   
    </>
  )
}

export default App