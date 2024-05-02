import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function Home() {

	const data = {
	    title: "ShopIt",
	    content: "Need it? Want it? Shop It!",
	    destination: "/products",
	    label: "Shop now!"
	}

	return(
		<>	
			<Container fluid>
			    <Row className="justify-content-center align-items-center my-2">
			      <Col xs={12} className="text-center">
			        <Image src="https://img.freepik.com/premium-vector/happy-family-shopping-father-mother-little-kids-holding-paper-bags-balloons-visiting-supermarket-purchases-children-with-parents-shop-market-weekend-cartoon-vector-illustration_1016-7011.jpg?w=826" fluid />
			      </Col>
			    </Row>
			</Container>

			<Banner data={data}/>
			<FeaturedProducts />
			<Highlights />
		</>
	)
}