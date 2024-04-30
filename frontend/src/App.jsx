import { useState } from 'react'
import './App.css'
import Login from './allpages/Login/Login'
import Dashboard from './allpages/Dashboard/Dashboard'
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

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
