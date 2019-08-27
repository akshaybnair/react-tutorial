import React from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../../firebase/firebase.util';
import {connect} from 'react-redux';

import {ReactComponent as Logo} from  '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link to="/" className="logo-container">
            <Logo className="logo">

            </Logo>
        </Link>
        <div className="options">
            <Link to="/shop" className="option">shop</Link>
            <Link to="/shop" className="option">contact</Link>
            {
                currentUser?
                <div className="options" onClick={ () => auth.signOut() }> Sign out</div>
                :
                <Link className="options" to="/signin">Sign in</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null : (<CartDropdown/>) 
        }
        
    </div>
)

const mapStateToProps = ({user : {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});
export default connect(mapStateToProps)(Header);
