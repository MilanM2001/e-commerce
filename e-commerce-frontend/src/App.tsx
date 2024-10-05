import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './services/AuthContext'

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
