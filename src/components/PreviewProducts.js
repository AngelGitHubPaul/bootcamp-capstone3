import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewPropducts(props) {

	const { breakPoint, data } = props;

	const {_id, name, price } = data

	return(
		<Col xs={12} md={breakPoint}>
			<Card className="cardHighlight mx-2">
			    <Card.Body>
			        <Card.Title className='text-center'>
			        	<Link to={`/product/${_id}`}>{name}</Link>
			        </Card.Title>
			    </Card.Body>
			    <Card.Footer>
			    	<h5 className="text-center">PHP {price}</h5>
			    	<Link className="btn btn-primary d-block" to={`/product/${_id}`}>Details</Link>
			    </Card.Footer>
			</Card>
		</Col>
	)
}