import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import AddProduct from './pages/AddProduct';
import Orders from './pages/Orders';
import Logout from './pages/Logout';
import Error from './pages/Error';
import AppFooter from './components/AppFooter'
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
            <Container fluid className="px-0">
                <AppNavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/products" element={<Products />}/>
                    <Route path="/product/:productId" element={<ProductView />}/>
                    <Route path="/addProduct" element={<AddProduct />} />
                    <Route path="/orders" element={<Orders />}/>
                    <Route path="/logout" element={<Logout />}/>
                    <Route path="*" element={<Error />} />
                </Routes>
                <AppFooter />
            </Container>
        </Router>
    </UserProvider>
  );
}

export default App;
