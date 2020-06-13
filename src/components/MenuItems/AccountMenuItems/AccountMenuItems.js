import React from "react";
import NavigationItem from "../../UI/NavigationItem/NavigationItem";
import { connect } from "react-redux";

const AccountMenuItems = (props) => {
  let accountMenuItems = (
    <NavigationItem {...props} to="/signin">
      <span>Sign In</span>
    </NavigationItem>
  );
  if (props.isAuthenticated) {
    accountMenuItems = (
      <React.Fragment>
        <NavigationItem {...props} to="/my-orders">
          My Orders
        </NavigationItem>
        <NavigationItem {...props} to="/signout">
          Sign Out
        </NavigationItem>
      </React.Fragment>
    );
  }
  return accountMenuItems ;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, null)(AccountMenuItems);
