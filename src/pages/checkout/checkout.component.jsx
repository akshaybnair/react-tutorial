import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems , selectCartTotal} from '../../redux/cart/cart.selectors';
import  StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';
import CartItem from '../../components/cart-item/cart-item.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckoutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                   <span>Product</span>
            </div>
            <div className="header-block">
                   <span>Description</span>
            </div>
            <div className="header-block">
                   <span>Quantity</span>
            </div>
            <div className="header-block">
                   <span>Price</span>
            </div>
            <div className="header-block">
                   <span>remove</span>
            </div>
        </div>
        {
            cartItems.map(
                cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )
        }
        <div className="total">
            <span>Total : $ {total}</span>
        </div>
        <div className="text-warning">
            *please use following test credit cart for payment* <br/>
            4242-4242-4242-4242 - exp : 01/20  - cvv:123
            
        </div>
        <StripeCheckoutButton price={total} />
    </div>
);
const mapStatetoProps = createStructuredSelector({
    cartItems : selectCartItems,
    total: selectCartTotal
})
export default connect(mapStatetoProps)(CheckoutPage);