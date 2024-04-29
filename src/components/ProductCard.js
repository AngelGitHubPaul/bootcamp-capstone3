import { useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {

    const { _id, name, description, price } = productProp;

    return (

        <Col sm={4} className='my-2'>
            <Card id="productComponent1">
                <Card.Body>
                    <Card.Title className='text-primary text-uppercase text-center'>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text className='text-warning'>₱ {price}</Card.Text>
                    <Card.Footer className='text-center'>
                    <div className="d-grid gap-2">
                    <Link className="btn btn-primary" to={`/product/${_id}`}>Details</Link>
                    </div>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>



    );
}
