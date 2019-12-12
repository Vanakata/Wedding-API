import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../user-context/User-Context';


const AuthorizeRoute = ({ isLoggedIn, ...otherProps }) => {

    if(!isLoggedIn) {
        alert("Login first")
        return <Redirect to='/login' />
    }

    return <Route { ...otherProps }/>
}

const AuthorizeRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn}) => (
                    <AuthorizeRoute {...props} isLoggedIn={isLoggedIn} />
                ) 
            }
        </UserConsumer>
    )
} 

export {
    AuthorizeRoute   
}
export default AuthorizeRouteWithContext;