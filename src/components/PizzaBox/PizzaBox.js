import React from 'react';
import './PizzaBox.scss';
import Dropdown from '../../components/UI/Dropdown/Dropdown';
import Button from '../../components/UI/Button/Button';
import { crustMetadataMapping } from '../../metadata/crustMetadata';
import { sizes } from '../../metadata/sizeMetadata';
import { primary, secondary } from '../../components/UI/Button/Button';
import { calculatePrice, normalizePizza, getCrust } from '../../shared/util';
import PropTypes from 'prop-types';

/* UI box container that holds an pizza and lets user customize various pizza properties.
   Can add pizza to order and also build your own pizza from here. */
const PizzaBox = (props) => {
  const handleAddToCart = () => {
    let pizza = { ...props.pizza };
    pizza.crust = getCrust(pizza.crust);
    props.addToCart(normalizePizza(pizza), props.quantity);
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
      <h3 className='pizza-box__name'>{pizzaName} Pizza</h3>
      <div className='pizza-box__container'>
        <div className='pizza-box__details'>
          {customizeSecondary}

          <h4 className='pizza-box__price'>
            ${(props.quantity * price).toFixed(2)}
          </h4>
          <div className='pizza-box__options'>
            <div className='pizza-box__crust'>
              <Dropdown
                options={crustOptions}
                onChange={props.handleChangeCrust}
                value={props.pizza.crust}
              />
            </div>
            <div className='pizza-box__size'>
              <Dropdown
                options={sizeOptions}
                onChange={props.handleChangeSize}
                value={props.pizza.size}
              />
            </div>
            <div className='pizza-box__add'>{pizzaAdd}</div>
          </div>
        </div>
        <div className='pizza-box__right'>
          <img
            className='pizza-box__image'
            src={props.imageSrc}
            alt={props.pizzaName}
          />
          {customize}
        </div>
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
