import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NudeDetector from './pages/NudeDetector'
import TextToImage from './pages/TextToImage'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import Verify from './pages/Verify'

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/text-to-image' element={<TextToImage />} />
        <Route path='/nude-detector' element={<NudeDetector />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App