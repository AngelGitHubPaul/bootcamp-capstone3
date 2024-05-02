import { Row, Col, Card } from 'react-bootstrap';


export default function Highlights() {
	return (
		<Row className="my-5 mx-4">
			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3" >
				  <Card.Body>
				    <Card.Title className="text-center">
				    	<h2>Shop smarter, not harder</h2>
				    </Card.Title>
				    <Card.Text className="text-justify">
				      Save time and money with ShopIt's unbeatable deals on everyday essentials. Whether you're stocking up on household staples, refreshing your wardrobe, or treating yourself to a little indulgence, ShopIt makes it easy to shop smarter and stretch your budget further without compromising on quality or convenience.
				    </Card.Text>
				  </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3" >
				  <Card.Body>
				    <Card.Title className="text-center">
				    	<h2>Discover the perfect gift for every occasion</h2>
				    </Card.Title>
				    <Card.Text className="text-justify">
				      Whether it's a birthday, anniversary, or holiday celebration, ShopIt has you covered with an array of thoughtful gifts for every special moment. Browse through our diverse selection of products, ranging from unique keepsakes to luxurious treats, and make gift-giving a delightful experience every time.
				    </Card.Text>
				  </Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={4}>
				<Card className="cardHighlight p-3" >
				  <Card.Body>
				    <Card.Title className="text-center">
				    	<h2>Elevate your style with ShopIt</h2>
				    </Card.Title>
				    <Card.Text className="text-justify">
				      Dive into ShopIt's meticulously curated selection of fashion items, meticulously chosen to reflect the latest trends and timeless classics alike. From chic apparel to statement accessories, ShopIt ensures you'll always find the perfect pieces to elevate your personal style and make a lasting impression.
				    </Card.Text>
				  </Card.Body>
				</Card>
			</Col>
		</Row>
	)
}