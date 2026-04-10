import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardStudent from './pages/DashboardStudent'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Quiz from './pages/Quiz'
import DashboardTeacher from './pages/DashboardTeacher'
import Profile from './pages/Profile'
import DashboardAdmin from './pages/DashboardAdmin'
import Devoirs from './pages/Devoirs'
import Multimedia from './pages/Multimedia'
import Notes from './pages/Notes'
import Interactions from './pages/Interactions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardStudent />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/teacher" element={<DashboardTeacher />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/devoirs" element={<Devoirs />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/interactions" element={<Interactions />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App