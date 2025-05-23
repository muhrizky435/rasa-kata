import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Curhat from './pages/Curhat'
import Curhat_hasil from './pages/Curhat_hasil'
import Feed from './pages/Feed'
import FeedDetail from './pages/feedDetail'

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show nothing while checking authentication status
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected content if authenticated
  return children;
};

// The main app with routes wrapped in AuthProvider
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
            />
          <Route 
            path="/curhat" 
            element={
              <ProtectedRoute>
                <Curhat />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/curhat_hasil" 
            element={
              <ProtectedRoute>
                <Curhat_hasil />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feed" 
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feed/:id" 
            element={
              <ProtectedRoute>
                <FeedDetail />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App