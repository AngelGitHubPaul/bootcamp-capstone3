import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

export default function AllOrders({ ordersData, fetchData }) {

    const [ orders, setOrders ] = useState([])

    useEffect(() => {
      const fetchProducts = async () => {
        let token = localStorage.getItem('token');
        const ordersArr = await Promise.all(
          ordersData.map(async (order) => {
            const orderUserResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/find-user`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                id: order.userId,
              })
            });

            if (!orderUserResponse.ok) {
              console.error('Failed to fetch user data');
              return null;
            }

            const orderUserData = await orderUserResponse.json();
            const orderUserEmail = orderUserData?.user?.email || 'Unknown User';

            const productsOrderedArr = await Promise.all(
              order.productsOrdered.map(async (product) => {
                try {
                  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product.productId}`);
                  const data = await response.json();
                  const productName = data.product.name;
                  return (
                    <ul key={product.productId}>
                      <li>
                        {productName} - Quantity: {product.quantity}
                      </li>
                    </ul>
                  );
                } catch (error) {
                  console.error('Error fetching product:', error);
                  return null;
                }
              })
            );

            return (
              <Accordion.Item key={order._id} eventKey={order._id}>
                <Accordion.Header>Orders for User: <strong className="text-primary">{orderUserEmail}</strong></Accordion.Header>
                <Accordion.Body>
                  <p>Purchased on: {order.orderedOn.slice(0, 10)}</p>
                  {productsOrderedArr}
                  <p>Total: <strong className="text-success">₱ {order.totalPrice}</strong></p>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        );

        setOrders(ordersArr.filter(Boolean)); 
      };


      fetchProducts();
    }, [ordersData]);



    return(
        <>
            <h1 className="text-center my-3"> Admin Dashboard</h1>
            
            <div className="text-center m-3">
                <Link className="btn btn-primary m-2" to={`/addProduct`}>Add New Product</Link>
                <Link className="btn btn-danger m-2" to={`/products`}>Show Product Details</Link>
            </div>

            <Accordion defaultActiveKey="0" className="mx-3 my-2">
                  {orders}
            </Accordion>
        </>

        )
}
