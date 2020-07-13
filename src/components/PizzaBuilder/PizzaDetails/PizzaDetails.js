import React, { Component } from 'react';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Button, { primary } from '../../UI/Button/Button';
import PizzaDescription from '../../PizzaDescription/PizzaDescription';
import './PizzaDetails.scss';
import { calculatePrice } from '../../../shared/util';
import PropTypes from 'prop-types';

/* Shows pizza description, as well as options to change quantity and add/save to cart */
class PizzaDetails extends Component {
  state = {
    quantity: this.props.quantity,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.quantity !== nextProps.quantity ||
      this.props.pizza !== nextProps.pizza ||
      this.state.quantity !== nextState.quantity
    ) {
      return true;
    }
    return false;
  }

  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };

  render() {
    const price = calculatePrice(this.props.pizza, true);

    let save = null;
    if (this.props.itemId) {
      save = (
        <Button
          type={primary}
          onClick={() => this.props.saveToCart(this.state.quantity)}
        >
          Save Changes
        </Button>
      );
    } else {
      save = (
        <Button
          type={primary}
          onClick={() => this.props.addToCart(this.state.quantity)}
        >
          Add to Cart
        </Button>
      );
    }

    return (
      <div className='pizza-details'>
        <h3 className='builder-title'>My Pizza</h3>
        <div className='pizza-details__details'>
          <div className='pizza-details__description'>
            <PizzaDescription
              quantity={this.state.quantity}
              pizza={this.props.pizza}
            />
          </div>
          <div className='pizza-details__options'>
            <h2 className='pizza-details__price'>
              ${(price * this.state.quantity).toFixed(2)}
            </h2>
            <div className='pizza-details__quantity'>
              <Dropdown
                className='item__size'
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                value={this.state.quantity}
                onChange={this.handleChangeQuantity}
              />
            </div>
            <div className='pizza-details__save'>{save}</div>
          </div>
        </div>
      </div>
    );
  }
}

PizzaDetails.propTypes = {
  pizza: PropTypes.object.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default PizzaDetails;
