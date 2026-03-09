import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LessonPage from './pages/LessonPage.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lesson/:moduleId/:lessonId" element={<LessonPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}
