import LandingPage from './views/LandingPage'
import '/src/assets/styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/LoginPage'
import SignUp from './views/SignUpPage'
import Feedback from './components/landingpages/Feedback'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='login' element={<LoginPage/>} />
      <Route path='signup' element={<SignUp/>} />
      <Route path='feedback' element={<Feedback/>} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
