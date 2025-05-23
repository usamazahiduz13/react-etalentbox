import React from 'react'
import './App.css'
import LandingPage from './pages/landingPage/index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/login/index'
import RegisterPage from './pages/auth/register/index'
import { Toaster } from 'sonner';
import DashboardPage from './pages/dashboard'
import Profile from './pages/profile/index'
import Settings from './pages/settings/index'
import Jobs from './pages/jobs/Index'
import NotFound from './pages/NotFound'
import AuthRedirect from './components/AuthRedirect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/auth/login' element={<LoginPage/>}/>
        <Route path='/auth/register' element={<RegisterPage/>}/>
        <Route path='/auth/redirect' element={<AuthRedirect/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/dashboard/add-details' element={<Profile/>}/>
        <Route path='/find-jobs/*' element={<Jobs/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster position='top-right'/>
    </BrowserRouter>
  )
}

export default App
