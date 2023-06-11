import React from 'react';
import { Select } from '@chakra-ui/react';

const DropDown = ({ variant, options, setter }) => {
    return (
        <Select variant={variant} onChange={(e) => setter(e.target.value)}>
            {options?.map((option) => {
                return (
                    <option value={option?.value}>{option?.label}</option>
                )
            })}
        </Select>
    )
}

export default DropDown;