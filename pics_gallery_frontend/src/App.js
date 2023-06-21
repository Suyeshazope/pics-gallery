import React, { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes , Route , useNavigate, Router } from 'react-router-dom' ;
import Login from './components/Login';
import Home from './container/Home';
import { fetchUser } from './utils/fetchUser';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='Login' element={<Login />} />
//       <Route path='/*' element={<Home />} />
//     </Routes>
//   )
// }

const App = () => {
  const navigate = useNavigate() ;

  useEffect(() => {
    const user = fetchUser() ;

    if(!user) navigate('/login')
  } , [])
  return (
    <GoogleOAuthProvider clientId= {`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
      {/* <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} /> */}
    </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
