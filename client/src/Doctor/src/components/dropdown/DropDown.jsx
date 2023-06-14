import React from "react";
import { Select } from "@chakra-ui/react";

const DropDown = ({ variant, options, setter, value }) => {
  return (
    <Select
      value={value}
      variant={variant}
      onChange={(e) => setter(e.target.value)}
      style={{ fontSize: "14.5px", height: "35px" }}
    >
      {options?.map((option) => {
        return <option value={option?.value}>{option?.label}</option>;
      })}
    </Select>
  );
};

export default DropDown;
