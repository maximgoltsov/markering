import React from "react";
import "./SuccessMessage.scss";
import ManSvg from "../../assets/img/man.svg";
import TextSvg from "../../assets/img/text.svg";

const SuccessMessage = () => {
  return (
    <div className="successMessage">
      <img src={ManSvg} className="successMessage_man" />
      <img src={TextSvg} className="successMessage_text" />
      <div className="successMessage_floor"></div>
    </div>
  );
};

export default SuccessMessage;
