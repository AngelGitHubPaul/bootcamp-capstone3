import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminView({ productsData, fetchData }) {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td className="text-primary" colSpan="2">{product.name}</td>
                    <td colSpan="3">{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td> 
                        <div>
                            <p>update</p>
                            <p>archive/activate</p>
                        </div>
                    </td>    
                </tr>
                )
        })

        console.log(productsArr)
        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-3"> Admin Dashboard</h1>
            
            <div className="text-center m-3">
                <Link className="btn btn-primary mx-2" to={`/addProduct`}>Add New Product</Link>
                <Button variant="success" className="mx-2">Show User orders</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th className="text-white bg-dark" colSpan="2">Name</th>
                        <th className="text-white bg-dark" colSpan="3">Description</th>
                        <th className="text-white bg-dark">Price</th>
                        <th className="text-white bg-dark">Availability</th>
                        <th className="text-white bg-dark">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}