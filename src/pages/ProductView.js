import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();
	const { productId } = useParams()

	const [ name, setName ] = useState("");
	const [ description, setDescription] = useState("");
	const [ price, setPrice ] = useState(0);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		console.log(productId);

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)

			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price);
		})

	}, [productId]);

	const incrementQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const checkout = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				userId: user.id,
				cartItems: [{
					productId: productId,
					quantity: quantity,
					subtotal: price*quantity
				}],
				totalPrice: price*quantity
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.message)


			if (data.message === 'Successfully Added Order') {
				Swal.fire({
					title: "Checkout Successful!",
					icon: 'success',
					text: "You have successfully checked out."
				})
				navigate("/products");

			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: 'error',
					text: "Please try again."
				})				
			}

		})
	}


	return (
		(user.isAdmin === true) 
		? <Navigate to="/"/> :
		<Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                    	<Card.Header className="text-center text-white bg-dark">{name}</Card.Header>
                        <Card.Body>
                            <Card.Text>{description}</Card.Text>
                            <Card.Text>Price: <strong className="text-warning">₱{price}</strong></Card.Text>
                            <Card.Text>Quantity:</Card.Text>
                            <Card.Text>
                            	<div className="d-flex">
	                            	<Button variant="dark" onClick={decrementQuantity}>-</Button>
	                            	
	                            	<Form.Control
	                            		className="text-center mx-2"
							            type="number"
							            min="1"
							            value={quantity}
							            onChange={e => {setQuantity(e.target.value)}}
							            style={{ width: '100px'}}
							        />

	                            	<Button variant="dark" onClick={incrementQuantity}>+</Button>
                            	</div>
                            </Card.Text>
                        </Card.Body>    
                        <Card.Footer>
                        	<div className="d-grid gap-2">
	                    	    { user.id !== null
	                    	    	?
	                    	    	<Button variant="primary" onClick={() => checkout(productId)}>Checkout</Button>
	                    	    	:
	                    	    	<Link className="btn btn-danger" to="/login">Log in to Checkout</Link>

	                    		}
	                    	</div>
                        </Card.Footer>    
                    </Card>
                </Col>
            </Row>
        </Container>

	)
}