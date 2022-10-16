import React from "react";
import "./Header.scss";
import Logo from "../../assets/img/logo.svg";
import LogoSmall from "../../assets/img/logo-small.svg";

const Header = () => {
  return (
    <header>
      <img src={Logo} className="logo" />
      <img src={LogoSmall} className="logo-small" />
    </header>
  );
};

export default Header;
