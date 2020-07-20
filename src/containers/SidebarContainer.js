import React from 'react';
import { connect } from 'react-redux';
import { closeSidebar } from '../store/ui/uiActions/uiActions';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';

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
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, { closeSidebar })(SidebarContainer);
