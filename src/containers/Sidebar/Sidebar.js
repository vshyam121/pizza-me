import React, { Component } from "react";
import "./Sidebar.scss";
import { connect } from "react-redux";
import PizzaMenuItems from "../../components/MenuItems/PizzaMenuItems/PizzaMenuItems";
import AccountMenuItems from "../../components/MenuItems/AccountMenuItems/AccountMenuItems";
import { closeSidebar } from "../../store/ui/uiActions";
import NavigationItem from "../../components/UI/NavigationItem/NavigationItem";

/* Sidebar menu with pizza menu items and account menu items */
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
            <AccountMenuItems vertical onClick={this.handleClickMenuItem} />
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
