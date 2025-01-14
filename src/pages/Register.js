import { useState, useEffect , useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext)

	const [ firstName, setFirstName] = useState("");
	const [ lastName, setLastName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ mobileNo, setMobileNo ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ isActive , setIsActive ] = useState(false);
	const [ userRegistered , setUserRegistered ] = useState(false);
	
	useEffect(() => {
		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password, confirmPassword])


	function registerUser(e) {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_BASE_URL}/users/`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data.message === "Registered Successfully") {
				setFirstName("");
				setLastName("");
				setEmail("");
				setMobileNo("");
				setPassword("");
				setConfirmPassword("");

				Swal.fire({
					title: "User Registered",
					icon: 'success',
				}).then(()=> {
					setUserRegistered(true)
				})


			} else if (data.error === "Email invalid") {

				Swal.fire({
					title: "Email is invalid",
					icon: "error",
				})

			} else if (data.error === "Mobile number invalid") {

				Swal.fire({
					title: "Mobile number is invalid",
					icon: "error",
				})

			} else if (data.error === "Password must be at least 8 characters") {

				Swal.fire({
					title: "Password must be at least 8 characters",
					icon: "error",
				})

			} else {

				Swal.fire({
					title: "Something went wrong",
					icon: "error",
				})
			}
		})
	}

	if (userRegistered) {
		return <Navigate to="/login" />
	}

	return (
		(user.id !== null) 
		? <Navigate to="/"/> :
		<Form onSubmit={(e) => registerUser(e)} className="mx-4">
		<h1 className="my-5 text-center">Register</h1>

		<Form.Group className="mb-3" controlId="firstName">
			<Form.Label>First Name</Form.Label>
			<Form.Control 
			type="text" 
			placeholder="Enter First Name" 
			required
			value={firstName}
			onChange={e => {setFirstName(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="lastName">
			<Form.Label>Last Name</Form.Label>
			<Form.Control 
			type="text" 
			placeholder="Enter Last Name" 
			required
			value={lastName}
			onChange={e => {setLastName(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="email">
			<Form.Label>Email:</Form.Label>
			<Form.Control 
			type="email" 
			placeholder="Enter Email"
			required
			value={email}
			onChange={e => {setEmail(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="mobileNo">
			<Form.Label>Mobile No:</Form.Label>
			<Form.Control 
			type="number" 
			placeholder="Enter 11 Digit No." 
			required
			value={mobileNo}
			onChange={e => {setMobileNo(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="password">
			<Form.Label>Password</Form.Label>
			<Form.Control 
			type="password" 
			placeholder="Enter Password" 
			required
			value={password}
			onChange={e => {setPassword(e.target.value)}}
			/>
		</Form.Group>

		<Form.Group className="mb-3" controlId="confirmPassword">
			<Form.Label>Confirm Password</Form.Label>
			<Form.Control 
			type="password" 
			placeholder="Confirm Password" 
			required
			value={confirmPassword}
			onChange={e => {setConfirmPassword(e.target.value)}}
			/>
		</Form.Group>

	    <div className="d-grid gap-2 mb-3">
          { isActive ? 
              <Button variant="primary" type="submit" id="submitBtn">
                  Submit
              </Button>
              : 
              <Button variant="danger" type="submit" id="submitBtn" disabled>
                  Please enter your registration details
              </Button>
          }
        </div>

		<p className="text-center">
	        Already have an account? 
	        <Link className="primary" style={{ textDecoration: 'none' }} to={'/login'}> Click here </Link>
	         to login.
        </p>

		</Form>
	)
}