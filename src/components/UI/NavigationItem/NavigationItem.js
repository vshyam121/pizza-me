import React from 'react';
import './NavigationItem.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Standard navigation item that is part of either the header or sidebar menus */
const NavigationItem = (props) => {
  let classNames = ['navigation-item__text'];
  if (props.vertical) {
    classNames.push('navigation-item__text--vertical');
  }
  let navigationItemContent = null;

  navigationItemContent = (
    <span className={classNames.join(' ')}>
      <h3>{props.children}</h3>
    </span>
  );

  let navigationItem = null;
  if (props.to) {
    navigationItem = (
      <Link onClick={props.onClick} to={props.to} className='navigation-item'>
        {navigationItemContent}
      </Link>
    );
  } else {
    navigationItem = (
      <span onClick={props.onClick} className='navigation-item'>
        {navigationItemContent}
      </span>
    );
  }

  return navigationItem;
};

NavigationItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  vertical: PropTypes.bool,
};

export default NavigationItem;
