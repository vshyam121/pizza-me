import React from 'react';
import './NavigationItem.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Standard navigation item that is part of either the header or sidebar menus */
const NavigationItem = (props) => {
  let contentClassNames = ['navigation-item__content'];
  let linkClassNames = ['navigation-item__link'];
  if (props.vertical) {
    contentClassNames.push('navigation-item__content--vertical');
    linkClassNames.push('navigation-item__link--vertical');
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
      <Link
        className={linkClassNames.join(' ')}
        onClick={props.onClick}
        to={props.to}
      >
        {navigationItemContent}
      </Link>
    );
  } else {
    navigationItem = (
      <span className={linkClassNames.join(' ')} onClick={props.onClick}>
        {navigationItemContent}
      </span>
    );
  }

  return <li className='navigation-item'>{navigationItem}</li>;
};

NavigationItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  vertical: PropTypes.bool,
};

export default NavigationItem;
