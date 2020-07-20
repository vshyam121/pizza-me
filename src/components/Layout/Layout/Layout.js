import React from 'react';
import HeaderContainer from '../../../containers/HeaderContainer';
import Footer from '../Footer/Footer';
import './Layout.scss';
import PropTypes from 'prop-types';

/* Overall app layout */
const Layout = (props) => {
  return (
    <div className='layout' data-test='layout'>
      <HeaderContainer data-test='header' />
      <main className='main' data-test='main'>
        {props.children}
      </main>
      <Footer data-test='footer' />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Layout;
