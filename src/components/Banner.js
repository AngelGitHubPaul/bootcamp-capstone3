import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({data}) {

    const {title, content, destination, label} = data;

    return (
        <Row>
            <Col className="p-5 text-center">
                <h1>{title}</h1>
                <h3>{content}</h3>
                <Link className="btn btn-primary" to={destination}>{label}</Link>
            </Col>
        </Row>
    )
}