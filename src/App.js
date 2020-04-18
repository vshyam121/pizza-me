import React from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout/Layout";
import Home from "./components/Home/Home";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import { Route, Switch } from "react-router-dom";
import Cart from "./containers/Cart/Cart";

function App() {
  return (
    <Layout>
      <PizzaBuilder />
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
