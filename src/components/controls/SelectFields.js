/*
 *  Document    : InputFields.js
 *  Author      : ticvic
 *  Description : Custom input field
 */

import React from "react";

const SelectFields = (props) => {
  const { ...others } = props;
  return (
    <select id="framework" {...others} options={options}>
    
</select>
//   <input {...others} style={{ outline: 0 }} />
  );
};

export default SelectFields;