import React from 'react';
import Badge from 'react-bootstrap/Badge';

const CustomBadge = ({ bgColor, badgeText }) => {
    return (
        <div>
            <Badge bg={bgColor} style={{ width: "80px" }}>{badgeText}</Badge>
        </div>
    )
}

export default CustomBadge;