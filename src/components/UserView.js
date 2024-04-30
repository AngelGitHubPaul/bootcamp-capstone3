import { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import ProductCard from "./ProductCard"


export default function UserView({ productsData }) {
	

    const [ product, setProduct ] = useState([])

    useEffect(() => {
        const productArr = productsData.map(product => {
         
            if(product.isActive === true) {
                return (
                    <ProductCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })
		

       
        setProduct(productArr)

    }, [productsData])

	return(
        <>
        	 <h2 className="text-center my-2">Our Products</h2>

            <Container>
                <Row> 
                     { product } 
                </Row>
            </Container>
        </>
        )
    
}


