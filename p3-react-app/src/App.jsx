import React from 'react'
import KanbanBoard from './pages/KanbanBoard'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'




const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/kanban' element={<KanbanBoard />}/>
        <Route path='/login' element={<Login />}/>

      </Routes>
    </>
  )
}

export default App
