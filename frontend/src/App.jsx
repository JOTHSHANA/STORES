import { useState } from 'react'
import './App.css'
import Login from './allpages/Login/Login'
import Dashboard from './allpages/Dashboard/Dashboard'
import TaskForm from './allpages/TaskForm/TaskForm'
import Welcome from './allpages/Welcome/welcome'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkSpace from './allpages/WorkSpace/WorkSpace'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/taskform' element={<TaskForm />}/>
          <Route path='/workspace' element={<WorkSpace />}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
