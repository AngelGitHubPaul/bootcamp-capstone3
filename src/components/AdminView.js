import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {

    const [ products, setProducts ] = useState([])

    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td className="text-primary" colSpan="2">{product.name}</td>
                    <td colSpan="3">{product.description}</td>
                    <td colSpan="2">{product.price}</td>
                    <td colSpan="2" className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td colSpan="2"> 
                        <div>
                            <EditProduct product={product._id} fetchData={fetchData}/>
                            <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/>
                        </div>
                    </td>    
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData, fetchData])


    return(
        <>
            <h1 className="text-center my-3"> Admin Dashboard</h1>
            
            <div className="text-center m-3">
                <Link className="btn btn-primary m-2" to={`/addProduct`}>Add New Product</Link>
                <Link className="btn btn-danger m-2" to={`/orders`}>Show User orders</Link>
            </div>

            <Table striped bordered hover responsive className="mx-3 my-2">
                <thead>
                    <tr className="text-center">
                        <th className="text-white bg-dark" colSpan="2">Name</th>
                        <th className="text-white bg-dark" colSpan="3">Description</th>
                        <th className="text-white bg-dark" colSpan="2">Price</th>
                        <th className="text-white bg-dark" colSpan="2">Availability</th>
                        <th className="text-white bg-dark" colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}
