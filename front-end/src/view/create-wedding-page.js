import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from '../components/services/authentication-service';
import { UserConsumer } from '../components/User-Context';

class CreateWedding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            weddingDate: "",
            groom: "",
            bride: "",
            error: "",
            isRegister: false
        }
    }
    static service = new AuthenticationService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }
    handleSubmit = (event) => {
        debugger;
        event.preventDefault();
        const { email, username, password, confirmPassword, weddingDate, groom, bride } = this.state;

        const credentials = {
            email,
            username,
            password,
            confirmPassword,
            weddingDate,
            groom,
            bride
        }
        this.setState({
            error: ''
        }, async () => {

            try {
                if (credentials.password !== credentials.confirmPassword) {
                    throw new Error('Password and Confirm-Password should match')
                }
                const result = await CreateWedding.service.register(credentials);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');
                    throw new Error(errors);
                }
                this.setState({
                    isRegister: true
                })

            } catch (error) {
                alert(error.toString());
            }
        })
    }
    render() {
        const { email, username, password, confirmPassword, weddingDate, error, isRegister, groom, bride } = this.state;
        const { isLoggedIn } = this.props;


        if (isRegister || !isLoggedIn) {
            return (
                <Redirect to='/login' />
            );
        }
        return (
            <div>
                {
                    error.length ?
                        <div>Something went wrong:{error}</div>
                        :
                        null
                }
                <h1>Create new Wedding</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>E-mail:</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            placeholder='Enter users e-mail'
                            value={email}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <label>Username:</label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Enter valid username'
                            value={username}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <label>Password:</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter valid password'
                            value={password}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <label>Confirm-Password:</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            placeholder='Enter password again'
                            value={confirmPassword}
                            onChange={this.handleChange}
                            className='createWedding'
                        />

                        <label>Wedding Date</label>
                        <input
                            type='text'
                            name='weddingDate'
                            id='weddingDate'
                            placeholder='dd/mm/yyyy'
                            value={weddingDate}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <label>Groom:</label>
                        <input
                            type='text'
                            name='groom'
                            id='groom'
                            placeholder='Enter groom firstname'
                            value={groom}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <label>Bride:</label>
                        <input
                            type='text'
                            name='bride'
                            id='bride'
                            placeholder='Enter bride firstname'
                            value={bride}
                            onChange={this.handleChange}
                            className='createWedding'
                        />
                        <input
                            type="submit"
                            value="Create Wedding"
                            className="button" />
                    </div>
                </form>
            </div>
        )
    }
}
const CreateWeddingWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <CreateWedding
                        {...props}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    )
}
export default CreateWeddingWithContext