import React, { Component } from "react";
import "./Sidebar.scss";
import { connect } from "react-redux";
import PizzaMenuItems from "../../components/PizzaMenuItems/PizzaMenuItems";
import { closeSidebar } from "../../store/ui/uiActions";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";

class Sidebar extends Component {
  handleClickMenuItem = () => {
    this.props.closeSidebar();
  };

  render() {
    let sidebarContainerClassNames = ["sidebar-container"];
    let sidebarClassNames = ["sidebar"];
    if (!this.props.sidebarOpen) {
      sidebarClassNames.push("sidebar--closed");
      sidebarContainerClassNames.push("sidebar-container--closed");
    }

    let authentication = (
      <NavigationItem vertical to="/signin" onClick={this.handleClickMenuItem}>
        <span>Sign In</span>
      </NavigationItem>
    );
    if (this.props.isAuthenticated) {
      authentication = (
        <React.Fragment>
          <NavigationItem vertical onClick={this.handleClickMenuItem}>
            My Orders
          </NavigationItem>
          <NavigationItem
            vertical
            to="/signout"
            onClick={this.handleClickMenuItem}
          >
            Sign Out
          </NavigationItem>
        </React.Fragment>
      );
    }

    return (
      <div className={sidebarContainerClassNames.join(" ")}>
        <div className={sidebarClassNames.join(" ")}>
          <div className="sidebar__menu-items">
            <PizzaMenuItems vertical onClick={this.handleClickMenuItem} />
          </div>
          <div className="sidebar__account">
            <NavigationItem
              vertical
              to="/cart"
              onClick={this.handleClickMenuItem}
            >
              Cart
            </NavigationItem>
            {authentication}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sidebarOpen: state.ui.sidebarOpen,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, { closeSidebar })(Sidebar);
