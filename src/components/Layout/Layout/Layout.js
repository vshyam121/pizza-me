import React from "react";
import Header from "../../../containers/Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.scss";

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

export default Layout;
