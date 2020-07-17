import React from 'react';
import './PizzaMenuItems.scss';
import NavigationItem from '../UI/NavigationItem/NavigationItem';

/* Menu items that display links to different categories of pizza */

const PizzaMenuItems = (props) => {
  return (
    <div className='pizza-menu-items'>
      <NavigationItem {...props} onClick={props.onClick} to='/'>
        Popular
      </NavigationItem>
      <NavigationItem {...props} onClick={props.onClick} to='/meats'>
        Meats
      </NavigationItem>
      <NavigationItem {...props} onClick={props.onClick} to='/chicken'>
        Chicken
      </NavigationItem>
      <NavigationItem {...props} onClick={props.onClick} to='/veggies'>
        Veggies
      </NavigationItem>
    </div>
  );
};

export default PizzaMenuItems;
