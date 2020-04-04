import React from "react";
import "./App.scss";
import Layout from "./components/Layout/Layout/Layout";
import Home from "./components/Home/Home";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import { connect } from "react-redux";

function App(props) {
  return (
    <Layout>
      <PizzaBuilder
        show={props.showPizzaBuilder}
        crust={props.crust}
        size={props.size}
        toppings={props.toppings}
      />
      <Home />
    </Layout>
  );
}

const mapStateToProps = state => ({
  crust: state.pizzaBuilder.crust,
  size: state.pizzaBuilder.size,
  toppings: state.pizzaBuilder.toppings,
  showPizzaBuilder: state.pizzaBuilder.showPizzaBuilder
});

export default connect(mapStateToProps, null)(App);
