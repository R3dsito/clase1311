import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home, TaskBoard, TaskView } from './pages'
import { Route, Routes } from 'react-router-dom'
import GameDetails from './components/GameDetails/GameDetails'
import GameSearch from './components/GameSearch/GameSearch'
import { Register } from './pages/Register/Register'
import { Login } from './pages/Login/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'


function App() {

  return (
    <>
    <Routes>
      <Route element={<ProtectedRoutes/>} >
      
      <Route path="/" element={<Home/>}/>
      <Route path="/taskview/:id" element={<TaskView/>}/>
      <Route path="/taskboard/:id" element={<TaskBoard/>}/>

      </Route>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/game/:id" element={<GameDetails />} /> {/* Ruta de detalles de juego */}
      <Route path="/search" element={<GameSearch />} />
    </Routes>
    </>
  )
}

export default App
