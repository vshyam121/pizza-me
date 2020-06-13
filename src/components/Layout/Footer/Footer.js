import React from "react";
import "./Footer.scss";

/* Footer containing helpful links */
const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
        <a href="#">CAREERS</a>
        <a href="#">PRIVACY POLICY</a>
        <a href="#">TERMS</a>
      </div>
    </footer>
  );
};

export default Footer;
