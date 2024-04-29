import { useState, useEffect } from 'react';

import ProductCard from "./ProductCard"


export default function UserView({ productsData }) {
	
	<h2 className="text-center">Products Catalog</h2>

    const [ product, setProduct ] = useState([])

    useEffect(() => {
        const productArr = productsData.map(product => {
            console.log(product)
         
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
          
            { product }
        </>
        )
    
}


