import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserConsumer } from '../../components/User-Context/User-Context';
import GuestListService from '../../components/services/guest-list-service';

class CreateGuestList extends Component {
    constructor(props) {
        super(props);
        const wedding = JSON.parse(localStorage.user)
        this.state = {
            firstname: "",
            lastName: "",
            error: "",
            weddingId: wedding.id,
            isCreated: false,
        }

    }
    static service = new GuestListService();

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }
    handleSubmit = (event) => {

        event.preventDefault();
        let { firstName, lastName, weddingId } = this.state;
        const credentials = { firstName, lastName, weddingId };

        this.setState({
            error: ""
        }, async () => {
            try {

                const result = await CreateGuestList.service.create(credentials);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors);
                }
                this.setState({ isCreated: true })

            } catch (error) {
                console.log(error);
            }
        })
    }

    render() {
        let { firstName, lastName, error } = this.state;


        return (
            <div>
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
                {
                    this.state.isCreated ?
                        <div className="success-message">
                            <p>Guest added successfuly</p>
                        </div>
                        :
                        null
                }
            </div>)
    }
}
const CeateGuestListWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <CreateGuestList
                        {...props}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    )
}
export default CeateGuestListWithContext;