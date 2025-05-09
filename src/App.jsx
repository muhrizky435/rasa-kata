import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Curhat from './pages/Curhat'
import Curhat_hasil from './pages/Curhat_hasil'
import Feed from './pages/Feed'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/curhat" element={<Curhat />} />
        <Route path="/curhat_hasil" element={<Curhat_hasil />} />
        <Route path="/Feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App