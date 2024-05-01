import { useState } from 'react'
import './App.css'
import Login from './allpages/Login/Login'
import Dashboard from './allpages/Dashboard/Dashboard'
import TaskForm from './allpages/TaskForm/TaskForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/taskform' element={<TaskForm />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
