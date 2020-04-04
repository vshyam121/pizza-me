import React from "react";
import { connect } from "react-redux";

const Cart = props => {
    return (
        <div className="cart">
        </div>
    )
}

const mapStateToProps = state => ({
    items: state.cart.items
});

export default connect(mapStateToProps, null)(Cart);