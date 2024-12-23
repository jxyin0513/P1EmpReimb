import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LogIn } from './Components/Auth/LogIn'
import { SignUp } from './Components/Auth/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfile from './Components/Users/UserProfile'
import { UserContext } from './Components/Context';
import { useEffect, useState } from 'react';
import { ManagerProfile, User } from './Components/Users/ManagerProfile';
import { ModalProvider } from './Components/Modal';

function App() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
});

useEffect(() => {
  if (user) {
      localStorage.setItem('user', JSON.stringify(user));
  } else {
      localStorage.removeItem('user');
  }
}, [user]);

  return (
    <>
      <ModalProvider>
        <UserContext.Provider value={{user, setUser}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/user/reimbursements' element={<UserProfile />} />
              <Route path='/manage/profile' element={<ManagerProfile />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ModalProvider>
    </>
  )
}

export default App
