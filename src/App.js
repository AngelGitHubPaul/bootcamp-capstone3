import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import {UserProvider} from './UserContext'

function App() {

  const [user,setUser] = useState({
      id: null,
      isAdmin: null
  })

  const unsetUser = () => {localStorage.clear()}

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if(data.user) {
              setUser({
                  id: data.user._id,
                  isAdmin: data.user.isAdmin
              })
          } else {
              setUser({
                  id: null,
                  isAdmin: null
              })
          }
          
      })
  }, [])


  return (
    <UserProvider value={{user, setUser , unsetUser}}>
        <Router>
            <Container fluid>
                <AppNavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/logout" element={<Logout />}/>
                    <Route path="*" element={<Error />} />
                </Routes>
            </Container>
        </Router>
    </UserProvider>
  );
}

export default App;