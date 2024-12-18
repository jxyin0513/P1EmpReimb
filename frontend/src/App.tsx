import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LogIn } from './Components/Auth/LogIn'
import { SignUp } from './Components/Auth/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
