import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserConsumer } from '../../components/User-Context';
import GuestListService from '../../components/services/guest-list-service';

class CreateGuestList extends Component {

    constructor(props) {
        super(props);
        const wedding = JSON.parse(localStorage.user)
        this.state = {
            firstName: "",
            lastName: "",
            isComing: false,
            weddingId: wedding.id,
            error: "",
            isCreated:false

        }
    }
    static service = new GuestListService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    handleSubmit = (event) => {
       
        event.preventDefault();
        const { firstName, lastName, isComing, weddingId } = this.state;
        const credentials = {
            firstName,
            lastName,
            isComing,
            weddingId
        }
        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await CreateGuestList.service.create(credentials);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors);
                }
                alert("Guest created successfully");
                this.setState({
                    isCreated:true
                })
            } catch (error) {
                alert(error);
            }
        })
    }
    render() {
        const { firstName, lastName, error,isCreated} = this.state;
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return (
                <Redirect to='/login' />
            );
        }else if(isCreated){
            return (
                <Redirect to="/guest-list" />
            )
        }
        return (
            <div>
                {
                    error.length ?
                        <div>Something went wrong:{error}</div>
                        : null
                }
                <h1>Here you can make, your own guest list. </h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First name:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                            className="createGuests" />

                        <label>Last name:</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                            className="createGuests" />
                        <input
                            type="submit"
                            value="Create"
                            className="button" />
                    </div>
                </form>
            </div>
        )
    }
}
const CreateGuestListWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <CreateGuestList
                        {...props}
                        isLoggedIn={isLoggedIn} />
                )
            }
        </UserConsumer>
    )
}
export default CreateGuestListWithContext;