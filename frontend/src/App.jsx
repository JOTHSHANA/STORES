import { useState } from 'react'
import './App.css'
import Login from './allpages/Login/Login'
import Dashboard from './allpages/Dashboard/Dashboard'
import TaskForm from './allpages/TaskForm/TaskForm'
import Welcome from './allpages/Welcome/welcome'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTasks from './allpages/AllTasks/AllTasks'
import Error from './allpages/error'
import Holidays from './allpages/Holidays/Holidays'
import MyTasks from './allpages/WorkSpace/Mytasks'
import Approvals from './allpages/Approvals/Approvals'
import Explore from './allpages/Explore/Explore'
import History from './allpages/History/History'

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
          <Route path='/taskform' element={<TaskForm />} />
          <Route path='/alltasks' element={<AllTasks />} />
          <Route path='/mytasks' element={<MyTasks />} />
          <Route path='/holidays' element={<Holidays />} />
          <Route path='/approvals' element={<Approvals />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/history' element={<History />} />

          <Route path='*' element={<Error />} />
          
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
