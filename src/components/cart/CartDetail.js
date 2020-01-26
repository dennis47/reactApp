import React, { Component } from "react";

import {} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Badge, Table, Button } from "reactstrap";
import alertify from 'alertifyjs'
class CartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName+" Sepete Ürün Silindi.");
    }
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Products</Badge>
           
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>  
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(cartItem => (
              <tr key={cartItem.id}>
                <td >{cartItem.product.id}</td>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.product.quantity}</td> 
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    SIL
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  };
}

function mapDispatchToProps(dispatch) {
  //aksiyonları kullanabilmek için
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
