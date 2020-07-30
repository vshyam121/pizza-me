import React from 'react';
import { connect } from 'react-redux';
import { closeSidebar } from '../store/ui/uiActions/uiActions';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';
import { signOut } from '../store/auth/authActions/authActions';

/* Container for sidebar menu with pizza menu items and account menu items */
const SidebarContainer = (props) => {
  return <Sidebar {...props} />;
};

SidebarContainer.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = (state) => ({
  sidebarOpen: state.ui.sidebarOpen,
  isAuthenticated: state.auth.userId,
});

export default connect(mapStateToProps, { closeSidebar, signOut })(
  SidebarContainer
);
