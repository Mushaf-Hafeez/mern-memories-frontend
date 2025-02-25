import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'
import Post from './pages/Post'
import Login from './pages/Login'
import Signin from './pages/Signin'
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './pages/Unauthorized'
import ErrorPage from './pages/ErrorPage'
import Dashboard from './pages/Dashboard'

const App = () => {

  const navigate = useNavigate()

  useEffect(() => {

  }, [navigate])

  return (
    <div className='min-h-screen w-full bg-Background text-primary'>
      <Navbar />
      <Outlet />

      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/:id' element={<Post />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/create' element={<ProtectedRoute><CreatePost  /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App