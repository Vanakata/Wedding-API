import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../components/services/authentication-service';
import { UserConsumer } from '../components/User-Context';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    static service = new AuthenticationService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    handleSubmit = (event) => {

        event.preventDefault();
        const { username, password } = this.state;
        const { updateUser } = this.props;
        debugger;
        const credentials = {
            username:username.toLowerCase(),
            password
        }
        this.setState({
            error: ''
        },
            async () => {
                try {
                    const result = await Login.service.login(credentials);

                    if (!result.success) {

                        const errors = Object.values(result.errors).join(' ');
                        throw new Error(errors)
                    }
                    window.localStorage.setItem('auth_token', result.token);
                    window.localStorage.setItem('user', JSON.stringify({
                        ...result.user,
                        isLoggedIn: true,
                        isAdmin: (result.user.roles[0] === 'admin')
                    }))

                    updateUser({
                        isLoggedIn: true,
                        isAdmin: (result.user.roles[0] === 'admin'),
                        ...result.user
                    })

                } catch (error) {
                    alert('Invalid username or password');
                };
            });
    };
    render() {
        const { username, password } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={this.handleChange}
                                className="loginPage"
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={this.handleChange}
                                className="loginPage"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className="button"
                        />
                    </form>
                </div>
            );
        };
    };
};

const LoginWithContext = (props) => {
    
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, updateUser }) => (
                    <Login
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}
export default LoginWithContext;