import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text } from '@chakra-ui/react'

const LatestProductCard = ({ product }) => {
    return (
        <Card maxW='sm'>
            <CardBody maxHeight={"315px"}>
                <Image
                    src={product?.img1}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md' fontSize={"16px"} m="0px !important">{product?.title}</Heading>
                    <Text color="#8897a2" fontSize="10px" m="2px 0px 0px !important">{product?.manufacturer}</Text>
                    <Text color="#8897a2" fontSize="14px" m="0px !important">{product?.actual_price + product?.crossed_price}</Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default LatestProductCard;