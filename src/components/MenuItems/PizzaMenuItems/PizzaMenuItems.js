import React from 'react';
import './PizzaMenuItems.scss';
import NavigationItem from '../../Theme/NavigationItem/NavigationItem';

/* Menu items that display links to different categories of pizza */

const PizzaMenuItems = (props) => {
  return (
    <ul className='pizza-menu-items'>
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
    </ul>
  );
};

export default PizzaMenuItems;
