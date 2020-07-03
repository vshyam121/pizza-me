import React from "react";
import Header from "../../../containers/Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.scss";
import PropTypes from "prop-types";

/* Overall app layout */
const Layout = props => {
  return (
    <div className="layout">
      <Header />
      <main className="main">{props.children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array
}

export default Layout;
