import React from 'react';
import './AccountMenuItems.scss';
import NavigationItem from '../../Theme/NavigationItem/NavigationItem';
import PropTypes from 'prop-types';

/* Menu items that deal with account information, namely authentication and orders */
const AccountMenuItems = (props) => {
  const handleSignOut = () => {
    props.signOut();
  };

  let accountMenuItems = (
    <NavigationItem {...props} to='/signin' data-test='signin'>
      Sign In
    </NavigationItem>
  );
  if (props.isAuthenticated) {
    accountMenuItems = (
      <ul className='account-menu-items'>
        <NavigationItem {...props} to='/my-orders' data-test='my-orders'>
          My Orders
        </NavigationItem>
        <NavigationItem {...props} onClick={handleSignOut} data-test='signout'>
          Sign Out
        </NavigationItem>
      </ul>
    );
  }
  return accountMenuItems;
};

AccountMenuItems.propTypes = {
  isAuthenticated: PropTypes.string,
};

export default AccountMenuItems;
