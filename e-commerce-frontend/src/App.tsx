import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './services/AuthContext'
import store from './store/store';
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store} >
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

export default App
