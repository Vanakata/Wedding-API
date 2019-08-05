import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider, defaultUserState } from "./components/User-Context"
import NavBar from "./components/NavBar";
import Login from '../src/view/login-page';
import HomePage from '../src/view/home-page'
import CreateWedding from '../src/view/create-wedding-page';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
// import './css/animate.css';
// import './css/bootstrap.css';
// import './css/flexslider.css';
// import './css/icomoon.css';
// import './css/magnific-popup.css';
// import './css/owl.carousel.min.css';
// import './css/owl.theme.default.min.css';
// import "./css/style.css"

class App extends Component {
  constructor(props) {
    super(props)

    const localUser = window.localStorage.getItem("user");
    let parsedUser = localUser ? JSON.parse(localUser) : {};

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser
      }
    };
  };
  updateUser = (user) => {
    this.setState({ user })
  }
  logout = () => {
    window.localStorage.clear();
    this.setState({
      user: {
        ...defaultUserState,
        updateUser: this.updateUser
      }
    })
  }
  render() {
    const { user } = this.state
    return (
      <div className="App">
        <Router>
          <Fragment>
            <UserProvider value={user} >
              <NavBar logout={this.logout} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path = "/admin/create" component ={CreateWedding}/>
              </Switch>
            </UserProvider>
          </Fragment>
          {/* <FilePond /> */}
        </Router>
      </div>
    );

  }
}

export default App;
