import React, { Component } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout/Layout';
import Home from './components/PizzaCategories/Home/Home';
import Meats from './components/PizzaCategories/Meats/Meats';
import Veggies from './components/PizzaCategories/Veggies/Veggies';
import Chicken from './components/PizzaCategories/Chicken/Chicken';
import PizzaBuilderContainer from './containers/PizzaBuilderContainer';
import { Route, Switch } from 'react-router-dom';
import CartContainer from './containers/CartContainer';
import SignInContainer from './containers/Auth/SignInContainer';
import SignOutContainer from './containers/Auth/SignOutContainer';
import SignUpContainer from './containers/Auth/SignUpContainer';
import { authenticateToken } from './store/auth/authActions/authActions';
import { connect } from 'react-redux';
import OrderType from './components/OrderType/OrderType';
import CheckoutContainer from './containers/CheckoutContainer';
import SidebarContainer from './containers/SidebarContainer';
import OrdersContainer from './containers/OrdersContainer';
import axiosAPI from './shared/axiosAPI';
import axios from 'axios';
import withErrorHandler from './hoc/withErrorHandler';

export class App extends Component {
  componentDidMount() {
    this.props.authenticateToken();
  }

  render() {
    return (
      <Layout data-test='layout'>
        <PizzaBuilderContainer data-test='pizzaBuilder' />
        <SidebarContainer data-test='sidebar' />
        <Switch>
          <Route exact path='/checkout' component={CheckoutContainer} />
          <Route path='/checkout/order-type' component={OrderType} />
          <Route path='/signin' component={SignInContainer} />
          <Route path='/signup' component={SignUpContainer} />
          <Route path='/my-orders' component={OrdersContainer} />
          <Route path='/signout' component={SignOutContainer} />
          <Route path='/cart' component={CartContainer} />
          <Route path='/' exact component={Home} />
          <Route path='/meats' exact component={Meats} />
          <Route path='/veggies' exact component={Veggies} />
          <Route path='/chicken' exact component={Chicken} />
        </Switch>
      </Layout>
    );
  }
}

export default connect(null, { authenticateToken })(
  withErrorHandler(withErrorHandler(App, axiosAPI), axios)
);
