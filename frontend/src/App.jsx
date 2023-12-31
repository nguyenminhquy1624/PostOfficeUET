import LandingPage from './views/LandingPage'
import '/src/assets/styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './views/LoginPage'
import SignUp from './views/SignUpPage'
import Feedback from './components/landingpages/Feedback'
import AdminPage from './views/AdminPage'
import StorageLeaderPage from './views/StorageLeaderPage'
import TransactionStaff from './views/TransactionStaff'
import StorageStaff from './views/StorageStaff'
import CustomerPage from './views/CustomerPage'
import SignUpPage from './views/SignUpPage'
import LogoutPage from './views/LogoutPage'
import TransactionLeaderPage from './views/TransactionLeaderPage'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='signup' element={<SignUpPage />} />
      <Route path='admin' element={<AdminPage />} />
      <Route path='login' element={<LoginPage/>} />
      <Route path='signup' element={<SignUp/>} />
      <Route path='logout' element={<LogoutPage />} />
      <Route path='feedback' element={<Feedback/>} />
      <Route path='storageLeader' element={<StorageLeaderPage/>} />
      <Route path='transactionStaff' element={<TransactionStaff/>} />
      <Route path='storageStaff' element={<StorageStaff/>} />
      <Route path='customer' element={<CustomerPage/>} />
      <Route path='transactionLeader' element={<TransactionLeaderPage />} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
