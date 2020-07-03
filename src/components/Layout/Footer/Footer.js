import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

/* Footer containing informational links */
const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <Link to="#">ABOUT</Link>
        <Link to="#">CONTACT US</Link>
        <Link to="#">CAREERS</Link>
        <Link to="#">PRIVACY POLICY</Link>
        <Link to="#">TERMS</Link>
      </div>
    </footer>
  );
};

export default Footer;
