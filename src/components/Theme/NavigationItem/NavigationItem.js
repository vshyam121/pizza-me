import React from 'react';
import './NavigationItem.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Standard navigation item that is part of either the header or sidebar menus */
const NavigationItem = (props) => {
  let contentClassNames = ['navigation-item__content'];
  let itemClassNames = ['navigation-item'];
  if (props.vertical) {
    contentClassNames.push('navigation-item__content--vertical');
    itemClassNames.push('navigation-item--vertical');
  }
  let navigationItemContent = null;

  navigationItemContent = (
    <span className={contentClassNames.join(' ')}>
      <h2>{props.children}</h2>
    </span>
  );

  let navigationItem = null;
  if (props.to) {
    navigationItem = (
      <Link onClick={props.onClick} to={props.to}>
        {navigationItemContent}
      </Link>
    );
  } else {
    navigationItem = (
      <span onClick={props.onClick}>{navigationItemContent}</span>
    );
  }

  return <div className={itemClassNames.join(' ')}>{navigationItem}</div>;
};

NavigationItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  vertical: PropTypes.bool,
};

export default NavigationItem;
