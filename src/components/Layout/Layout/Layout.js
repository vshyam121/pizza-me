import React from 'react';
import HeaderContainer from '../../../containers/HeaderContainer';
import './Layout.scss';
import PropTypes from 'prop-types';
import withErrorHandler from '../../../hoc/withErrorHandler';
import axiosAPI from '../../../shared/axiosAPI';

/* Overall app layout */
const Layout = (props) => {
  return (
    <div className='layout' data-test='layout'>
      <HeaderContainer data-test='header' />
      <main className='main' data-test='main'>
        {props.children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default withErrorHandler(Layout, axiosAPI);
