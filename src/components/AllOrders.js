import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

export default function AllOrders({ ordersData, fetchData }) {

    const [ orders, setOrders ] = useState([])

    useEffect(() => {
      const fetchProducts = async () => {
        const ordersArr = await Promise.all(
          ordersData.map(async (order) => {
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
                <Accordion.Header>Orders for User: <strong className="text-warning">{order.userId}</strong></Accordion.Header>
                <Accordion.Body>
                  <p>Purchased on: {order.orderedOn.slice(0, 10)}</p>
                  {productsOrderedArr}
                  <p>Total: <strong className="text-warning">{order.totalPrice}</strong></p>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        );
        setOrders(ordersArr);
      };

      fetchProducts();
    }, [ordersData]);


    return(
        <>
            <h1 className="text-center my-3"> Admin Dashboard</h1>
            
            <div className="text-center m-3">
                <Link className="btn btn-primary mx-2" to={`/addProduct`}>Add New Product</Link>
                <Link className="btn btn-danger mx-2" to={`/products`}>Show Product Details</Link>
            </div>

            <Accordion defaultActiveKey="0">
                  {orders}
            </Accordion>
        </>

        )
}
