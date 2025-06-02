// import { useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useLocation, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Curhat from './pages/Curhat'
import Curhat_hasil from './pages/Curhat_hasil'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import FeedDetail from './pages/feedDetail'
import Register from './pages/Register'
import LandingPage from './pages/landing-page/Landing_page'
import { useAuth } from './contexts/AuthContext'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './pages/Layout'
import './sw.js';

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;
  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
};

const PublicRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

// Transition wrapper component
const AuthenticatdRoutes = () => {
  const location = useLocation();

  return (
    <div className="page-transition">
      <Routes location={location}>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard />
            }
          />
          <Route
            path="/curhat"
            element={
              <Curhat />
            }
          />
          <Route
            path="/curhat/:id"
            element={
              <Curhat />
            }
          />
          <Route
            path="/curhat_hasil"
            element={
              <Curhat_hasil />
            }
          />
          <Route
            path="/feed"
            element={
              <Feed />
            }
          />
          <Route
            path="/feed/:id"
            element={
              <FeedDetail />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <Router>
        <PublicRoutes />
        <AuthenticatdRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;