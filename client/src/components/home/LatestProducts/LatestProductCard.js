import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react'

const LatestProductCard = ({ product }) => {
    let productTitle = "";
    if (product?.title?.length > 30) {
        productTitle = product?.title?.slice(0, 30) + "...";
    }
    else {
        productTitle = product?.title;
    }

    return (
        <Card maxW='sm'>
            <CardBody style={{ cursor: "pointer" }}>
                <Image
                    src={product?.img1}
                    alt='...'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' fontSize={"16px"} m="0px !important">{productTitle}</Heading>
                    <Text color="#8897a2" fontSize="10px" m="2px 0px 0px !important">{product?.manufacturer}</Text>
                    <Text color="#8897a2" fontSize="14px" m="0px !important">{product?.actual_price + product?.crossed_price}</Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default LatestProductCard;