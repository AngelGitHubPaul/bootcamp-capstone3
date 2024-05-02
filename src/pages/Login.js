import { useState, useEffect , useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function Login() {

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
	     if(email !== '' && password !== ''){
	         setIsActive(true);
	     }else{
	         setIsActive(false);
	     }

	 }, [email, password]);

	function authenticate(e) {

	    e.preventDefault();
	    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
		    method: 'POST',
		    headers: {
		        "Content-Type": "application/json"
		    },
		    body: JSON.stringify({
		
		        email: email,
		        password: password
		
		    })
		})
		.then(res => res.json())
		.then(data => {

		    if(data.access){
		    	localStorage.setItem('token', data.access);

		       	retrieveUserDetails(data.access)

		        Swal.fire({
		        	title: "Login Successfull",
		        	icon: "success",
		        	text: "Welcome to Zuitt!"
		        })
		    
		    } else if (data.error === "No Email Found") {

		        Swal.fire({
		        	title: "Email not found",
		        	icon: "error",
		        	text: "Check your email and try again"
		        })

		    } else {

		        Swal.fire({
		        	title: "Authentication failed",
		        	icon: "error",
		        	text: "Check your login credentials and try again"
		        })
		    }
		})
		setEmail('');
		setPassword('');

	}

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setUser({
				id: data.user._id,
				isAdmin: data.user.isAdmin
			})
		})

	}


    return (    
        
    	(user.id !== null )
    	?
    	<Navigate to="/"/>
    	:
    	<Form onSubmit={(e) => authenticate(e)} className="mx-4">
    	    <h1 className="my-5 text-center">Login</h1>
    	    <Form.Group className="mb-3" controlId="userEmail">
    	        <Form.Label>Email address</Form.Label>
    	        <Form.Control 
    	            type="email" 
    	            placeholder="Enter email"
    	            value={email}
    	            onChange={(e) => setEmail(e.target.value)}
    	            required
    	        />
    	    </Form.Group>

    	    <Form.Group className="mb-3" controlId="password">
    	        <Form.Label>Password</Form.Label>
    	        <Form.Control 
    	            type="password" 
    	            placeholder="Password"
    	            value={password}
    	            onChange={(e) => setPassword(e.target.value)}
    	            required
    	        />
    	    </Form.Group>

    	    <div className="d-grid gap-2 mb-3">
	          { isActive ? 
	              <Button variant="primary" type="submit" id="submitBtn">
	                  Submit
	              </Button>
	              : 
	              <Button variant="danger" type="submit" id="submitBtn" disabled>
	                  Submit
	              </Button>
	          }
	        </div>
	        <p className="text-center">
		        Don't have an account yet? 
		        <Link className="primary" style={{ textDecoration: 'none' }} to={'/register'}> Click here </Link>
		         to register.
	        </p>
    	</Form>      
    )
}