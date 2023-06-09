import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductsGrid from '../../products/ProductGrid';
import { getLatestProducts } from '../../../api/api';
import { Heading } from '@chakra-ui/react';
import LatestProductCard from './LatestProductCard';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getLatestProducts().then((res) => {
            console.log(res);
            setProducts(res?.data?.data);
        });
    }, []);

    return (
        <div>
            <Container>
                <Heading size="md" m="1rem" style={{ color: "#55585e" }}>
                    Our Latest Products
                </Heading>

                <Row>
                    {products?.map((product) => {
                        return (
                            <Col lg={2}><LatestProductCard product={product} /></Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default LatestProducts;