import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from "./firebase/firebase.util";
import { createStructuredSelector } from 'reselect';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { addCollectionAndDocuments } from './firebase/firebase.util';

import "./App.css";

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapshot => {
          setCurrentUser(
             {
              id: userRef.id,
              ...snapshot.data()
            }
          );
        });
      } else{
        setCurrentUser(
          userAuth
        );
      }
    });
    //addCollectionAndDocuments('collections', collectionsArray.map( ({title, items }) => ({title, items})))
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser ,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
