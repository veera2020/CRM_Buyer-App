/*
 *  Document    : Buttons.js
 *  Author      : ticvic
 *  Description : Custom button for all components
 */

import React from "react";

const Buttons = (props) => {
  const { ...others } = props;
  return (
    <button {...others} style={{ outline: "none" }}>
      {props.children}
    </button>
  );
};

export default Buttons;