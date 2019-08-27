import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from "./firebase/firebase.util";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import "./App.css";

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        console.log("user successfull");        
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot( snapshot => {
          console.log({userAuth,snapshot});
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
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
