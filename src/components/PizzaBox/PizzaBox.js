import React from 'react';
import './PizzaBox.scss';
import Dropdown from '../../components/Theme/Dropdown/Dropdown';
import Button from '../../components/Theme/Button/Button';
import { crustMetadataMapping } from '../../metadata/crustMetadata';
import { sizes } from '../../metadata/sizeMetadata';
import { primary, secondary } from '../../components/Theme/Button/Button';
import { calculatePrice, normalizePizza, getCrust } from '../../shared/util';
import PropTypes from 'prop-types';

/* UI box container that holds an pizza and lets user customize various pizza properties.
   Can add pizza to order and also build your own pizza from here. */
const PizzaBox = (props) => {
  const handleAddToCart = () => {
    let pizza = { ...props.pizza };
    pizza.crust = getCrust(pizza.crust);
    props.addToCart(props.cartId, normalizePizza(pizza), props.quantity);
    props.resetState();
  };

  const crustOptions = Object.entries(crustMetadataMapping).map(
    ([crust, crustMetadata]) => {
      return (
        crust +
        (crustMetadata.additionalDisplay
          ? ` ${crustMetadata.additionalDisplay}`
          : '')
      );
    }
  );

  const sizeOptions = sizes;
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let pizza = { ...props.pizza };
  pizza.crust = getCrust(pizza.crust);
  const price = calculatePrice(pizza);

  let pizzaAdd = null;
  let pizzaName = null;
  let customize = null;
  let customizeSecondary = null;

  if (props.buildPizza) {
    pizzaAdd = (
      <Button type={primary} onClick={props.handleClickBuild}>
        Get Started
      </Button>
    );
    pizzaName = 'Build Your Own';
    customize = <div className='empty-button'></div>;
  } else {
    pizzaAdd = (
      <React.Fragment>
        <div className='pizza-box__quantity'>
          <Dropdown
            onChange={props.handleChangeQuantity}
            options={quantityOptions}
            value={props.quantity}
            label='quantity'
          />
        </div>
        <Button type={primary} onClick={handleAddToCart}>
          Add to Order
        </Button>
      </React.Fragment>
    );
    pizzaName = props.pizzaType;
    customize = (
      <Button type={secondary} onClick={props.handleClickBuild}>
        Customize
      </Button>
    );
    customizeSecondary = (
      <span
        className='pizza-box__customize link'
        onClick={props.handleClickBuild}
      >
        Customize
      </span>
    );
  }

  return (
    <div className='pizza-box'>
      <div className='pizza-box__details'>
        <h2 className='pizza-box__name'>{pizzaName} Pizza</h2>

        {customizeSecondary}

        <h3 className='pizza-box__price'>
          ${(props.quantity * price).toFixed(2)}
        </h3>
        <div className='pizza-box__options'>
          <div className='pizza-box__crust'>
            <Dropdown
              options={crustOptions}
              onChange={props.handleChangeCrust}
              value={props.pizza.crust}
              label='crust'
            />
          </div>
          <div className='pizza-box__size'>
            <Dropdown
              options={sizeOptions}
              onChange={props.handleChangeSize}
              value={props.pizza.size}
              label='size'
            />
          </div>
          <div className='pizza-box__add'>{pizzaAdd}</div>
        </div>
      </div>
      <div className='pizza-box__right'>
        <img
          className='pizza-box__image'
          src={props.imageSrc}
          alt={pizzaName}
        />
        {customize}
      </div>
    </div>
  );
};

PizzaBox.propTypes = {
  priceType: PropTypes.string.isRequired,
  pizzaType: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  pizzaName: PropTypes.string,
};

export default PizzaBox;
