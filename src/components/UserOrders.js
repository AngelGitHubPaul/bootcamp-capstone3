    import { useState, useEffect } from "react";
    import { Table } from "react-bootstrap";
    import Swal from "sweetalert2";
    import { useNavigate } from "react-router-dom";

    export default function UserOrders() {
        const [orders, setOrders] = useState([]);
        const navigate = useNavigate();
    
        const fetchData = () => {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.error === "No orders found") {
                    Swal.fire({
                        title: "No orders found.",
                        icon: 'error',
                    });
                    navigate("/products");
                } else {
                    console.log(data);
                    const OrderArr = data.orders.map(order => (
                        <tr className="text-center" key={order._id}>
                            <td>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {order.productsOrdered.map((productsOrdered, index) => (
                                        <li key={index}>
                                            {productsOrdered.productId}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {order.productsOrdered.map((productsOrdered, index) => (
                                        <li key={index}>
                                            {productsOrdered.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{new Date(order.orderedOn).toLocaleDateString()}</td>
                            <td className="text-success">₱{order.totalPrice}</td>
                        </tr>
                    ));
                    setOrders(OrderArr);
                }
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
        };
    
        useEffect(() => {
            fetchData();
        }, []);
    
        return (
            <>
                <h2 className="text-center">Order History</h2>
                <Table striped bordered hover responsive variant="primary">
                    <thead>
                    <tr className="text-center fw-bold">
                            <th className="text-white bg-dark" >Name</th>
                            <th className="text-white bg-dark" >Quantity</th>
                            <th className="text-white bg-dark" >Date</th>
                            <th className="text-white bg-dark" >Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders}
                    </tbody>
                </Table>
            </>
        );
    }