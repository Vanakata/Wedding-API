import React, { Fragment } from 'react';
import { UserConsumer } from "../User-Context/User-Context";
import { NavLink } from "react-router-dom"
import { Fade, Zoom } from 'react-reveal'


const NavBar = ({ isAdmin, isLoggedIn, logout }) => {
    return (
        <header id="header">
            <nav id="navigation" >
                <Fragment >
                    <Fragment >
                        <Fragment >
                            <Fragment >
                                <Zoom><NavLink id="greeting-message" to="/"><strong>Welcome to My Wedding.</strong></NavLink></Zoom>
                            </Fragment>
                        </Fragment>
                        <div id="nav-container">
                        {
                            isLoggedIn ?

                                <Fragment >
                                    
                                    {
                                        isAdmin ?
                                            <ul className="admin-navigation">

                                                <NavLink to="/" onClick={logout}><li>Logout</li></NavLink>
                                                <NavLink to="/admin/all"><li>All weddings</li></NavLink>
                                                <NavLink to="/admin/create"><li>New Wedding</li></NavLink>
                                            </ul>

                                            :
                                            <Fade right>
                                                <ul>
                                                    <NavLink to="/" onClick={logout}><li>Logout</li></NavLink>
                                                    <NavLink to="/guest-list/create"><li>Add guest</li></NavLink>
                                                    <NavLink to="/guest-list/all"><li>Guest List</li></NavLink>
                                                    <NavLink to="/" ><li>Gallery</li></NavLink>
                                                    <NavLink to="/profile"><li>My Profile</li></NavLink>

                                                </ul>
                                            </Fade>
                                    }
                                </Fragment>

                                :
                                <Fragment >
                                    <Fade right>
                                        <ul className="not-logged-user-nav">
                                            <NavLink to="contact.html"><li>Contact us</li></NavLink>
                                            <NavLink to="contact.html"><li>Who we are</li></NavLink>
                                            <NavLink to="contact.html"><li>What we offer</li></NavLink>
                                            <NavLink to="contact.html"><li>Gallery</li></NavLink>
                                            <NavLink to="/login"><li>Login</li></NavLink>

                                        </ul>
                                    </Fade>
                                </Fragment>


                        }
                        </div>

                    </Fragment>
                </Fragment>
            </nav>
        </header>
    )
}
const NavBarWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <NavBar {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default NavBarWithContext
