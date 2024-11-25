import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import CreateCr from './pages/CreateCr'
import Dashboard from './pages/Dashboard'
import UpdateCr from './pages/UpdateCr'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/create' element={<CreateCr/>}/>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/:id/edit' element={<UpdateCr/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App