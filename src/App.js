import React, { Component } from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout/Layout";
import Home from "./components/Home/Home";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import { Route, Switch } from "react-router-dom";
import Cart from "./containers/Cart/Cart";
import SignIn from "./containers/Auth/SignIn/SignIn";
import SignOut from "./containers/Auth/SignOut/SignOut";
import { checkAuthentication } from "./store/auth/authActions";
import { connect } from "react-redux";

class App extends Component {

  componentDidMount() {
    this.props.checkAuthentication();
  }


  render() {
    return (
      <Layout>
        <PizzaBuilder />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(null, { checkAuthentication } )(App);
