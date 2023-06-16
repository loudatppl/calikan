import React from 'react'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User'
import Workplace from './pages/Workplace'


const App = () => {
  return (
    <div className=''>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/user' element={ <User /> }/>
            <Route path='/workplace' element={ <Workplace /> } />
        </Routes>
    </div>
  )
}

export default App