import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert("Payment successfull"); 
}
const StripeCheckoutButton = ( { price } ) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_W7CgBiTtomc4xjWsOhWxrMbX00Bifj1MFB';
    return (
        <StripeCheckout 
            label="Pay Now"
            name= "crwn clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description ={`Your total price is $ ${price}`}
            amount={priceForStripe}
            panel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;