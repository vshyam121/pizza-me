import React, { Fragment } from 'react';
import NavigationItem from '../UI/NavigationItem/NavigationItem';
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
      <Fragment>
        <NavigationItem {...props} to='/my-orders' data-test='my-orders'>
          My Orders
        </NavigationItem>
        <NavigationItem {...props} onClick={handleSignOut} data-test='signout'>
          Sign Out
        </NavigationItem>
      </Fragment>
    );
  }
  return accountMenuItems;
};

AccountMenuItems.propTypes = {
  isAuthenticated: PropTypes.string,
};

export default AccountMenuItems;
