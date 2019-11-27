import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { defaultUserState, UserProvider } from "../components/User-Context/User-Context"
import NavBar from "../components/Nav-Bar/NavBar";
import Login from '../view/login-page';
import AuthorizeRoute from '../components/User-Context/Authorized-Route'
import HomePage from '../view/home-page'
import CreateWedding from '../view/create-wedding-page';
import AllWeddings from '../view/get-all-weddings'
import WeddingDetails from '../view/wedding-details-page'
import GuestList from '../view/guest-list/guest-list-page';
import CreateGuestList from '../view/guest-list/create-guest-list'
import 'filepond/dist/filepond.min.css';
import "../css/style.css"

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
    const { user } = this.state;
    
    return (
      <div className="App">
        { <Router>
          <Fragment>
            <UserProvider value={user} >
              <NavBar logout={this.logout} />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/admin/create" component={CreateWedding} />
                <Route exact path="/admin/all" component={AllWeddings} />
                <Route exact path="/admin/all/:id" component={WeddingDetails} />
                <AuthorizeRoute exact path="/guest-list/all" component={GuestList} />
                <AuthorizeRoute exact path="/guest-list/create" component={CreateGuestList} />
              </Switch>
            </UserProvider>
          </Fragment>
        </Router> 
        }
      </div>
    );

  }
}

export default App;
