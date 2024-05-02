import { Card, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {

    const { _id, name, price } = productProp;

    return (

        <Col sm={4} className='my-2'>
            <Card id="productComponent1">
                <Card.Img variant="top" src="https://img.freepik.com/free-vector/flat-dia-cliente-illustration_23-2149558849.jpg?w=740&t=st=1714636698~exp=1714637298~hmac=a32da72922d61f6a7224d799ee4f1fc253206da2a71b34ad5515d05f8acb07db" />
                <Card.Body>
                    <Card.Title className='text-primary text-uppercase text-center'>{name}</Card.Title>
                    <Card.Text className='text-success'>₱ {price}</Card.Text>
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
