import React from 'react';
import './Sidebar.scss';
import PizzaMenuItems from '../../components/PizzaMenuItems/PizzaMenuItems';
import AccountMenuItems from '../../components/AccountMenuItems/AccountMenuItems';
import NavigationItem from '../../components/UI/NavigationItem/NavigationItem';
import PropTypes from 'prop-types';

/* Sidebar menu with pizza menu items and account menu items */
const Sidebar = (props) => {
  const handleClickMenuItem = () => {
    props.closeSidebar();
  };

  let sidebarContainerClassNames = ['sidebar-container'];
  let sidebarClassNames = ['sidebar'];
  if (!props.sidebarOpen) {
    sidebarClassNames.push('sidebar--closed');
    sidebarContainerClassNames.push('sidebar-container--closed');
  }

  return (
    <div
      onClick={handleClickMenuItem}
      className={sidebarContainerClassNames.join(' ')}
    >
      <div className={sidebarClassNames.join(' ')}>
        <div className='sidebar__menu-items'>
          <PizzaMenuItems vertical />
        </div>
        <div className='sidebar__account'>
          <NavigationItem vertical to='/cart'>
            Cart
          </NavigationItem>
          <AccountMenuItems
            vertical
            isAuthenticated={props.isAuthenticated}
            signOut={props.signOut}
          />
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.string,
};

export default Sidebar;
