import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/NavBar'
import AppRoutes from './routes/AppRoutes'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
