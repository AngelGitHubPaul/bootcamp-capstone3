import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import UserOrders from '../components/UserOrders';
import AllOrders from '../components/AllOrders';

export default function Products() {

	const { user } = useContext(UserContext);
	const [ orders, setOrders ] = useState([]); 

	const fetchData = () => {
		let fetchUrl = user.isAdmin === true 
			? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` 
			: `${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`

		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(typeof data.message !== "string") {
				if(user.isAdmin === true) {
					setOrders(data.orders);
				} else {
					setOrders(data.order);
				}
			} else {
				setOrders([]);
			}
		})

	}

	useEffect(() => {
		fetchData();

	}, [user])

	return(
		<>
			{
               	(user.isAdmin === true) 
               		?
                   	<AllOrders ordersData={orders} fetchData={fetchData}/>
                   	:
                   	<UserOrders ordersData={orders} />
           }
			
		</>
	)
}