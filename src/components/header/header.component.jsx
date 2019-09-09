import React from 'react';

import {auth} from '../../firebase/firebase.util';
import {connect} from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser} from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import {ReactComponent as Logo} from  '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { OptionLink, OptionsContainer, LogoContainer, HeaderContainer, } from './header.styles';
const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/" >
            <Logo className="logo">

            </Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop" className="option">shop</OptionLink>
            <OptionLink to="/shop" className="option">contact</OptionLink>
            {
                currentUser?
                <OptionLink as='div' onClick={ () => auth.signOut() }> Sign out</OptionLink>
                :
                <OptionLink className="options" to="/signin">Sign in</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null : (<CartDropdown/>) 
        }
        
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden : selectCartHidden
});
export default connect(mapStateToProps)(Header);
