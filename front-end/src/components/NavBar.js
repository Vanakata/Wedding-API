import React, { Fragment } from 'react';
import { UserConsumer } from "../components/User-Context";
import { NavLink } from "react-router-dom"

const NavBar = ({ isAdmin, isLoggedIn, logout }) => {
    return (
        <header id="header">
            <nav >
                <Fragment >
                    <Fragment >
                        <Fragment >
                            <Fragment >
                                <NavLink to="/">My Wedding<strong>.</strong></NavLink>
                            </Fragment>
                        </Fragment>
                        {
                            isLoggedIn ?
                                <Fragment >
                                    <ul>
                                        <NavLink to="/"><li>Home</li></NavLink>

                                    </ul>
                                    {
                                        isAdmin ?
                                            <ul>
                                                <NavLink to="/admin/create"><li>Create New Wedding</li></NavLink>
                                                <NavLink to="/admin/all"><li>All weddings</li></NavLink>
                                                <NavLink to="/" onClick={logout}><li>Logout</li></NavLink>
                                            </ul>

                                            :
                                            <ul>
                                                <NavLink to="contact.html"><li>Guests</li></NavLink>

                                                <NavLink to="/" ><li>Gallery</li></NavLink>
                                                <NavLink to="/" onClick={logout}><li>Logout</li></NavLink>
                                            </ul>
                                    }
                                </Fragment>
                                :
                                <Fragment >
                                    <ul>
                                        <li className="active"><NavLink to="/">Home</NavLink></li>
                                        <li className="has-dropdown"><NavLink to="/login">Login</NavLink></li>
                                        <li><NavLink to="contact.html">Who we are</NavLink></li>
                                        <li><NavLink to="contact.html">What we offer</NavLink></li>
                                        <li><NavLink to="contact.html">Gallery</NavLink></li>
                                        <li><NavLink to="contact.html">Contact us</NavLink></li>
                                    </ul>
                                </Fragment>
                        }
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
